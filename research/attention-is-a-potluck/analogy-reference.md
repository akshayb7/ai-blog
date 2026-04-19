# The Potluck Analogy — Complete Reference

A single-source reference for the Codex series on modern LLM architecture. Captures every rung of the potluck analogy developed during the 2026-04-18 learning session, in the order it was built up. Use this as the ground truth when drafting any Codex entry — voice, imagery, and terminology should stay consistent with what's here.

---

## The cast (recurring vocabulary)

Every Codex entry can lean on these without re-explaining them. Introduce once per entry via a small recap box that links back to *"Attention is a Potluck."*

| Potluck word | Transformer word | What it means |
|---|---|---|
| Craving | Query (Q) | What a word is looking for from the rest of the sentence |
| Dish label | Key (K) | How a word advertises itself to others |
| Actual food | Value (V) | What a word actually contributes when chosen |
| Guest | Token / word | A single word taking its turn at the buffet |
| Dish on the table | Token / word | Same word playing the "I can be selected" role |
| Seat ribbon | Positional encoding | A unique pattern pinned to each word encoding its position |
| Friend group / buffet line | Attention head | One parallel specialized run of the buffet |
| Chefs at the entrance | W^Q, W^K, W^V projection matrices | Translate a word into its craving, label, food |
| Master Chef | W^O output projection | Blends all the mini-plates from parallel buffets into one |
| Plate | Attention output | The weighted mix a guest walks away with |
| Tray of 8 plates | Concatenated multi-head output | The unblended side-by-side plates before the Master Chef |
| Hallway of rooms | Stacked transformer blocks | Dozens of potlucks run in sequence |
| Express lane | Residual connection | The shortcut that carries the word unchanged alongside each transformation |
| Volume knob | LayerNorm / RMSNorm | Rescales the plate so numbers stay stable through stacking |
| Kitchen solo pass | Feed-forward network (FFN / MLP) | Per-word transformation after attention; covered in a future entry |
| Menu board | KV cache | Written-down labels and food so the buffet doesn't redo work; future entry |

---

## Rung 1 — Single-head attention (the atom)

**The setup.** You walk into a potluck dinner. There are four dishes on the table. Each dish has two things: a handwritten label card in front of it ("spicy Thai noodles", "grandma's apple pie", "kale salad", "butter chicken"), and the actual food behind the card. You walk in with one thing in your head: a craving, like *"something warm and spicy."*

