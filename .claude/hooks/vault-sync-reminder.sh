#!/usr/bin/env bash
# Fires after a Bash tool call. If the command was a git commit and the commit
# touched content/posts/*.mdx files that have no corresponding vault note,
# emit a reminder to write the vault note(s) before /handoff.
#
# Configured in .claude/settings.json as a PostToolUse hook on Bash.

set -euo pipefail

VAULT_ROOT="/Users/akshaybhardwaj/Documents/Repositories/my-brain-child/Blog"

input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')
cwd=$(echo "$input" | jq -r '.cwd // "."')

# Only act on git commit invocations that succeeded.
if [[ ! "$cmd" =~ git[[:space:]]+commit ]]; then
  exit 0
fi

cd "$cwd" 2>/dev/null || exit 0

# Files touched in the last commit, restricted to content/posts/.
files=$(git diff --name-only HEAD~1 HEAD 2>/dev/null | grep -E '^content/posts/.+\.mdx$' || true)
[[ -z "$files" ]] && exit 0

missing=()
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  category=$(basename "$(dirname "$f")")
  # title-case each hyphen segment: distributed-systems -> Distributed-Systems
  folder=$(echo "$category" | awk -F- 'BEGIN{OFS="-"} {for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}; print}')
  title=$(grep -m1 '^title:' "$f" | sed -E 's/^title:[[:space:]]*"?([^"]*)"?[[:space:]]*$/\1/' | tr -d '"')
  [[ -z "$title" ]] && continue
  vault_path="$VAULT_ROOT/$folder/$title.md"
  if [[ ! -f "$vault_path" ]]; then
    missing+=("$f -> $vault_path")
  fi
done <<< "$files"

if (( ${#missing[@]} == 0 )); then
  exit 0
fi

list=$(printf -- '- %s\n' "${missing[@]}")
# Emit additionalContext via JSON so Claude sees the reminder.
jq -n --arg ctx "VAULT SYNC REMINDER: The commit you just made added/modified blog post(s) without a corresponding vault note. Per CLAUDE.md § Vault Sync, write the distilled note(s) now (before /handoff). Missing:
$list

Also update Blog/_index.md with the new entry." \
  '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $ctx}}'
