// Parses KEY=VALUE lines (optionally prefixed with `export`) from a shell env file.
export function parseEnv(text) {
  const env = {};
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
}
