// BrandLens Domain Data Models

export type SeverityLevel = 'high' | 'medium' | 'low';

export type FlagType = 
  | 'contradicted'   // Directly contradicts approved facts (e.g., false origin/specs)
  | 'unverified'     // Superlative or absolute claim lacking cited lab/third-party proof
  | 'tone_voice'     // Deviates from company voice & brand persona
  | 'accessibility'; // Formatting or accessibility issue (e.g., missing alt-text)

export type FlagStatus = 'pending' | 'accepted' | 'rejected' | 'custom_edited';

export interface BrandRule {
  id: string;              // e.g. "CP-02"
  policySection: string;   // e.g. "Claims Policy §2"
  title: string;           // e.g. "No Absolute or Unsubstantiated Guarantees"
  category: 'claims' | 'tone' | 'legal' | 'accessibility';
  severity: SeverityLevel;
  ruleText: string;        // Exact rule wording
  rationale: string;       // Why this rule exists (e.g. ASCI / CCPA 2024 compliance)
}

export interface ApprovedFact {
  id: string;              // e.g. "FACT-ECO-01"
  topic: string;           // e.g. "Packaging & Materials"
  statement: string;       // Verified truth from brand records
  verifiedProofRef: string;// e.g. "CCPA Green Audit #2024-912, ISO 14021"
}

export interface BrandKit {
  brandName: string;
  tagline: string;
  industry: string;
  primaryRules: BrandRule[];
  approvedFacts: ApprovedFact[];
  prohibitedSuperlatives: string[];
  approvedClaims: string[];
  voiceAndTone: {
    traits: string[];
    bannedPhrases: string[];
    guidelines: string;
  };
}

export interface ContentFlag {
  id: string;
  matchedText: string;
  startIndex: number;
  endIndex: number;
  ruleId: string;
  ruleTitle: string;
  policySection: string;
  flagType: FlagType;
  severity: SeverityLevel;
  explanation: string;
  suggestedRewrite: string;
  detectionSource: 'deterministic_heuristic' | 'gemini_grounded';
  status: FlagStatus;
  customRewrite?: string;
}

export interface AnalysisSummary {
  originalText: string;
  flags: ContentFlag[];
  complianceScore: number; // 0 - 100%
  highRiskCount: number;
  unverifiedCount: number;
  contradictedCount: number;
  toneIssueCount: number;
  analyzedAt: string;
}

export interface ApprovalRecord {
  id: string;
  version: number;
  approvedBy: string;
  userRole: 'Brand Manager' | 'Legal Reviewer' | 'Content Lead';
  timestamp: string;
  finalContent: string;
  resolvedFlagsCount: number;
  auditHash: string;
}
