---
title: "The Great AI Compute Crunch: How China's Hottest AI Companies Ran Out of Tokens"
slug: "china-ai-compute-crunch-2026"
description: "MiniMax, Kimi, Zhipu API overloads. Cloud vendors hiking prices 430%. The inside story of China's AI 'token famine' — and why it signals a global inflection point."
date: "2026-04-29"
author: "AI in China Team"
tags: ["算力荒", "AI Compute", "MiniMax", "Kimi", "Zhipu AI", "DeepSeek", "Token Shortage", "Huawei Ascend", "AI Infrastructure", "China AI"]
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200"
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "The Great AI Compute Crunch: How China's Hottest AI Companies Ran Out of Tokens",
  "description": "MiniMax, Kimi, Zhipu API overloads. Cloud vendors hiking prices 430%. The inside story of China's AI 'token famine'.",
  "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
  "datePublished": "2026-04-29T04:30:00+08:00",
  "author": {
    "@type": "Organization",
    "name": "AI in China Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AI in China",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ai-in-china.vercel.app/logo.png"
    }
  },
  "keywords": "算力荒, AI Compute, MiniMax, Kimi, Zhipu AI, DeepSeek, Token Shortage, Huawei Ascend, AI Infrastructure, China AI"
}
</script>

# The Great AI Compute Crunch: How China's Hottest AI Companies Ran Out of Tokens

> "The biggest problem for the next 12 months isn't demand — it's compute." — Zhang Peng, CEO, Zhipu AI

**Published**: April 29, 2026 | **Reading time**: 17 minutes

---

![Data Center Overload](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200)

## The Day the APIs Said No

It started with a error message that millions of developers had never seen before.

"当前服务集群负载较高，请稍候重试，感谢您的耐心等待。" *(Current service cluster load is high. Please retry later. Thank you for your patience.)*

For a developer integrating MiniMax's API into his company's workflow, this popup in April 2026 was the digital equivalent of a gas station running dry during a fuel crisis. MiniMax — previously known as one of the most API-resource-rich startups among China's AI unicorns — was turning users away.

He wasn't alone. Since February 2026, **Kimi** users had grown accustomed to seeing "高峰期算力不足" *(peak hours compute insufficient)* warnings. **Zhipu AI's** GLM-5 launch triggered API queues so severe that long-chain code generation tasks simply cut out mid-stream. Even **DeepSeek**, the efficiency darling that supposedly trained a world-class model for $5.6 million, suffered a **12-hour service blackout** at the end of March — its seventh major outage since January.

Something fundamental had shifted in China's AI industry. The problem wasn't model quality. It wasn't user acquisition. It wasn't even money.

**The problem was raw compute. And China had run out.**

---

## 1. "Waiting for Tokens": The New Normal

### 1.1 The API Apocalypse

By April 2026, China's leading AI model providers were experiencing something unprecedented in the industry's brief history: **structured rationing of computational resources**.

| Company | Stock Code | Symptom | First Reported | Severity |
|---------|-----------|---------|---------------|----------|
| **MiniMax** | 00100.HK | API overload messages, server busy errors | April 2026 | 🔴 High |
| **Kimi** (Moonshot AI) | Private | "Peak hours compute insufficient" since Feb | February 2026 | 🔴 High |
| **Zhipu AI** | 02513.HK | API queues, code generation interruptions | February 2026 | 🔴 Critical |
| **DeepSeek** | Private | 7 major outages since Jan, 12-hour blackout Mar 29 | March 2026 | 🔴 Critical |
| **Doubao** (ByteDance) | Private | Access restricted, "try again later" prompts | Q1 2026 | 🟡 Medium |
| **Qwen** (Alibaba) | Private | Internal departments asked to pause non-critical workloads | February 2026 | 🟡 Medium |

The developer quoted by Caixin *(财新网)* — one of China's most respected financial media outlets — captured the existential anxiety now gripping the industry:

> *"现在每天都担心Token停了怎么办，这些事情都停摆吗？"* *("Every day I worry about what happens if tokens stop flowing. Do all these operations just grind to a halt?")*

This isn't theoretical. For companies that have embedded AI into their core business processes — automated customer service, AI-powered coding pipelines, document analysis workflows — a token outage isn't an inconvenience. It's a **business continuity crisis**.

### 1.2 When "Unlimited" Becomes Limited

The rationing hasn't been subtle. China's cloud vendors and model providers have deployed increasingly aggressive measures to manage demand:

