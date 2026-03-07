# Local Image Generation on Apple Silicon: Research Notes

Everything below comes from hands-on experimentation on a Mac Mini with 48GB unified RAM, using mflux v0.16.6 with MLX on Apple Silicon.

---

## 1. The Setup

### What is mflux?
- MLX-native implementation of FLUX and other image generation models
- Built specifically for Apple Silicon, uses MLX framework
- Leverages unified memory architecture (CPU and GPU share the same RAM)
- Installed via: `uv tool install mflux`
- Version tested: 0.16.6

### Available model families (via mflux CLI)
mflux provides **separate CLI commands** for different model families:
- `mflux-generate` — FLUX.1 models (dev, schnell, krea-dev)
- `mflux-generate-flux2` — FLUX.2 Klein models (4B, 9B, base variants)
- `mflux-generate-qwen` — Qwen Image model (20B)

This is a critical detail — using the wrong CLI command for a model will either fail or produce unexpected results.

---

## 2. Models Tested

### FLUX.2 Klein 4B (Distilled)
- **Parameters**: 4B
- **Type**: Distilled (knowledge distillation from a larger model)
- **RAM usage**: ~8GB (no quantization needed)
- **CLI**: `mflux-generate-flux2 --model flux2-klein-4b`
- **Steps**: 4 (optimized for this)
- **Speed**: ~12 seconds per image at 768x1024
- **License**: Apache 2.0 (fully commercial)

**What it CAN'T do (discovered through failures):**
- `--negative-prompt` — CLI errors with: "negative-prompt is not supported for FLUX.2"
- `--guidance` other than 1.0 — CLI errors with: "guidance is only supported for FLUX.2 base models"

These failures cost us multiple generation attempts before we figured out the constraints.

### FLUX.1 Dev (Base model)
- **Parameters**: 12B
- **Type**: Base (full, non-distilled)
- **Full model size**: ~24GB (bf16), downloaded ~34GB with all components
- **RAM with `-q 8`**: ~13GB
- **CLI**: `mflux-generate --model dev`
- **Steps**: 20 (sweet spot)
- **Speed**: ~1.5 minutes at 512x512 with `-q 8`
- **License**: Non-commercial model usage, BUT outputs can be used commercially
- **Gated model**: Requires HuggingFace account + license acceptance + `hf auth login`

**What it CAN do that Klein can't:**
- `--negative-prompt` — works perfectly
- `--guidance` — adjustable from 1.0 to 7.0, default 3.5

**License deep dive (we researched this extensively):**
- Section 2.d of the license explicitly states: "You may use Output for any purpose (including for commercial purposes)"
- The non-commercial restriction applies to using/distributing the MODEL, not the generated images
- Blog posts, YouTube videos, etc. are fine even if monetized
- June 2025 license update (v1.1.2) removed some earlier language but the outputs clause remains

### Qwen Image (Base model, world knowledge)
- **Parameters**: 20B
- **Type**: Base with vision-language model backbone
- **Full model size**: ~40GB (bf16), cached ~54GB with all components
- **CLI**: `mflux-generate-qwen` (no --model flag needed)
- **Steps**: 30 (each step ~36s at q6)
- **License**: Apache 2.0

**Quantization testing results (same prompt, same seed 7742):**

| Quantization | RAM usage | Time (1280x864, 30 steps) | Quality |
|-------------|-----------|---------------------------|---------|
| `-q 4` | ~14GB | ~17.5 min (~35s/step) | **Pixelated/painterly** — textures look like oil painting, fine detail lost |
| `-q 6` | ~20GB | ~18.3 min (~36s/step) | **Good** — sweet spot on 48GB machine |
| `-q 8` | ~25GB | Completed (took longer to load) | **Best** — but risky on memory, initial load may fail |
| None | ~40GB | Not tested — would swap/crash | N/A |

**What "world knowledge" actually means (tested):**
- Prompt: "The Colosseum in Rome at golden hour, with a vintage red Vespa scooter..."
- The model correctly rendered: architecturally accurate Colosseum (right number of arches, correct structure), recognizable Vespa, Italian cypress trees, cobblestone streets
- This is because Qwen is built on a vision-language model backbone — it has semantic understanding of real-world objects
- FLUX models can generate these too, but Qwen's accuracy on specific real-world details is notably better

**Special capabilities:**
- Best-in-class text rendering in images (multi-line, paragraph-level)
- Handles non-Latin scripts (Chinese, Japanese) where other models fail
- Image editing: style transfer, object insertion/removal, text editing within images
- Human pose manipulation

