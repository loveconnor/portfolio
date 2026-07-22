---
title: 'I Built My Own Tokenizer. It Came First in My Benchmark.'
subtitle: 'Why I built a byte-lossless Unigram tokenizer and how I tested it'
description: 'I built a byte-lossless Unigram tokenizer, created an interactive app to show how it works, and tested it against nine pinned baselines.'
slug: 'i-built-my-own-tokenizer'
date: '2026-07-22'
tags:
  - Artificial Intelligence
  - Tokenization
  - Natural Language Processing
  - Machine Learning
draft: false
---

# I Built My Own Tokenizer. It Came First in My Benchmark.

_Why I built a byte-lossless Unigram tokenizer and how I tested it_

I built a tokenizer, tested it against nine pinned lab baselines, and watched it produce the smallest token count in the entire comparison.

Not by a few hundred tokens, either.

It used 59,430 fewer tokens than OpenAI’s `o200k_base`, the next-best aggregate result.

I also built an interactive app where anyone can try my tokenizer, compare it with the other tokenizers, and inspect the benchmark for themselves.

Here is what I built, how I tested it, and what the result actually means.

## Why tokenizers matter

Language models don’t process words directly.

A tokenizer first divides text into smaller pieces called tokens. A common word might be one token. A longer or less familiar word could become several. Code, numbers, emoji, URLs, and different languages can all be divided in very different ways.

For a model trained with a tokenizer, those divisions affect sequence length. A tokenizer that represents the same text with fewer tokens can fit more source material inside a fixed context window and reduce some of the model’s per-token processing work.

But fewer tokens aren’t automatically better. Large vocabularies also increase the size and cost of a model’s embedding and output layers. Token boundaries can affect how easily the model learns languages, code, numbers, and word structure.

That is why I wanted to test more than a few sample sentences.

## Building my tokenizer

My tokenizer is a byte-lossless Unigram tokenizer with 195,124 text pieces.

“Byte-lossless” means it is designed to reproduce the original input exactly after encoding and decoding. It doesn’t need to silently normalize away characters that might matter in code, identifiers, technical text, or Unicode.

“Unigram” describes how it chooses the tokens.

Most of the pinned lab artifacts in my comparison use Byte Pair Encoding, better known as BPE. BPE learns common combinations and follows a fixed set of merge rules.

A Unigram tokenizer begins with many possible pieces. It scores different ways to split the text and selects the best complete sequence.