| Rationing Measure | Deployed By | Details | Impact on Users |
|-------------------|-------------|---------|-----------------|
| **Coding Plan refunds** | Zhipu AI | Full refund channel opened Apr 13 for Coding Plan subscribers | Developers lost prepaid capacity mid-project |
| **Daily sales cap at 20%** | Zhipu AI | Coding Plan limited to 20% of previous daily sales volume | Jan 2026 onward |
| **Price hikes: 30% then 20%** | Zhipu AI | Coding Plan +30% in Feb, GLM-5-Turbo API +20% in Mar | 56% cumulative price increase |
| **Lite tier termination** | Alibaba Cloud | 40 RMB/month Lite Coding Plan discontinued Apr 11 | Budget developers forced to 200 RMB Pro tier |
| **Pro tier sellouts** | Alibaba Cloud | 200 RMB Pro plan repeatedly sold out; restocked daily at 9:30 AM | Users "camping" for quota like sneaker drops |
| **Periodic usage caps** | Tencent, ByteDance, Baidu | 5-hour or weekly cycle limits on high-frequency usage | Power users throttled unpredictably |
| **Core model price +430%** | Tencent Cloud | Hunyuan core model prices raised March 2026 | One of the largest single price jumps in industry history |
| **Infrastructure price +5-34%** | Alibaba, Tencent, Baidu | AI compute, container services, storage all repriced | Entire stack becomes more expensive |

The message from every major player is identical, even if unspoken: **we don't have enough chips to serve everyone at the prices we promised.**

---

## 2. Demand Explosion: The Agent Multiplier Effect

### 2.1 From Chatbots to Task-Doers

The compute crunch didn't emerge from nowhere. It has a specific, identifiable trigger: **the agent revolution**.

In early 2026, a new class of AI applications — broadly categorized under frameworks like **OpenClaw** *("龙虾" in Chinese tech circles)* — fundamentally changed how users interact with large language models.

Traditional AI usage was conversational: a user asks a question, the model answers. A typical interaction might consume **a few thousand tokens**.

Agent frameworks changed the equation. Instead of answering questions, AI systems now **execute multi-step tasks** — researching across websites, writing code, running tests, iterating on errors, generating reports. A single agent-driven workflow can easily consume **3-5x the tokens** of a simple Q&A session. Complex autonomous tasks burn through **10-100x** the compute.

As Zhipu AI CEO Zhang Peng noted at the Zhongguancun Forum on March 27:

> *"完成一个任务可能需要的Token量，是原来回答一个简单问题Token量的十倍甚至百倍。"* *("The token volume required to complete a task can be ten or even a hundred times that of answering a simple question.")*

### 2.2 The Numbers Behind the Crunch

| Demand Driver | Before Agents | After Agents (2026) | Multiplier |
|---------------|--------------|---------------------|------------|
| Average session tokens | ~2,000-5,000 | ~15,000-50,000 | **3-10x** |
| Developer daily consumption | ~100K tokens | ~500K-2M tokens | **5-20x** |
| OpenRouter weekly global tokens | ~1.5T (Apr 2025) | ~12T (Apr 2026) | **~7-8x** |
| China daily token calls (national) | ~1T (2024) | **140T** (Mar 2026) | **140x** |
| China share of OpenRouter calls | ~15% | **~40%** | **2.7x** |

The last figure is staggering. According to China's National Data Bureau, the country's **daily token call volume crossed 140 trillion in March 2026** — a **140-fold increase** from roughly 1 trillion just two years prior.

This isn't gradual growth. This is a **demand supernova**.

### 2.3 AI Coding: The Ultimate Token Burner

If agents are the demand amplifier, **AI coding tools** are the highest-intensity burner.

A senior algorithm engineer at a top Chinese tech company described his workflow transformation to Caixin:

> *"AI从辅助工具转变为开发流程中的刚需，开发流程已从自己编写代码转向审核和修改AI生成代码。"* *("AI has shifted from an assistive tool to a workflow necessity. My job has changed from writing code to reviewing and modifying AI-generated code.")*

Every code generation request, every test run, every error-fixing iteration consumes tokens. When an AI writes a 500-line function, then rewrites it three times to fix bugs, then generates unit tests — that's potentially **millions of tokens** for a single development task.

And in 2026, this isn't experimental. It's how software is being built.

---

## 3. Supply Squeeze: Why the Chips Aren't There

### 3.1 The Export Control Trap

