// BrandLens Complete Domain Data Models

export type SeverityLevel = 'high' | 'medium' | 'low';

export type ClaimVerificationStatus = 
  | 'proven'          // Verified by an approved fact in Brand Kit (Green)
  | 'no_proof_found'  // Unverified claim lacking proof (Amber)
  | 'goes_against_facts'; // Contradicts approved facts or regulations (Red)

export type FlagType = 
  | 'contradicted'   // Goes against facts
  | 'unverified'     // No proof found
  | 'tone_voice'     // Voice & tone mismatch
  | 'accessibility'; // Formatting or missing alt text

export type FlagStatus = 'pending' | 'accepted' | 'rejected' | 'custom_edited';

export type UserRole = 'Creator' | 'Brand Manager' | 'Reviewer';

export interface FlagComment {
  id: string;
  author: string;
  role: UserRole;
  text: string;
  timestamp: string;
}

export interface BrandRule {
  id: string;              // e.g. "CP-02"
  policySection: string;   // e.g. "Claims Policy §2"
  title: string;           // e.g. "No Absolute or Unsubstantiated Guarantees"
  category: 'claims' | 'tone' | 'legal' | 'accessibility';
  severity: SeverityLevel;
  ruleText: string;        // Exact rule wording
  rationale: string;       // Why this rule exists
  breakCount?: number;     // For Slide 8 unclear rules dashboard
  overruleCount?: number;  // For Slide 6 unclear rules tracking
}

export interface ApprovedFact {
  id: string;              // e.g. "FACT-ECO-01"
  topic: string;           // e.g. "Packaging Materials"
  statement: string;       // Verified truth from brand records
  verifiedProofRef: string;// e.g. "OceanBound Standard Cert #OBP-2025-994"
}

export interface BrandColor {
  name: string;
  hex: string;
  usage: 'Primary' | 'Secondary' | 'Accent' | 'Background';
}

export interface BrandKit {
  id: string;
  brandName: string;
  tagline: string;
  industry: string;
  colors: BrandColor[];
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
  claimStatus: ClaimVerificationStatus; // Slide 8: proven, no proof found, or goes against facts
  flagType: FlagType;
  severity: SeverityLevel;
  explanation: string;
  suggestedRewrite: string;
  detectionSource: 'deterministic_heuristic' | 'gemini_grounded';
  status: FlagStatus;
  customRewrite?: string;
  comments: FlagComment[]; // Slide 8: comments
}

export interface ImageAnalysisResult {
  fileName: string;
  fileSize: number;
  previewUrl: string;
  detectedColors: { hex: string; percentage: number; isOffBrand: boolean }[];
  altText: string;
  altTextStatus: 'missing' | 'valid' | 'ai_suggested';
  suggestedAltText?: string;
  contrastRatio?: number;
  passedCompliance: boolean;
}

export interface AnalysisSummary {
  originalText: string;
  flags: ContentFlag[];
  provenClaimsCount: number;
  complianceScore: number;
  highRiskCount: number;
  unverifiedCount: number;
  contradictedCount: number;
  toneIssueCount: number;
  analyzedAt: string;
}

export interface ContentVersion {
  versionNumber: number;
  author: string;
  role: UserRole;
  timestamp: string;
  content: string;
  changeNote: string;
  status: 'draft' | 'changes_requested' | 'approved';
}

export interface ApprovalRecord {
  id: string;
  version: number;
  approvedBy: string;
  userRole: UserRole;
  timestamp: string;
  finalContent: string;
  resolvedFlagsCount: number;
  auditHash: string;
  status: 'approved' | 'changes_requested';
  managerFeedback?: string;
}