The idea has research behind it. Taku Kudo introduced a Unigram-based tokenizer and probabilistic subword sampling in [Subword Regularization](https://aclanthology.org/P18-1007/). The paper reported improvements in several translation settings, especially with limited data and out-of-domain text.

That didn’t prove Unigram would win my comparison. It gave me a good reason to test it.

## Showing how it works

I didn’t want people to read a list of numbers and take my word for it.

So I built an interactive app around my tokenizer.

You can paste in your own text and see how ten different tokenizers divide it. The app shows the token count, token boundaries, bytes per token, and tokens per word for each result.

You can try normal prose, code, JSON, multiple languages, emoji, URLs, or anything else you want to test.

The app also includes the complete benchmark, its source inventory, the individual results for all 19 tracks, multilingual measurements, edge-case tests, and the exact tokenizer versions used.

The point of the app is simple: show what my tokenizer does and make the comparison easy to inspect.

## Building the benchmark

The comparison includes my tokenizer and nine pinned baselines:

- OpenAI `o200k_base`
- Anthropic’s official 2023 tokenizer
- Google Gemma 4
- Moonshot Kimi K2.6
- DeepSeek V3.2
- xAI Grok-1
- Meta Llama 3.1
- Mistral Small 4
- Alibaba Qwen3

These are pinned, reproducible artifacts. They are not claims about every current private tokenizer used by those companies.

The Anthropic and xAI entries are older open proxies. Gemma is not Gemini. Kimi K2.6 is not K3.

I wanted that limitation to be visible instead of hiding it behind the lab names.

The complete benchmark contains 2,116 records and 4.37 million source bytes across 19 tracks. It includes:

- Wikipedia samples across 15 languages
- Common Crawl
- GitHub repositories
- Stack Overflow
- Books and news
- Scientific papers
- HTML, JSON, and Markdown
- Python, TypeScript, Rust, C++, and Java
- All TokenizerBench 0.2.0 language, code, math, and edge-case fixtures

The source versions, licenses, content hashes, corpus hash, and tokenizer revisions are locked. That makes the comparison repeatable.

Duplicate content is counted once in the aggregate ranking, leaving 2,097 unique records and 3.87 million bytes.

## The result

| Rank | Tokenizer            | Aggregate tokens |
| ---: | -------------------- | ---------------: |
|    1 | My tokenizer         |          831,879 |
|    2 | OpenAI `o200k_base`  |          891,309 |
|    3 | Google Gemma 4       |          933,814 |
|    4 | Meta Llama 3.1       |          942,586 |
|    5 | DeepSeek V3.2        |          943,045 |
|    6 | Mistral Small 4      |          955,975 |
|    7 | Alibaba Qwen3        |        1,008,318 |
|    8 | Moonshot Kimi K2.6   |        1,012,788 |
|    9 | Anthropic 2023 proxy |        1,287,956 |
|   10 | xAI Grok-1 proxy     |        1,401,916 |

My tokenizer used 6.67% fewer tokens than OpenAI, the next-best result.

It averaged 4.65 UTF-8 bytes per token. OpenAI averaged 4.34. A higher number means each token represented more of the original input.

Mine also produced the densest encoding on 14 of the 19 tracks, including Common Crawl, GitHub, Stack Overflow, books, scientific papers, HTML, JSON, Markdown, and all five featured programming languages.

It reconstructed all 292 TokenizerBench edge cases exactly after encoding and decoding.

## It didn’t win everything

This is where the benchmark gets more interesting.

Google led the Wikipedia and TokenizerBench language tracks. Meta narrowly led the TokenizerBench code fixtures. Kimi led math and science. OpenAI led the edge-case track on token count.

My tokenizer also did not have the best score on every multilingual metric.

So I’m not calling it a universal winner. The result depends on the corpus, the metric, and what the tokenizer needs to do.

What I can say is that it produced the fewest aggregate tokens across the full deduplicated benchmark.

## Does this mean it would make a better AI model?

I don’t know yet.

A tokenizer can look great on compression and still perform worse once it is used to train a model.

The researchers behind [Tokenization Is More Than Compression](https://aclanthology.org/2024.emnlp-main.40/) trained 64 models and found that minimizing token count alone did not guarantee better downstream performance.

[Tokenizer Choice for LLM Training](https://aclanthology.org/2024.findings-naacl.247/) tested 24 models at 2.6 billion parameters. That study found that tokenizer choice can affect training cost and model performance, but common tokenizer metrics do not always predict which model will be best.

[TokLens](https://aclanthology.org/2026.acl-srw.18/) found links between tokenizer measurements and multilingual performance. Its authors also made clear that those results were correlational and partly affected by differences in training data.

The honest claim is:

> On this locked, held-out benchmark, my tokenizer used fewer aggregate tokens than all nine pinned lab baselines.

No more. No less.

## The real test comes next

The next experiment is matched language-model training.

I need to take the same model architecture, training data, raw byte count, data order, and compute budget, then train separate versions with different tokenizers.

That would let me test:

- Language-model loss per original byte
- Training cost
- Multilingual performance
- Code and numerical performance
- Long-context behavior
- Unicode and spelling robustness
- Whether the result holds across multiple training runs

That is a much bigger experiment. It is also the only honest way to move from “my tokenizer uses fewer tokens” to “my tokenizer builds a better model.”

For now, I built something that works, tested it against serious baselines, and got a result worth sharing.

Try my tokenizer and inspect the full benchmark: **[tokenizer.connorlove.com](https://tokenizer.connorlove.com)**
