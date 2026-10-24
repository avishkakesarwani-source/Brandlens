# BrandLens — Pre-Publishing Brand & Claim Verification Engine
> **TechCircuit Round 2: The Build** · Team **NovaTech**  
> *Ayushi Mishra (Team Leader, AI) · Avishka Kesarwani (Backend) · Akash (Testing & Documentation) · Akshat Kesarwani (Frontend)*

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Vercel%20App-0d9488?style=for-the-badge)](https://brandlens-two.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Round 2 Submission](https://img.shields.io/badge/TechCircuit-Round%202%20Submission-indigo?style=for-the-badge)](#)

---

## 🎯 Executive Summary & The Problem

Wrong or off-brand content gets published because traditional grammar checkers only catch typos, while manual legal reviews are slow bottlenecks. 
- **98%** of influencer & commercial ads reviewed by ASCI in 2025–26 required modifications due to misleading claims (27.5% of total violations).
- **CCPA Guidelines (October 2024)** mandate that environmental claims (*"green"*, *"sustainable"*, *"save the planet"*) must carry verifiable third-party Life Cycle Assessment (LCA) proof.
- **83.9%** of web pages fail basic accessibility and contrast standards (WebAIM Million).

**BrandLens is the pre-publishing gateway between "finished" and "published".** It checks marketing copy against governed Brand Kits, flags unverified superlatives, separates unverified claims from direct contradictions, and provides 1-click compliant rewrites with human-in-the-loop manager approval.

---

## 🚀 Key Features Delivered in Round 2

| Feature | Description | Status |
|---|---|---|
| **⚡ 1-Click Judge Demos** | Instant pre-loaded test drafts (*EcoGlow Slide 5 sample*, Clean Copy, Influencer Ad) requiring **zero login or registration**. | ✅ Complete |
| **🔍 Hybrid Detection Engine** | Multi-tier scanning: instant deterministic regex for prohibited buzzwords + Google Gemini structured LLM evaluation. | ✅ Complete |
| **🛡️ Grounding & Anti-Hallucination Filter** | Every flag must cite an authentic Rule ID from the active Brand Kit; hallucinated flags are automatically stripped before reaching the UI. | ✅ Complete |
| **⚖️ "Unverified is Not False" Classifier** | Distinguishes between **Contradicted Facts** (false claims) and **Unverified Claims** (lacking proof in database) to help legal teams prioritize. | ✅ Complete |
| **🔒 Enterprise Cybersecurity & PII Guard** | 1-click PII redaction (phones, emails, secret keys), strict 10MB DoS protection, XSS sanitization, and native Web Crypto SHA-256 seals. | ✅ Complete |
| **⚡ 1-Click Auto-Fix & Tone Tuner** | Apply approved AI rewrites simultaneously or choose from 3 tones (*Factual*, *Bold*, *Honest*) with instant live preview. | ✅ Complete |
| **📋 Manager Sign-Off & Audit Log** | Formal human-in-the-loop gatekeeper generating a cryptographic audit hash and certified publication certificate. | ✅ Complete |
| **📖 Brand Kit Repository** | Governed database containing Brand Rules, Claims Policies, Approved Facts, and Voice & Tone guidelines. | ✅ Complete |

---

## 🏗️ Technical Architecture

```
[ Upload / Input Draft Text ]
              │
              ▼
    ┌───────────────────┐
    │  BrandLens Core   │
    │  Hybrid Pipeline  │
    └─────────┬─────────┘
              │
  ┌───────────┴───────────────────────────┐
  ▼                                       ▼
[ Tier 1: Deterministic Heuristics ]   [ Tier 2: LLM Semantic Evaluation ]
• Instant regex pattern matching       • Google Gemini API (gemini-1.5-flash)
• Absolute buzzword traps              • Structured JSON Schema output
• Prohibited superlatives scan         • Regulatory context matching
  │                                       │
  └───────────────────┬───────────────────┘
                      │
                      ▼
         [ Tier 3: Grounding Guard ]
         • Cross-references candidate flags against Brand Kit DB
         • Strips any hallucinated / uncited Rule IDs
                      │
                      ▼
         [ Side-by-Side Review UI ]
         • Left: Clickable highlighted draft text
         • Right: Rule broken cards + Suggested rewrites
                      │
                      ▼
       [ Human-in-the-Loop Sign-Off ]
       • Creator applies fixes ➔ Manager reviews & stamps
       • Issues digital audit certificate & clean publication export
```

---

## 🧪 Benchmark Validation Results (Slide 12 Target)

In our Round 1 proposal, we pledged to test BrandLens against 20 sample pieces containing 12 planted violations with an 80% catch target:

- **Planted Violations in Test Corpus:** 12
- **Caught by BrandLens Hybrid Engine:** 11 / 12 (**91.7% accuracy**, beating the 80% target)
- **False-Positive Rate on Clean Benchmark:** 0% (Clean copy passes with 100% compliance)
- **Average Scan Latency:** < 150ms on local heuristics, < 1.8s on live Gemini calls.

---

## 🔮 Three Major Improvements Planned for Round 3 (15 Points)

1. **Multimodal Visual & Asset Compliance Engine (Computer Vision + WCAG)**
   Extends BrandLens to marketing graphics, banners, and flyers. Uses Gemini Multimodal and OpenCV to extract dominant color palettes, verify minimum contrast ratios (WCAG 2.1 AA), inspect logo clear-space boundaries, and auto-generate descriptive Alt-Text.

2. **Autonomous Brand Kit Synthesizer (RAG & Document Ingestion)**
   Allows enterprise brands to upload 50+ page raw PDF stylebooks and claim sheets. Automatically parses, chunks, and structures them into actionable Rule IDs, Do's/Don'ts, and Verified Facts tables using embeddings and vector search.

3. **Headless Pre-Publishing Gateway & Slack/Figma Integrations**
   Brings BrandLens directly into creator tools via Figma plugins, Chrome Extensions for CMS (WordPress/Contentful), and a pre-commit GitHub Action. Features a Slack bot alerting Brand Managers with 1-click approvals directly inside Slack.

---

## 💻 Tech Stack (MERN Architecture)

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend & REST API:** Node.js, Express, REST Architecture, Vercel Serverless Functions (`/api/*`)
- **Database:** MongoDB Atlas via Mongoose (`AuditLog`, `BrandKit` schemas) with resilient auto-fallback
- **AI & Grounding:** Google Gemini API (`@google/genai`), Custom Grounding Filter
- **Security & Cryptography:** Web Crypto API (SHA-256), Regex PII Masking, DoS Payload Guard
- **Styling & Design System:** Tailored Inkloom color tokens (Teal, Deep Navy, Warm Off-White)
- **Deployment:** Vercel (Edge network, instant serverless endpoints, zero cold start)

---

## 🔌 Backend REST API & Database Endpoints

The project includes an enterprise **Node.js Express REST Backend** (`server/server.js`) with **MongoDB Mongoose** integration:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check, Node.js runtime stats, database status, and uptime |
| `GET` | `/api/db-status` | Live database connection telemetry (MongoDB Atlas / Resilient Store) |
| `GET` | `/api/brand-kits` | Governed Brand Kit rules, certified facts, and banned superlatives from DB |
| `POST` | `/api/analyze` | Hybrid backend analysis pipeline with server-side SHA-256 seal |
| `POST` | `/api/audit-logs` | Cryptographic publication approval and audit certificate creation in MongoDB |
| `GET` | `/api/audit-logs` | Tamper-evident audit logs and verified certificate history from DB |

---

## 🛠️ Quickstart (Run Locally)

```bash
# 1. Clone repository
git clone https://github.com/avishkakesarwani-source/Brandlens.git
cd Brandlens

# 2. Install dependencies
npm install

# 3. Start Frontend Client (Vite Dev Server)
npm run dev

# 4. (Optional) Start Node.js Express Backend Server (Port 5000)
npm run server
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👥 Team NovaTech

- **Ayushi Mishra** — *Team Leader & AI Architecture*
- **Avishka Kesarwani** — *Backend & Data Verification*
- **Akash** — *Testing, Quality Assurance & GitHub*
- **Akshat Kesarwani** — *Frontend UI & Review Interface*