If demand exploded, why didn't supply keep pace? The answer lies in geopolitics.

Since 2022, the United States has progressively tightened export controls on advanced AI chips to China. The **NVIDIA H800** — a cut-down version of the H100 specifically designed to circumvent earlier restrictions — became the workhorse of Chinese AI training.

But the noose kept tightening. By 2025-2026, even H800-class chips faced new restrictions. Chinese companies found themselves in a paradox: **their models were getting better, their user bases were exploding, but their ability to acquire the chips needed to serve those users was shrinking.**

| Chip | Status for China | FP16 Performance | Memory | Availability |
|------|-----------------|-------------------|--------|-------------|
| **NVIDIA H100** | ❌ Banned | 989 TFLOPS | 80GB HBM3 | Zero |
| **NVIDIA H800** | ⚠️ Restricted | ~700 TFLOPS | 80GB HBM2e | Severely limited |
| **NVIDIA H20** | ✅ Available (for now) | 296 TFLOPS | 96GB HBM3 | Limited, pricey |
| **Huawei Ascend 910B** | ✅ Domestic | ~320 TFLOPS | 64GB HBM2e | Ramping |
| **Huawei Ascend 950PR** | ✅ Domestic | 1.56 PFLOPS (FP4) | 112GB | New, scarce |
| **Moore Threads MTT S4000** | ✅ Domestic | ~200 TFLOPS | 48GB | Emerging |

The H20 — NVIDIA's most advanced chip still legally exportable to China — offers **less than one-third the compute** of the H100. Yet it's being snapped up at premium prices because there simply isn't an alternative for companies that haven't completed the painful migration to domestic hardware.

### 3.2 The Price of Scarcity

When supply can't meet demand, prices rise. The AI chip market in China has seen extraordinary inflation:

| Indicator | 2025 Baseline | 2026 Peak | Change |
|-----------|--------------|-----------|--------|
| **H100 spot rental (1-year)** | ~$1.70/hr/GPU | ~$2.35/hr/GPU | **+38%** |
| **Huawei Ascend 950PR** | Launch price | +20% after DeepSeek V4 announcement | Premium bids |
| **Cloud AI compute (Alibaba)** | Mar 2025 | Apr 2026 | **+5% to +34%** |
| **Tencent Hunyuan API** | Feb 2025 | Mar 2026 | **+430%+** |
| **Consumer GPU RTX 5090** | MSRP | Market price | Sold out / scalped |

Citi Securities *(中信证券)*, one of China's leading investment banks, summarized the situation in an April 2026 research note:

> *"Agent & 多模态等应用爆发导致国内算力荒，国产大模型在推理端积极适配为国产算力厂商带来加速放量机遇。"* *("Agent and multimodal application explosions have caused a domestic compute famine. Active adaptation of domestic large models to local inference hardware presents an accelerated volume opportunity for domestic chip manufacturers.")*

The key phrase: **"compute famine"** *(算力荒)*. This is the term now being used across China's tech industry.

---

## 4. Three Different Responses to the Same Storm

Not every company is handling the crunch the same way. The divergent strategies reveal deeper philosophies about survival in a resource-constrained environment.

### 4.1 Zhipu AI: The Transparent Apologizer

Zhipu AI has been the most visibly affected — and the most publicly contrite.

After GLM-5's launch triggered cascading failures, Zhipu issued a public apology acknowledging three specific failures:

1. **Insufficient rule transparency** — users didn't understand why they were being throttled
2. **Slow gray-release rhythm** — new capacity rolled out too cautiously
3. **Rough upgrade mechanism** — existing users were poorly transitioned to new plans

The company then opened **full refund channels** and committed to continued capacity expansion. CEO Zhang Peng's internal message was even starker:

> *"未来12个月最大问题是算力，不是需求。"* *("The biggest problem for the next 12 months is compute, not demand.")*

| Zhipu AI Financials | 2024 | 2025 | Change |
|---------------------|------|------|--------|
| Revenue | 3.12B RMB | 7.24B RMB | **+131.9%** |
| Net Loss | 29.5B RMB | 47.18B RMB | **-59.5% wider** |

Despite 132% revenue growth, losses **widened by nearly 60%**. Zhipu is spending more on compute than it can afford, even at premium prices.

### 4.2 MiniMax: The Efficiency Optimizer

MiniMax has taken a different tack: **aggressive cost reduction through architecture innovation**.