---

## 3. Quantization — What We Learned

### How mflux handles quantization
1. You download the **full model** from HuggingFace (bf16/fp16 precision)
2. On first run with `-q N`, mflux loads the full weights and quantizes them in memory
3. This means the full download size is always the same regardless of quantization level
4. The quantization happens at load time, not download time

### What quantization actually does
- Reduces the precision of model weights from 16-bit floating point to fewer bits
- 8-bit: each weight uses 8 bits instead of 16 → roughly half the memory
- 6-bit: each weight uses 6 bits → ~37.5% of original memory
- 4-bit: each weight uses 4 bits → ~25% of original memory
- Lower bits = less memory, but information is lost → quality degrades

### Available quantization levels in mflux
`-q 3`, `-q 4`, `-q 5`, `-q 6`, `-q 8` (specified via `--quantize` or `-q`)

### Practical impact (observed)
- **4-bit on 20B model (Qwen)**: Visible pixelation, painterly texture artifacts. Fine details like stone textures, metal surfaces, and sky gradients all degraded.
- **6-bit on 20B model (Qwen)**: Noticeable improvement over 4-bit. Textures are cleaner, less painterly effect. Good balance.
- **8-bit on 12B model (FLUX.1 Dev)**: Virtually no quality loss compared to what you'd expect from the full model. Comfortable fit in memory.
- **No quantization on 4B model (Klein)**: Only 8GB, fits easily. No need to quantize small models.

### Key insight
Quantization impact scales with model size. A 4B model at full precision is better than a 20B model at aggressive quantization. The sweet spot is: use the largest model that fits comfortably in memory at the highest quantization level that leaves headroom.

---

## 4. Distilled vs Base Models

### What is distillation?
- A smaller "student" model is trained to mimic a larger "teacher" model
- The student learns the teacher's behavior without needing all its parameters
- Result: much faster inference with fewer steps, at some quality cost

### Practical differences we observed

**Distilled (Klein 4B):**
- Only needs 4 inference steps (vs 20-50 for base)
- ~12 seconds per image
- Cannot use negative prompts (the distillation process bakes the guidance in)
- Cannot adjust guidance scale (fixed at 1.0)
- Quality is good but not as fine-grained as base models

**Base (Dev 12B, Qwen 20B):**
- Needs 20-50 inference steps
- Minutes per image
- Full control: negative prompts, adjustable guidance
- Higher quality ceiling, especially for photorealism

### Why distilled models don't support negative prompts
Distilled models use a simplified inference process. The teacher model's knowledge of "what to avoid" is baked into the distilled weights during training. There's no separate negative conditioning pathway — the model has already internalized it. Attempting to pass `--negative-prompt` fails because the architecture literally doesn't have the mechanism to process it.

### Why distilled models fix guidance at 1.0
Classifier-free guidance (CFG) works by running inference twice — once with the prompt, once without — and interpolating. Distilled models skip this dual-pass process for speed. The guidance is effectively "compiled in" during distillation. The model was trained with a specific guidance behavior already baked in.

---

## 5. Key Parameters Explained

### Steps (Inference/Denoising Steps)
- Image generation starts with random noise and iteratively removes it
- Each "step" refines the image, making it clearer and more detailed
- More steps = more refinement passes = higher quality (up to a point)
- Distilled models are trained to produce good results in very few steps (4)
- Base models need more steps because they haven't been optimized for speed

### Guidance Scale
- Controls how closely the model follows the text prompt
- Low values (1-2): creative, loose interpretation of the prompt
- Medium values (3-4): balanced — follows prompt while maintaining quality
- High values (5-7): strict adherence to prompt, but can reduce naturalness
- Very high values (8+): degrades quality — model over-optimizes for prompt at cost of realism
- Default is 3.5 for most models

### Negative Prompt
- Tells the model what NOT to generate
- Works via classifier-free guidance: the model steers away from concepts in the negative prompt
- Common negatives: "blurry, low quality, distorted, deformed, ugly, watermark"
- Only works on base models (not distilled) because it requires the CFG mechanism

---

## 6. Apple Silicon Unified Memory — Why This Works

### The key advantage
- Traditional GPUs have separate VRAM (e.g., 8GB, 12GB, 24GB)
- Apple Silicon has unified memory — CPU and GPU share the same pool
- A Mac Mini with 48GB means the GPU has access to all 48GB
- This is why a 20B model can run locally at all — on a traditional setup, you'd need a GPU with 40GB+ VRAM

