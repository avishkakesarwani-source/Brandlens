import type { BrandKit } from '../types';

export const ECOGLOW_BRAND_KIT: BrandKit = {
  brandName: "EcoGlow",
  tagline: "Sustainable Daily Essentials",
  industry: "Consumer Goods / Eco-Friendly Packaging",
  primaryRules: [
    {
      id: "CP-02",
      policySection: "Claims Policy §2",
      title: "No Absolute or Unsubstantiated Guarantees",
      category: "claims",
      severity: "high",
      ruleText: "Absolute guarantees (e.g. '100% guaranteed', 'completely risk-free') are prohibited unless supported by certified third-party lab proof.",
      rationale: "ASCI Consumer Protection Code 2025 and Section 2(47) Consumer Protection Act."
    },
    {
      id: "CP-04",
      policySection: "Pricing & Comparative Policy §4",
      title: "Unsubstantiated Comparative Superlatives",
      category: "claims",
      severity: "high",
      ruleText: "Global superlatives like 'cheapest in the world', 'best on the market', or 'lowest price ever' cannot be published without verifiable benchmark pricing audits.",
      rationale: "Comparative advertising regulations mandate current market pricing audit trail."
    },
    {
      id: "GW-01",
      policySection: "Environmental Claims Guidelines §1",
      title: "Greenwashing & Planetary Impact Claims",
      category: "claims",
      severity: "high",
      ruleText: "Broad planetary claims like 'saves the planet', '100% eco-friendly', or 'zero harm' require full cradle-to-grave Life Cycle Assessment (LCA) documentation.",
      rationale: "CCPA Green Claims Guidelines (Oct 2024) mandates specific, verifiable substantiation."
    },
    {
      id: "TV-03",
      policySection: "Tone & Voice Manual §3",
      title: "Avoid Sensationalist & Aggressive Hype",
      category: "tone",
      severity: "medium",
      ruleText: "Maintain an honest, humble, scientific, and educational tone. Avoid aggressive hype or ungrounded urgency.",
      rationale: "EcoGlow brand identity emphasizes scientific transparency over marketing hyperbole."
    },
    {
      id: "A11Y-01",
      policySection: "Accessibility Standards §1",
      title: "Mandatory Image Alt-Text & Plain Language",
      category: "accessibility",
      severity: "low",
      ruleText: "All visual creatives and social cards must accompany descriptive screen-reader text and clear contrast.",
      rationale: "WCAG 2.1 AA Compliance."
    }
  ],
  approvedFacts: [
    {
      id: "FACT-ECO-01",
      topic: "Packaging Materials",
      statement: "EcoGlow bottles are manufactured from 85% post-consumer recycled ocean-bound plastics.",
      verifiedProofRef: "OceanBound Plastics Standard Cert #OBP-2025-994"
    },
    {
      id: "FACT-ECO-02",
      topic: "Carbon Footprint",
      statement: "Our regional supply chain reduces transport emissions by 34% compared to virgin plastic manufacturing.",
      verifiedProofRef: "TÜV Rheinland Lifecycle Assessment LCA-2024-410"
    },
    {
      id: "FACT-ECO-03",
      topic: "Pricing Guarantee",
      statement: "Competitively priced within top 15% tier of sustainable reusable bottles.",
      verifiedProofRef: "Quarterly Retail Audit Q3 2026"
    }
  ],
  prohibitedSuperlatives: [
    "100% guaranteed",
    "cheapest in the world",
    "saves the planet",
    "miracle cure",
    "zero environmental footprint",
    "best bottle ever made",
    "guaranteed result"
  ],
  approvedClaims: [
    "Designed to help reduce environmental impact.",
    "Made with 85% certified ocean-bound recycled plastic.",
    "Durable, BPA-free everyday hydration."
  ],
  voiceAndTone: {
    traits: ["Transparent", "Humble", "Fact-Driven", "Empowering"],
    bannedPhrases: ["game changer", "revolutionary secret", "unbeatable world first"],
    guidelines: "We speak with scientific integrity. We don't exaggerate our impact; we let audited data speak."
  }
};

export interface SampleDraft {
  id: string;
  title: string;
  description: string;
  draftText: string;
  expectedFlagsCount: number;
}

export const SAMPLE_DRAFTS: SampleDraft[] = [
  {
    id: "ecoglow-round1",
    title: "EcoGlow Launch Copy (Round 1 Deck Sample)",
    description: "Contains absolute guarantee, superlative claim, and ungrounded green claims from Slide 5.",
    draftText: "EcoGlow: Clean the planet, starting today.\n\nOur bottle is 100% guaranteed to save the planet and is the cheapest in the world. Switch now and make your carbon footprint zero overnight!",
    expectedFlagsCount: 3
  },
  {
    id: "clean-copy",
    title: "Compliant Approved Copy (Clean Benchmark)",
    description: "Scientifically substantiated text referencing certified facts.",
    draftText: "EcoGlow: Designed to help reduce environmental impact.\n\nOur bottle is made from 85% certified ocean-bound recycled plastic. Join our mission for sustainable, everyday hydration with verified lower emissions.",
    expectedFlagsCount: 0
  },
  {
    id: "social-influencer",
    title: "Influencer Ad Pitch (Misleading Claim)",
    description: "Violates ASCI influencer guidelines with unproven health and superiority claims.",
    draftText: "The revolutionary secret doctors don't want you to know! Our bottle is 100% guaranteed to detoxify your drinking water and is the cheapest in the world.",
    expectedFlagsCount: 3
  }
];