Founder Yan Junjie announced that by February 2026, the **million-token inference cost for M2-series models had dropped over 50%** compared to December 2025. This was achieved through:

- **MoE (Mixture of Experts) architecture optimization** — activating only subsets of the trillion-parameter model per query
- **Multi-platform GPU adaptation** — M2.7 launched April 12 with same-day support for Huawei Ascend, Moore Threads, and MetaX chips
- **Selective user prioritization** — the company explicitly stated it would **no longer blindly pursue absolute user count** *(不再盲目追求用户量的绝对值)*

This last point is remarkable. MiniMax — a company whose entire philosophy has been "product-first, users-first" — is now **choosing which users to serve** based on profitability.

### 4.3 DeepSeek: The Efficiency Myth Meets Reality

DeepSeek's story is perhaps the most ironic. The company built its global reputation on **doing more with less** — training world-class models with a fraction of the compute that OpenAI or Google requires.

Yet even DeepSeek couldn't escape the crunch. Seven major outages since January. A 12-hour blackout in March. The company's much-anticipated V4 model was reportedly **delayed multiple times specifically because of the engineering challenge of rewriting core code to run on Huawei chips** instead of NVIDIA.

| DeepSeek Outages (2026) | Date | Duration | Cause |
|------------------------|------|----------|-------|
| Outage #1 | January | Hours | Compute overload |
| Outage #2 | January | Hours | Compute overload |
| Outage #3 | February | Hours | Compute overload |
| Outage #4 | February | Hours | Compute overload |
| Outage #5 | March | Hours | Compute overload |
| Outage #6 | March | Hours | Compute overload |
| Outage #7 | Mar 29-30 | **~12 hours** | Major system failure |

The company that taught the world how to train efficiently is learning the hard lesson that **serving at scale is a different problem entirely**.

---

## 5. The Global Dimension: China's Crunch Is the World's Crunch

### 5.1 Anthropic's Trillion-Dollar Bet

If anyone still believes the compute shortage is a uniquely Chinese problem, consider what happened on April 20, 2026:

**Anthropic announced a 10-year, $100+ billion commitment** to purchase Amazon compute capacity — roughly **5 gigawatts** of new power. Amazon simultaneously invested $5 billion directly in Anthropic, with potential for an additional $200 billion.

This isn't a routine cloud contract. This is a **generational bet on compute scarcity**. Anthropic is effectively pre-purchasing a significant fraction of the world's future AI infrastructure because it believes demand will outstrip supply for a decade.

| Global Compute Arms Race (2026) | Commitment | Timeline |
|----------------------------------|-----------|----------|
| **Anthropic + Amazon** | $100B+ compute, $5B direct | 10 years |
| **Microsoft + OpenAI** | Stargate: $100B+ datacenter network | Multi-year |
| **Google** | Internal TPU clusters + cloud expansion | Ongoing |
| **Alibaba** | 123B RMB ($17B) capex in 2025 | Annual |
| **ByteDance** | ~160B RMB ($22B) estimated AI spend | Annual |
| **Meta** | "Model Capability Initiative" — employee surveillance for AI training data | Ongoing |

### 5.2 The Meta Surveillance Revelation

In a move that blurred the line between innovation and intrusion, Meta notified employees in April 2026 that it would begin capturing **mouse clicks, keyboard inputs, and screen content context** to train AI agents.

The justification? Meta needs more training data to build better agents. The method? Treat its own employees as data sources.

This underscores a broader truth: **the race for AI capability is increasingly a race for data, compute, and energy — and companies are becoming less scrupulous about how they acquire all three.**

---

## 6. The Domestic Chip Gambit: Huawei's Moment

### 6.1 The CANN Migration

The most significant strategic response to the compute crunch is China's accelerated pivot to **domestic AI chips** — led by Huawei's Ascend series.

DeepSeek V4, released April 24, 2026, was specifically architected to run on the **Huawei Ascend 950PR**. This wasn't a compatibility afterthought — it required rewriting core CUDA-dependent code for Huawei's **CANN** *(Compute Architecture for Neural Networks)* software stack.

| NVIDIA H20 vs Huawei Ascend 950PR | H20 | 950PR | Advantage |
|-----------------------------------|-----|-------|-----------|
| FP4 Compute | ~0.54 PFLOPS | **1.56 PFLOPS** | Huawei **2.9x** |
| HBM Memory | 96GB | **112GB** | Huawei **+17%** |
| Software Maturity | CUDA (20+ years) | CANN Next ( maturing ) | NVIDIA |
| Code Portability | 95%+ existing code | Requires rewrite | NVIDIA |
| Domestic Availability | Export-controlled | Unrestricted | Huawei |
| Price Trend | Rising | Stable | Huawei |