**The three objects.**
- Your craving = **Q** (what you're looking for)
- The label cards = **K** (what each dish advertises)
- The actual food = **V** (what you'd actually put on your plate)

**The move.** You don't pick a winner. You score each label against your craving (noodles = high match, butter chicken = high-ish, apple pie = medium-low for "warm yes spicy no", kale = low), then build **one plate** that is a **weighted mix of all four foods** in proportions set by those scores. Everything contributes something, even if small. Nothing is ever fully ignored, nothing is ever fully taken.

**The plate is the output.** One plate, mixed from all four dishes, weighted by craving-label match.

**One sentence summary (the reader should own this):**
> *The query is matched against every key to find how well each one satisfies what I'm looking for. Those match scores then decide how much of each value ends up on my plate.*

**Two refinements worth stating:**
1. Every dish contributes — big or small, nobody is fully excluded. This is what makes attention differentiable and learnable.
2. Raw scores get normalized into proportions that sum to 100% before becoming plate weights. That normalization step is called **softmax**. The flow is: **craving → scored against every label → scores turned into proportions (softmax) → plate built from all foods in those proportions.**

**Subtlety.** Label and food are different objects. The label matches; the food is eaten. This split (K vs V) is why the KV cache works at all — a later entry.

---

## Rung 2 — Self-attention (every word plays all three roles)

**The leap.** A sentence isn't one guest. It's many. In *"The cat sat on the mat"*, every word is simultaneously:
- a **guest** with its own craving (Q)
- a **labeled dish** on the table (K)
- a **food** behind the label (V)

Same six words, three roles each, all at once. The sentence is looking at itself. That's why it's called **self**-attention.

**What happens.** All six words walk in together. Every word does the single-guest potluck move in parallel — scores every label with its own craving, builds its own plate. Six plates in parallel, from the same table of six dishes.

**Why this is the magic.** Before attention, *"cat"* was just *"cat"* — an island. After self-attention, *"cat"*'s plate is heavy on *"sat"* and *"mat"* (because those labels scored high), with slivers of *"The"* and *"on"*. The new *"cat"* is no longer just *"cat"* — it's ***"cat-in-the-context-of-this-sentence."*** Every word becomes a weighted mix of itself plus the words that matter to it. That's the entire reason transformers understand language.

**Where the craving comes from.** Each word arrives and hits three learned translators — **Chef Q, Chef K, Chef V** — who turn it into its craving, its label, and its food. The three chefs learn their recipes during training. Q, K, V for *"cat"* are all derived from the same starting word, but through three different learned transformations.

---

## Rung 3 — Positional encoding (seat ribbons)

**The problem.** *"The cat sat on the mat"* and *"The mat sat on the cat"* are the same six words in different orders — one is Tuesday, one is a horror film. But self-attention as described so far cannot tell them apart. The craving-label match for *"cat"* and *"mat"* is identical regardless of where they sit. **Self-attention alone treats a sentence as a bag of words, not a line.**

**The fix.** Before anyone walks to the buffet, the host hands each guest a **ribbon** to pin on, with their seat number. The ribbon gets **blended into the guest** (not pinned on top — mixed in). *"cat"* becomes *"cat-in-seat-2"*. *"mat"* becomes *"mat-in-seat-6"*. Now when they score each other's labels, the score includes information about the gap between seats. Order is baked into the word before attention even starts.

**What's on the ribbon.** Not the raw number 2 or 6 — raw integers get huge for long sequences and drown out the word. Instead the paper uses a **pattern of sine and cosine waves at different frequencies**. Some waves oscillate fast (catch "1 vs 2 seats apart"), some slow (catch "50 vs 500"). Each seat gets a unique combination of wave values. Close seats have similar ribbons, distant seats have very different ones. The model can *feel* distance just by comparing ribbons.

**This is "absolute" positional encoding.** Every ribbon says exactly which seat. Works in 2017. Problem: if training only saw ribbons 1–512, ribbon #513 is a total mystery at inference. This is the crack that RoPE fixes — **rotating** ribbons that generalize to unseen distances. RoPE is its own Codex entry.

**Subtle but important:** the ribbon is blended in **before** Chef Q/K/V touches the word. So the craving *"cat"* walks in with is really *"cat-in-seat-2's craving"*. Position flows through everything downstream.

---

## Rung 4 — Multi-head attention (eight parallel buffets)

**Why.** One craving per word isn't enough. The word *"cat"* simultaneously wants to know: who's my verb? where am I? what adjectives describe me? am I subject or object? A single craving trying to answer all four gets softmax'd into gray mush — averaged compromise.

**The setup.** Same table of dishes, but now **eight parallel buffet lines** running side by side. Each word sends **eight specialized versions of itself** to stand in the eight lines:
- Line 1: *"cat's verb-finding craving"*
- Line 2: *"cat's location-finding craving"*
- Line 3: *"cat's adjective-finding craving"*
- …etc.

Labels and foods are also eight versions — *"mat"* advertises itself differently in Line 1 vs Line 3. Each line runs its own full potluck and produces its own small plate. Eight mini-plates per word.

**Where specialization comes from.** Not designed — **learned**. There are **24 chefs at the entrance instead of 3**: eight Chef-Q's, eight Chef-K's, eight Chef-V's. Each set drifts into its own specialty during training because specialists produce sharper plates than generalists. Interpretability studies confirm this: some heads track grammar (verb→object), some track adjacent-word position, some latch onto rare words, some are **induction heads** that find "what came after this token last time" and predict that next (most of what feels like in-context learning).

**The Master Chef.** Eight mini-plates get laid side by side on a tray (**concat**). But the plates are segregated silos — jalapeños nowhere near chocolate cake. The **Master Chef (W^O)** takes the tray and blends everything into one cohesive final plate. Without the Master Chef, downstream layers would see eight rigid silos instead of integrated understanding.

**The free lunch.** Eight parallel buffets cost the same as one big buffet. Each line's chefs work in a smaller flavor-space (64 dimensions instead of 512). Eight × 64 = 512. Same total chef-work, same parameter count, but eight independent softmax budgets instead of one averaged opinion.

**Parameter math (the "aha"):**

| | Single head, d_model=512 | 8 heads × d_k=64 |
|---|---|---|
| W^Q | 512 × 512 = 262,144 | 8 × (512×64) = 262,144 |
| W^K | 262,144 | 262,144 |
| W^V | 262,144 | 262,144 |
| W^O | 262,144 | 262,144 |
| **Total** | **1,048,576** | **1,048,576** |

**Implementation note.** The original paper formulated 8 separate (512×64) matrices. Modern frameworks (PyTorch `nn.MultiheadAttention`, every production LLM) use **one fat (512×512) W^Q**, do one projection, then reshape into 8 chunks of (n×64). Mathematically identical. Physically: one huge GPU matmul beats 8 small ones.

**Matrix shapes end-to-end for n=10, d_model=512, h=8:**
```
X:              10 × 512       (input tokens)
Q, K, V:        10 × 512       (after single big projection each)
Q_i, K_i, V_i:  10 × 64        (per head, after reshape — 8 of these)
Q_i K_iᵀ:       10 × 10        (attention scores, per head)
softmax:        10 × 10        (per head)
head_i out:     10 × 64        (softmax @ V_i, per head)
concat:         10 × 512       (8 plates on the tray)
final:          10 × 512       (after W^O — the Master Chef)
```

---

## Rung 5 — Stacking and residuals (the hallway of rooms)

**The problem with one layer.** One trip through one multi-head buffet isn't enough. Deep understanding needs dozens of passes — tracking pronouns four clauses back, noticing paragraph-level sarcasm, disambiguating *"bank"* from context 200 words earlier. So transformers **stack**: 48 potlucks in a row (Gemma 4 2B scale), or 80, or 120.

**The hallway image.** A long hallway, each room a complete potluck setup. Word walks into Room 1, goes through the full multi-head buffet, comes out with a refined plate. That plate walks into Room 2. Room 2's chefs are **completely different people** with their own learned recipes — they don't inherit cravings from Room 1, they derive **fresh Q, K, V from scratch** from whatever representation arrives at their door. Same for Room 3, Room 48.

**Emergent hierarchy.** Nobody designs which room does what. Block 1 drifts toward grammar/local structure (its input is raw words + positions — that's what's useful to attend to). Middle blocks drift toward long-range meaning (their input already has local structure). Late blocks drift toward task-specific prediction. The hierarchy *emerges* because the input statistics change block by block, and each block's chefs specialize in translating whatever walks into their door.

**The stacking problem.** Each room transforms the word. Fine once. Forty-eight times? The original word gets paved over — all context, no core. Worse, during training the correction signals sent backward through 48 rooms get garbled layer by layer until early rooms never learn. This was the **vanishing gradient problem** that killed deep networks for decades.

**The fix — residual connections (express lanes).** At every room, don't replace the word with the new plate. **Add the plate on top of the old word.**

> **new word = old word + what the room added**

Every room has an **express lane** running through it that skips the buffet. The word walks in, simultaneously goes through the buffet AND slides down the express lane, and at the exit they merge. Nothing is overwritten — the original self is always carried forward, with each room's refinement layered on top.

**What this unlocks:**
1. **Nothing is ever fully lost.** After 48 rooms the original word is still there, carried through every express lane.
2. **Gradients flow freely backward.** Additive transformations let correction signals travel the full highway without garbling. Deep networks suddenly train.

**The volume knob.** After each add, a small normalizer (LayerNorm in 2017, RMSNorm in every modern model — same job, half the math) rescales so numbers don't spiral out of control across dozens of additions.

**The full transformer block (one "room"):**
1. Word walks in (carrying seat ribbon)
2. Express lane opens — word copies to the side
3. Multi-head attention buffet runs
4. New plate is added to the express-lane copy, volume-knobbed
5. Second express lane opens
6. Feed-forward network runs (per-word kitchen solo pass — its own Codex entry)
7. Result added to the second express-lane copy, volume-knobbed
8. Word exits, walks into next room

Stack 48 of these.

---

## Rung 6 — What flows between blocks (Akshay's question, precisely answered)

**Q:** When a word leaves Block 1 carrying a refined plate, what exactly becomes the Q/K/V of Block 2? Are they inherited, or generated fresh?

**A:** **Fresh from scratch.** Every block has its own private set of chefs. There is no shared Q/K/V across blocks.

**The precise sequence:**
- Block 1 input: **cat_v1** (original word + seat ribbon)
- Block 1's chefs translate cat_v1 → Q, K, V → buffet runs → new plate → express lane adds plate to cat_v1 → volume knob → output is **cat_v2** (= cat_v1 + plate, normalized). cat_v2 is neither cat_v1 nor the plate; it's the sum.
- Block 2 door: cat_v2 walks in. Block 2's chefs — completely different people from Block 1's chefs — look at cat_v2 and derive **fresh Q, K, V** from it. These aren't for raw *"cat"* anymore; they're cravings, labels, and food for *"cat-now-aware-of-its-surroundings."*
- Buffet runs at the v2 level (every dish on the table is also its v2 version). Plate comes out. Express lane. Normalize. → **cat_v3**.
- Repeat 48 times.

**Why stacking is useful (not redundant).** Each block's chefs specialize in translating *whatever kind of vector walks into their door during training*. Block 1 sees raw-words-with-position and learns syntactic cravings. Block 10 sees words-with-local-structure and learns coreference/long-range-meaning cravings. Block 40 sees saturated context and learns task-specific cravings. The hierarchy emerges from input statistics changing depth-wise.

**Why this matters for later entries.** Because K and V at each block are a **deterministic function of the word-representation walking in**, caching them works: during generation, past tokens' K and V haven't changed, so they can be reused. This is the **KV cache**, the single reason LLMs are fast enough to chat with. Future Codex entry.

**Why you can't swap blocks across models.** Block 10 of Llama expects a very specific kind of vector at its door (whatever Llama's Block 9 produces). Drop it into Gemma and it sees a distribution it's never seen. Blocks are locked to their neighbors.

---

## The full picture (one breath)

Every 2026 model you've heard of is variations on this skeleton:

1. **Attention** — weighted mix based on craving-label match
2. **Self-attention** — every word is guest, label, and food simultaneously, in parallel
3. **Positional encoding** — seat ribbons baked in before the buffet
4. **Multi-head** — eight parallel specialized buffets, concat, Master Chef
5. **Residuals** — express lanes through every block so nothing gets lost
6. **Stacking** — dozens of blocks, emergent hierarchy from surface to abstract
7. **Normalization** — volume knobs to keep the math stable

Every refinement post-2017 (RoPE, GQA, MQA, FlashAttention, sliding windows, MoE, quantization, LoRA/QLoRA) is a better version of one specific piece. That's the trunk of the tree. Everything else is branches.

---

## Voice and register notes for drafting

- **Concrete image first, math second, 2026-model implication third.** Never skip the third beat — it's what separates this series from Jay Alammar.
- **Not ELI5.** Full concept fidelity — softmax, W^O, d_k, parameter counts all stay in. Just delivered through the potluck lens first.
- **Address the reader directly.** "You walk into a potluck." "Your craving." Second-person lands.
- **Short sentences when the idea is hard.** Expand only after the image has sat.
- **Retention test:** phone-half-distracted comprehension, coffee re-read math click, dinner-conversation recall three weeks later.
- **Recap boxes, not re-explanations.** When an entry needs an earlier concept, 3 sentences + a link to the source entry.
- **Name the subtlety that most explainers skip.** Each entry should have one moment that makes a practitioner go "oh — nobody tells you that." Examples banked so far:
  - Single-head: label ≠ food (K/V split is what makes the KV cache possible).
  - Multi-head: implementation uses one fat W^Q and reshapes, not 8 separate matrices.
  - Multi-head: parameter count is identical to single-head — free architectural upgrade.
  - Positional encoding: ribbon is blended in **before** Chef Q/K/V, so every downstream craving is position-aware.
  - Stacking: each block derives Q/K/V fresh; nothing is inherited; hierarchy emerges from input statistics, not from design.

---

## Entry scope proposals (from this reference)

- **Entry 1 — *"Attention is a Potluck"*.** Rungs 1 + 2 only. End with forward-pointing teaser to ribbons, parallel buffets, and express lanes.
- **Entry 2 — *"Seat Ribbons"*.** Rung 3. Absolute PE. End with teaser for RoPE.
- **Entry 3 — *"Eight Friends, Eight Cravings"*.** Rung 4. Multi-head. Parameter table is the centerpiece.
- **Entry 4 — *"The Express Lane"*.** Rungs 5 + 6. Stacking, residuals, what-flows-between-blocks. End with teaser for KV cache.
- **Future primitive entries.** FFN/SwiGLU, LayerNorm vs RMSNorm, RoPE deep dive, GQA/MQA, FlashAttention, sliding window, KV cache, MoE, quantization, LoRA.
- **First teardown entry.** Gemma 4 architecture walkthrough, leaning on every primitive above.