### MLX framework
- Apple's ML framework designed for Apple Silicon
- Operations run on CPU or GPU without copying data between them
- mflux uses MLX to run inference natively on Metal (Apple's GPU API)
- This is different from PyTorch/CUDA which is designed for NVIDIA GPUs

---

## 7. Failures & Lessons Learned

### Failure 1: Negative prompt on FLUX.2 Klein
- **What happened**: First attempt used `--negative-prompt` with `flux2-klein-4b`
- **Error**: "negative-prompt is not supported for FLUX.2"
- **Root cause**: Distilled model, no CFG mechanism
- **Lesson**: Always check model type before adding negative prompts

### Failure 2: Custom guidance on FLUX.2 Klein
- **What happened**: Second attempt removed negative prompt but kept `--guidance 3.5`
- **Error**: "guidance is only supported for FLUX.2 base models. Use --guidance 1.0"
- **Root cause**: Same distillation constraint — guidance is baked in
- **Lesson**: Distilled models = no negative prompt AND no custom guidance

### Failure 3: FLUX.1 Dev gated repo
- **What happened**: Tried to download dev model without HuggingFace auth
- **Error**: "GatedRepoError: 401 Client Error. Cannot access gated repo"
- **Root cause**: Dev model requires license acceptance and authentication
- **Lesson**: Some models are gated — need `hf auth login` first

### Failure 4: Qwen at q4 — pixelated results
- **What happened**: Generated image at `-q 4` looked like an oil painting, not a photo
- **Root cause**: 4-bit quantization on a 20B model loses too much detail
- **Lesson**: Quantization impact is not linear — there's a cliff below which quality drops dramatically

### Failure 5: Qwen at q8 — initial load appeared to fail
- **What happened**: Process seemed to die silently during initial load
- **Root cause**: Loading 40GB weights to quantize to 8-bit used most of available RAM
- **Eventual outcome**: It did complete, but took very long to load
- **Lesson**: Even with quantization, the initial load requires the full model in memory briefly

---

## 8. Performance Benchmarks

All tests on Mac Mini M4 Pro, 48GB unified RAM.

| Model | Quantize | Resolution | Steps | Time | Quality |
|-------|----------|-----------|-------|------|---------|
| flux2-klein-4b | None | 768x1024 | 4 | ~12s | Good |
| dev (FLUX.1) | q8 | 512x512 | 20 | ~1.5 min | Excellent |
| qwen | q4 | 1280x864 | 30 | ~17.5 min | Pixelated |
| qwen | q6 | 1280x864 | 30 | ~18.3 min | Good |
| qwen | q8 | 1280x864 | 30 | Completed (slow load) | Best |

---

## 9. Model Download Sizes & Cache Locations

All models cached at: `~/.cache/huggingface/hub/`

| Model | HuggingFace repo | Cache size |
|-------|-----------------|------------|
| FLUX.2 Klein 4B | `black-forest-labs/FLUX.2-klein-4B` | ~8GB |
| FLUX.1 Dev | `black-forest-labs/FLUX.1-dev` | ~34GB |
| Qwen Image | `Qwen/Qwen-Image` | ~54GB |

Total disk usage: ~96GB for all three models.

---

## 10. Sources & References

- [mflux GitHub repo](https://github.com/filipstrand/mflux)
- [FLUX.1 dev on HuggingFace](https://huggingface.co/black-forest-labs/FLUX.1-dev)
- [FLUX.1 dev license (exact text)](https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md)
- [Qwen-Image GitHub](https://github.com/QwenLM/Qwen-Image)
- [Qwen-Image on HuggingFace](https://huggingface.co/Qwen/Qwen-Image)
- [FLUX.2 vs FLUX.1 comparison (fal.ai)](https://fal.ai/learn/devs/flux-2-vs-flux-1-what-changed)
- [Flux Dev vs Schnell comparison](https://www.stablediffusiontutorials.com/2025/04/flux-schnell-dev-pro.html)
- [Flux on Apple Silicon guide](https://www.apatero.com/blog/flux-apple-silicon-m1-m2-m3-m4-complete-performance-guide-2025)
- [FLUX models complete guide 2026](https://www.techlifeadventures.com/post/flux-1-comparison-pro-dev-and-schnell-models)
- [Qwen VLo blog](https://qwenlm.github.io/blog/qwen-vlo/)
- [Qwen-Image capabilities (Hyperbolic)](https://www.hyperbolic.ai/blog/qwen-image)