The numbers favor Huawei on raw specs. The question is whether the software ecosystem can close the gap.

### 6.2 The Ripple Effect

DeepSeek's V4 release triggered immediate market reactions:

- **Alibaba, ByteDance, Tencent reportedly placed orders for hundreds of thousands of Ascend 950PR chips**
- **Chip prices rose ~20%** in anticipation of supply constraints
- MiniMax M2.7 launched with **same-day support** for Ascend, Moore Threads, and MetaX — a multi-vendor hedge against single-supplier risk
- Morgan Stanley listed both Zhipu AI and MiniMax as **"structural beneficiaries of China's AI adoption cycle"** — despite (or because of) the compute crunch

The strategic implication is profound: **the chip embargo, intended to slow China's AI progress, may instead be accelerating its domestic semiconductor independence.**

---

## 7. What Happens Next: Three Scenarios

### Scenario A: Supply Catch-Up (Probability: 30%)

Huawei and other domestic chipmakers ramp production fast enough to meet demand by late 2026. Cloud prices stabilize. API reliability returns. The crunch becomes a footnote.

**Required:** Domestic chips match NVIDIA's performance-per-watt within 12 months. Massive capital flows into fabs and packaging. No new export controls.

### Scenario B: Prolonged Hunger Games (Probability: 50%)

Supply remains constrained through 2027. Companies differentiate by **compute efficiency** rather than model size. The industry consolidates — smaller players can't secure chip access and fold. Pricing power shifts to cloud vendors.

**Required:** Domestic chips improve but not fast enough. Export controls tighten further. Agent demand continues exponential growth.

### Scenario C: Structural Rationing (Probability: 20%)

Compute becomes a **permanently scarce resource** like prime real estate. AI capabilities become tiered: premium users get fast, unlimited access; free tiers become nearly unusable. A secondary market for compute quotas emerges.

**Required:** No breakthrough in chip efficiency or supply. Energy constraints (data center power) become binding. Global demand outpaces all supply responses.

| Scenario | Timeline | Winners | Losers |
|----------|----------|---------|--------|
| **A: Supply Catch-Up** | Late 2026 | Domestic chipmakers, efficient model builders | NVIDIA (loses China market) |
| **B: Hunger Games** | Through 2027 | Big cloud vendors, companies with chip supply | Small startups, academic researchers |
| **C: Permanent Rationing** | 2028+ | Premium service providers, compute brokers | Open source community, developing nations |

---

## 8. What It Means for Builders and Users

### For Developers

The era of "infinite cheap tokens" is over. Architectural decisions now have real cost implications:

- **Caching strategies** matter more than ever
- **Model distillation** — running smaller models for simpler tasks — becomes essential
- **Multi-vendor strategies** reduce single-point-of-failure risk
- **Local deployment** for sensitive/high-volume workloads becomes cost-competitive

### For Enterprises

AI dependencies need **business continuity planning**:

- Multi-provider API strategies are no longer optional
- On-premise or hybrid deployments may justify upfront infrastructure investment
- Token budgets need the same rigor as cloud compute budgets
- Fallback workflows for AI outages should be tested regularly

### For Investors

The compute crunch reframes competitive advantage:

| Traditional Moat | New Moat |
|----------------|----------|
| Model performance (benchmarks) | **Compute efficiency** (tokens per dollar) |
| Parameter count | **Supply chain relationships** (chip access) |
| Research talent | **Infrastructure engineering** (cost optimization) |
| Brand awareness | **Multi-platform compatibility** (vendor flexibility) |

---

## Social Pulse: What Chinese Netizens Are Saying

*Real comments translated from Chinese social media and developer forums:*

> **"I set an alarm for 9:25 AM every day to grab Alibaba's Pro plan quota. This is what AI development has become — a sneaker drop."**
> 
> "我每天定9:25的闹钟抢阿里云Pro套餐额度。AI开发变成了抢球鞋。"

> **"My company's entire customer service pipeline runs on Kimi API. When it goes down, 200 agents sit idle. We used to worry about model accuracy. Now we worry about uptime."**
> 
> "我们公司整个客服流水线跑在Kimi API上。一宕机，200个客服坐着发呆。以前担心模型准不准，现在担心能不能跑。"

