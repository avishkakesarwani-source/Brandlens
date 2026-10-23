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

export const FINEDGE_BRAND_KIT: BrandKit = {
  brandName: "FinEdge Wealth",
  tagline: "Intelligent Portfolio Management",
  industry: "Fintech / Wealth Management",
  primaryRules: [
    {
      id: "FIN-01",
      policySection: "SEBI Compliance §12(a)",
      title: "No Guaranteed Returns or Zero-Risk Claims",
      category: "claims",
      severity: "high",
      ruleText: "Investments are subject to market risks. Claiming 'zero risk', 'guaranteed 25% returns', or 'risk-free wealth' is legally prohibited.",
      rationale: "SEBI Advertising Code 2024 for Registered Investment Advisors."
    },
    {
      id: "FIN-02",
      policySection: "Financial Disclosures §3",
      title: "Mandatory Risk Disclaimer Requirement",
      category: "legal",
      severity: "high",
      ruleText: "All promotional materials must carry standard risk disclosure: 'Investments are subject to market risks, read all scheme-related documents carefully.'",
      rationale: "Statutory mandatory disclaimer."
    }
  ],
  approvedFacts: [
    {
      id: "FACT-FIN-01",
      topic: "Regulatory Registration",
      statement: "FinEdge is a SEBI-registered Investment Advisory (Reg #INA00018274).",
      verifiedProofRef: "SEBI Registry Directory 2025"
    }
  ],
  prohibitedSuperlatives: [
    "guaranteed 25% return",
    "zero risk",
    "can never lose money",
    "double your money"
  ],
  approvedClaims: [
    "Systematic investment strategies tailored to your financial goals.",
    "Data-driven risk-adjusted portfolio management."
  ],
  voiceAndTone: {
    traits: ["Prudent", "Analytical", "Transparent", "Compliant"],
    bannedPhrases: ["get rich quick", "secret money glitch", "foolproof jackpot"],
    guidelines: "We communicate financial risk with absolute clarity and professionalism."
  }
};

export interface SampleDraft {
  id: string;
  brandKey: 'ecoglow' | 'finedge';
  title: string;
  description: string;
  draftText: string;
  expectedFlagsCount: number;
}

export const SAMPLE_DRAFTS: SampleDraft[] = [
  {
    id: "ecoglow-round1",
    brandKey: "ecoglow",
    title: "⚡ EcoGlow Launch Copy (Slide 5 Demo)",
    description: "Contains absolute guarantee, superlative claim, and ungrounded green claims from Slide 5.",
    draftText: "EcoGlow: Clean the planet, starting today.\n\nOur bottle is 100% guaranteed to save the planet and is the cheapest in the world. Switch now and make your carbon footprint zero overnight!",
    expectedFlagsCount: 3
  },
  {
    id: "clean-copy",
    brandKey: "ecoglow",
    title: "✨ Clean Approved Copy (100% Score)",
    description: "Scientifically substantiated text referencing certified facts with zero violations.",
    draftText: "EcoGlow: Designed to help reduce environmental impact.\n\nOur bottle is made from 85% certified ocean-bound recycled plastic. Join our mission for sustainable, everyday hydration with verified lower emissions.",
    expectedFlagsCount: 0
  },
  {
    id: "social-influencer",
    brandKey: "ecoglow",
    title: "📢 Influencer Ad (Medical Hype Violation)",
    description: "Violates ASCI influencer guidelines with unproven health and superiority claims.",
    draftText: "The revolutionary secret doctors don't want you to know! Our bottle is 100% guaranteed to detoxify your drinking water and is the cheapest in the world.",
    expectedFlagsCount: 3
  },
  {
    id: "finedge-risky",
    brandKey: "finedge",
    title: "💳 FinEdge Fintech Promo (SEBI Violation)",
    description: "Promises guaranteed returns and zero risk, triggering statutory violations.",
    draftText: "FinEdge Wealth: Double your money in 6 months! Our algorithm is zero risk and offers guaranteed 25% return with zero loss ever.",
    expectedFlagsCount: 2
  }
];
