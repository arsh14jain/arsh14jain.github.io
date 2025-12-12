# Teaching a tiny LLM to remember: prompt caching in a home‑grown inference engine

I’ve been building a tiny LLM inference engine from scratch because I wanted to see what actually happens between “here’s my prompt” and “here’s your answer”.

While doing that, I kept running into people talking about *prompt caching* in the context of large systems. You’ll often see it mentioned when folks explain how services like ChatGPT can afford to handle long conversations: they don’t re‑process every token of your chat history on every request. They reuse work they’ve already done.

This project is obviously nowhere near that scale, but I wanted a version of prompt caching I could actually see and reason about. So I added a tiny cache to my own inference loop and wired it into a long‑lived REPL. This post is about that cache: what it does, where it sits, and why building it was interesting.

Repo: [`arsh14jain/llm-inference-engine`](https://github.com/arsh14jain/llm-inference-engine)

---

## The engine, in one picture

At a high level, the engine is pretty simple:

- A CLI that takes your prompt (or runs a REPL)
- An inference engine that:
  - prepares the prompt,
  - optionally looks it up in a prompt cache,
  - tokenizes it,
  - calls a small model,
  - samples tokens,
  - and decodes the result back to text.

Here's the architecture diagram:

![LLM Inference Engine Architecture](/llm-inference.png)

Read top‑down: the CLI hands your text to the inference engine, the engine prepares the prompt, checks the cache, tokenizes, runs the model and sampling loop, and decodes the tokens back into text.

Nothing exotic, and that’s the point.

---

## How a single prompt actually runs

Here’s what happens when you send one prompt through this thing:

1. **CLI**  
   I run the CLI with some flags (`--prompt` or `--repl`, `--max-new-tokens`, `--temperature`, etc.).  
   The CLI parses those and builds a small config object.

2. **Prompt preparation**  
   The engine takes the raw text (and optional system prompt), applies a simple template, and produces one formatted string. This is the exact text the model will see.

3. **Tokenization**  
   The formatted string goes through the tokenizer and turns into a list of token IDs.  
   If it’s too long, it’s truncated to fit the model’s context window.

4. **First model pass**  
   Those IDs are wrapped into a tensor and sent through the model once.  
   That gives me logits (the model’s “scores” for the next token) and an internal cache it can reuse on later steps.

5. **Generation loop**  
   The engine looks at the logits for the last token, uses the sampling strategy (greedy or temperature/top‑k) to pick the next token, appends it, and feeds just that new token back into the model.  
   This repeats until we hit an end‑of‑sequence token or reach the `max_new_tokens` limit.

6. **Decoding**  
   Finally, the new tokens are decoded back into text and printed to the terminal.

Prompt caching only touches a small slice of this flow — the part where we turn formatted text into token IDs — but it fits into a concrete, end‑to‑end process.

---

## What I mean by “prompt caching”

When people talk about prompt caching, they usually mean “don’t redo work you’ve already done for a prompt (or a shared prefix)”.

In a production system you might cache things like:

- the model’s internal key/value (attention) state,
- prompt prefix embeddings,
- or even the full attention cache for long conversations.

That’s the grown‑up version.

For this project, I started much smaller.

On each request, I build a cache key from:

- the model identifier, and  
- the fully formatted prompt (after applying the prompt template).

In the cache I store only:

- the tokenized prompt (`input_ids`), already truncated to the model’s context window if needed.

On a **cache miss**:

- format the prompt,
- tokenize,
- truncate,
- store the resulting `input_ids` under that key.

On a **cache hit**:

- skip all of that,
- reuse the previously stored `input_ids`,
- continue with the normal model forward pass and sampling loop.

So v1 of the cache is:

- **per‑process** – it lives in memory in the running Python process,
- **per‑prompt** – keyed by formatted prompt + model,
- and doesn’t touch model internals at all.

Simple enough that I can understand every byte it stores.

---

## Why I didn’t cache the model’s internal state (yet)

The obvious next step is: why not cache more?

Hugging Face models can return a `past_key_values` object — basically the attention cache. In theory you can:

- run one forward pass over the prompt,
- save `past_key_values`,
- and on a cache hit, jump straight into the generation loop using that saved state.

I tried going down that path and ran into a few practical issues:

- different architectures represent caches differently,
- some attach helper methods or metadata, not just raw tensors,
- naive cloning or serialization can give you an object that *looks* right but breaks later with odd errors.

For this project I didn’t want “learn prompt caching” to turn into “reverse‑engineer every model’s internal KV layout”. So I made a decision:

- cache only data types I fully understand (prompt strings and token IDs),
- and don’t change the observable behavior of the engine — just remove redundant work.

That’s how I ended up with a token‑level cache as the first step.

---

## Making the cache actually useful: REPL mode

A cache is only interesting if the process stays alive long enough to see the same prompt again.

So the CLI has a **REPL mode**:

```bash
PYTHONPATH=src python -m llm_engine.cli.main \
  --repl \
  --do-sample \
  --temperature 0.7 \
  --top-k 50 \
  --verbose
```

In this mode:

- the model and tokenizer are loaded once at startup,
- a single `InferenceEngine` and `PromptCache` are created,
- every line you type at the `>>>` prompt goes through that same engine and cache.

If you type the same prompt twice, the logs tell a nice little story.

First run (cache miss, full flow):

```text
[INFO] __main__ - Loading tokenizer and model: roneneldan/TinyStories-33M
[INFO] llm_engine.engine.inference - Initialized InferenceEngine with model=HFCausalLM, prompt_cache=enabled
[INFO] llm_engine.engine.inference - Received user prompt (58 chars)
[INFO] llm_engine.engine.inference - Formatted prompt (58 chars)
[INFO] llm_engine.engine.inference - Prompt cache miss
[INFO] llm_engine.engine.inference - Tokenized prompt into 12 tokens before truncation
[INFO] llm_engine.engine.inference - Using 12 tokens after truncation
[INFO] llm_engine.engine.inference - Storing tokenized prompt in cache
[INFO] llm_engine.engine.inference - Using eos_token_id=50256
[INFO] llm_engine.engine.inference - Sampling config: max_new_tokens=32, temperature=0.700, top_k=50, top_p=None, do_sample=True
[INFO] llm_engine.engine.inference - Running initial forward pass with 12 tokens
[INFO] llm_engine.engine.inference - Starting generation loop (max_new_tokens=32)
...
[INFO] llm_engine.engine.inference - Decoding complete: generated 18 new tokens (96 chars)
```

Second run (same prompt, cache hit, tokenization skipped):

```text
[INFO] llm_engine.engine.inference - Received user prompt (58 chars)
[INFO] llm_engine.engine.inference - Formatted prompt (58 chars)
[INFO] llm_engine.engine.inference - Prompt cache hit
[INFO] llm_engine.engine.inference - Loaded cached tokenized prompt with 12 tokens
[INFO] llm_engine.engine.inference - Using eos_token_id=50256
[INFO] llm_engine.engine.inference - Sampling config: max_new_tokens=32, temperature=0.700, top_k=50, top_p=None, do_sample=True
[INFO] llm_engine.engine.inference - Running initial forward pass with 12 tokens
[INFO] llm_engine.engine.inference - Starting generation loop (max_new_tokens=32)
...
[INFO] llm_engine.engine.inference - Decoding complete: generated 19 new tokens (101 chars)
```

In the actual blog I plan to attach a screenshot of this section of logs. It’s a small thing, but it makes the cache feel real — you can literally see where the second run skips work that the first run had to do.

From the outside nothing else changes:

- same prompt in,
- same sampling settings,
- same behavior as before.

The cache just quietly removes some repeated work under the hood.

---

## Why this was worth doing

Even this small cache forced me to think in a more “systems” way:

- **What uniquely identifies a prompt?**  
  Raw user text isn’t enough once you add system prompts or templates, so the key uses the **formatted** prompt plus the **model name**.

- **What’s safe to reuse across calls?**  
  Token IDs are simple and portable; opaque model objects are not (yet).

- **Where in the pipeline should caching live?**  
  Right between formatting and tokenization turns out to be a sweet spot: you see the final string, but you’re still upstream of anything backend‑specific.

It also gives me a clear path for future experiments:

- add a model‑aware layer that knows how to snapshot and restore KV caches for specific architectures,
- extend the cache from “prompt → tokens” to “prompt → model state” behind the same interface,
- and eventually play with **prefix caching**, not just exact string matches.

---

## Closing thoughts

None of this is production‑grade, but building it piece by piece — especially the cache and the long‑lived REPL mode — made LLM inference feel a lot less mysterious. Under the hood it really is:

1. prepare text,  
2. reuse whatever you can,  
3. turn it into tokens,  
4. run the model,  
5. and walk forward one token at a time.

If you want to poke around, the code is here:  
[`arsh14jain/llm-inference-engine`](https://github.com/arsh14jain/llm-inference-engine)

The prompt cache is intentionally small and easy to break — which is exactly why it was worth building. It’s a safe place to experiment before trying the more ambitious versions you see in large‑scale systems.