> **"Zhipu refunded my Coding Plan and I felt grateful. That's how low the bar is now — 'thanks for giving my money back when you couldn't deliver.'"**
> 
> "智谱给我退了Coding Plan的钱，我居然还很感激。现在的底线都这么低了——'谢谢你没提供服务还把钱退我了'。"

> **"DeepSeek trained a trillion-parameter model for $5M but can't keep the website up for 24 hours. Efficiency in training ≠ efficiency in serving."**
> 
> "DeepSeek花500万美元训了个万亿参数模型，但网站连24小时都撑不住。训练高效不等于服务高效。"

> **"The real winner of the chip ban is Huawei. Every restriction just pushes another Chinese company onto their chips. By 2027 they'll have the ecosystem NVIDIA spent 20 years building."**
> 
> "芯片禁令的真正赢家是华为。每多一条限制，就多一家中国公司用上他们的芯片。到2027年他们会拥有NVIDIA花了20年建起的生态。"

> **"Students use AI to write papers. Schools use AI to check papers. Companies use AI to hire. Candidates use AI to interview. We're all just burning tokens at each other now."**
> 
> "学生用AI写论文，学校用AI查论文，公司用AI招聘，候选人用AI面试。我们现在就是互相烧Token。"

---

## Conclusion: The Famine That Forged Independence

China's AI compute crunch is more than a supply chain hiccup. It is the **defining operational challenge** of the industry's current phase — and potentially the catalyst for its next evolution.

The numbers tell a stark story:

- **140 trillion daily token calls** in China, up 140x in two years
- **API overloads** at every major model provider
- **Price hikes of 430%+** as cloud vendors pass through chip costs
- **$100 billion commitments** from Western AI companies to secure compute
- **Domestic chip adoption** accelerating faster than any policy mandate could achieve

Zhang Peng's warning — *"compute, not demand"* — is the single most important strategic insight in China AI right now. For the next 12 months, the companies that survive and thrive won't necessarily be those with the best models. They'll be the ones that **secure compute, optimize its usage, and architect around scarcity**.

DeepSeek's V4 running on Huawei chips isn't just a technical achievement. It's a **declaration of independence** from an ecosystem that China can no longer rely on.

MiniMax's 50% cost reduction isn't just financial engineering. It's a **survival adaptation** in an environment where waste is fatal.

And the developer setting his alarm for 9:25 AM to grab API quota? He's the canary in the coal mine — the signal that **AI's infrastructure phase has arrived**, and it's going to be bumpy.

The token famine will pass. But the industry it leaves behind will look fundamentally different: more efficient, more domestically resilient, and more keenly aware that **in the AI era, compute is oxygen**.

Hold your breath.

---

## Related Articles

1. [DeepSeek V4: Trillion Parameters, Million-Token Context, Huawei Chips — The Silent Monk Returns](/posts/deepseek-v4-official-release)
2. [MiniMax: How a 4-Year-Old Chinese AI Startup Built a 236 Million-User Global Empire](/posts/minimax-global-ai-empire)
3. [The Stanford AI Index 2026: China's Rise and the Closing Gap with America](/posts/stanford-ai-index-china-rise)
4. [AI Video Commercialization: How Kling, Hailuo, and Runway Are Racing to Monetize](/posts/ai-video-commercialization)

---

## Data Sources

- Caixin *(财新网)*: "Service Overload, Sold Out, Interrupted: Model Providers Fall into 'Compute Famine'" (April 21, 2026)
- Caixin: "Anthropic Plans $100B+ Amazon Compute Purchase Over 10 Years" (April 21, 2026)
- Sina Finance: "Domestic Chips — Can They Solve Zhipu and MiniMax's Compute Famine?" (April 26, 2026)
- Citi Securities Research: "Token Volume Explosion Causes Compute Famine; Domestic Compute Accelerates in Inference" (April 16, 2026)
- 36Kr: "China AI Narrative Boiling, Don't Rush Liang Wenfeng" (April 20, 2026)
- China.com: "MiniMax Stock Nearly Halved; Compute Shortage Primary Cause" (April 28, 2026)
- National Data Bureau of China: March 2026 statistics
- Zhipu AI 2025 Annual Financial Report
- MiniMax HKEX earnings call transcript (March 2026)
- OpenRouter global API call statistics (April 2026)

---

*Published on AI in China | April 29, 2026. Unauthorized reproduction prohibited.*
