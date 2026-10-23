import type { BrandKit, ContentFlag, AnalysisSummary } from '../types';
import { ECOGLOW_BRAND_KIT } from '../data/mockBrandKit';

/**
 * BrandLens Hybrid Intelligence Engine
 * 
 * Pipeline:
 * 1. Heuristic Scan (Instant Regex & Deterministic Lexical Matches)
 * 2. LLM Semantic Verification (Gemini AI with JSON schema, with graceful fallback)
 * 3. Grounding & Anti-Hallucination Guard (Ensures 100% of flags map to real Rule IDs)
 */

export class BrandLensEngine {
  private brandKit: BrandKit;

  constructor(brandKit: BrandKit = ECOGLOW_BRAND_KIT) {
    this.brandKit = brandKit;
  }

  /**
   * Primary Analysis Method
   */
  public async analyzeContent(
    text: string, 
    apiKey?: string
  ): Promise<AnalysisSummary> {
    if (!text || text.trim().length === 0) {
      return {
        originalText: text,
        flags: [],
        complianceScore: 100,
        highRiskCount: 0,
        unverifiedCount: 0,
        contradictedCount: 0,
        toneIssueCount: 0,
        analyzedAt: new Date().toISOString()
      };
    }

    // Step 1: Run Deterministic Engine
    const deterministicFlags = this.runDeterministicPass(text);

    // Step 2: Run AI Engine (if API Key provided), otherwise semantic heuristics
    let aiFlags: ContentFlag[] = [];
    if (apiKey && apiKey.trim().length > 10) {
      try {
        aiFlags = await this.runGeminiPass(text, apiKey);
      } catch (err) {
        console.warn("Gemini API call failed, falling back to embedded heuristics:", err);
        aiFlags = this.runDeepHeuristics(text);
      }
    } else {
      aiFlags = this.runDeepHeuristics(text);
    }

    // Step 3: Merge and Deduplicate Flags
    const mergedFlags = this.mergeFlags(deterministicFlags, aiFlags);

    // Step 4: Grounding Guard (Drop any flag whose ruleId does not exist in Brand Kit)
    const groundedFlags = this.filterHallucinations(mergedFlags);

    // Step 5: Compute Compliance Score and Risk Stats
    const stats = this.computeStatistics(groundedFlags);

    return {
      originalText: text,
      flags: groundedFlags,
      ...stats,
      analyzedAt: new Date().toISOString()
    };
  }

  /**
   * Deterministic Heuristic Engine
   * Catches high-risk claims instantly using regex without LLM delay
   */
  private runDeterministicPass(text: string): ContentFlag[] {
    const flags: ContentFlag[] = [];

    // Check 1: "100% guaranteed"
    const guaranteeMatch = text.match(/100%\s*guaranteed/i);
    if (guaranteeMatch && guaranteeMatch.index !== undefined) {
      flags.push({
        id: `flag-det-1-${Date.now()}`,
        matchedText: guaranteeMatch[0],
        startIndex: guaranteeMatch.index,
        endIndex: guaranteeMatch.index + guaranteeMatch[0].length,
        ruleId: "CP-02",
        ruleTitle: "No Absolute or Unsubstantiated Guarantees",
        policySection: "Claims Policy §2",
        flagType: "unverified",
        severity: "high",
        explanation: '"100% guaranteed" has no approved scientific or lab proof in Brand Kit. Status: unverified (we do not label it false, but proof is required).',
        suggestedRewrite: "Designed to provide reliable everyday performance",
        detectionSource: "deterministic_heuristic",
        status: "pending"
      });
    }

    // Check 2: "cheapest in the world" or superlatives
    const cheapestMatch = text.match(/cheapest in the world|lowest price ever|cheapest anywhere/i);
    if (cheapestMatch && cheapestMatch.index !== undefined) {
      flags.push({
        id: `flag-det-2-${Date.now()}`,
        matchedText: cheapestMatch[0],
        startIndex: cheapestMatch.index,
        endIndex: cheapestMatch.index + cheapestMatch[0].length,
        ruleId: "CP-04",
        ruleTitle: "Unsubstantiated Comparative Superlatives",
        policySection: "Pricing & Comparative Policy §4",
        flagType: "unverified",
        severity: "high",
        explanation: 'Comparative superlative claims require verifiable, current market pricing audit documentation.',
        suggestedRewrite: "Competitively priced for everyday sustainability",
        detectionSource: "deterministic_heuristic",
        status: "pending"
      });
    }

    // Check 3: "save the planet" (Greenwashing / Broad planetary impact)
    const savePlanetMatch = text.match(/save the planet|zero environmental footprint|zero harm/i);
    if (savePlanetMatch && savePlanetMatch.index !== undefined) {
      flags.push({
        id: `flag-det-3-${Date.now()}`,
        matchedText: savePlanetMatch[0],
        startIndex: savePlanetMatch.index,
        endIndex: savePlanetMatch.index + savePlanetMatch[0].length,
        ruleId: "GW-01",
        ruleTitle: "Greenwashing & Planetary Impact Claims",
        policySection: "Environmental Claims Guidelines §1",
        flagType: "unverified",
        severity: "high",
        explanation: 'Under CCPA Guidelines (Oct 2024), broad claims like "save the planet" require verified cradle-to-grave Life Cycle Assessment (LCA) proof.',
        suggestedRewrite: "help reduce environmental impact with verified lower emissions",
        detectionSource: "deterministic_heuristic",
        status: "pending"
      });
    }

    return flags;
  }

  /**
   * Semantic Rule Matcher / Deep Heuristics
   * Catches tone mismatches, ungrounded health secrets, hype
   */
  private runDeepHeuristics(text: string): ContentFlag[] {
    const flags: ContentFlag[] = [];

    // Check 4: Tone and Hype phrases
    const hypeMatch = text.match(/revolutionary secret|doctors don't want you to know|overnight|magic/i);
    if (hypeMatch && hypeMatch.index !== undefined) {
      flags.push({
        id: `flag-deep-4-${Date.now()}`,
        matchedText: hypeMatch[0],
        startIndex: hypeMatch.index,
        endIndex: hypeMatch.index + hypeMatch[0].length,
        ruleId: "TV-03",
        ruleTitle: "Avoid Sensationalist & Aggressive Hype",
        policySection: "Tone & Voice Manual §3",
        flagType: "tone_voice",
        severity: "medium",
        explanation: 'Sensationalist urgency and medical hype violates the Brand Voice guideline emphasizing humble, transparent communication.',
        suggestedRewrite: "scientifically designed and tested approach",
        detectionSource: "deterministic_heuristic",
        status: "pending"
      });
    }

    // Check 5: Detoxify / Unapproved health claims
    const detoxMatch = text.match(/detoxify your drinking water|cures all ailments/i);
    if (detoxMatch && detoxMatch.index !== undefined) {
      flags.push({
        id: `flag-deep-5-${Date.now()}`,
        matchedText: detoxMatch[0],
        startIndex: detoxMatch.index,
        endIndex: detoxMatch.index + detoxMatch[0].length,
        ruleId: "CP-02",
        ruleTitle: "No Absolute or Unsubstantiated Guarantees",
        policySection: "Claims Policy §2",
        flagType: "contradicted",
        severity: "high",
        explanation: 'EcoGlow bottles are hydration vessels, not medical detox devices. Contradicts approved product specifications.',
        suggestedRewrite: "keep your water fresh throughout the day",
        detectionSource: "deterministic_heuristic",
        status: "pending"
      });
    }

    return flags;
  }

  /**
   * Gemini AI Grounded Analysis
   */
  private async runGeminiPass(text: string, apiKey: string): Promise<ContentFlag[]> {
    const rulesPrompt = this.brandKit.primaryRules.map(r => 
      `[Rule ID: ${r.id}] ${r.policySection} - ${r.title}: ${r.ruleText}`
    ).join("\n");

    const factsPrompt = this.brandKit.approvedFacts.map(f => 
      `[Fact ID: ${f.id}] ${f.topic}: ${f.statement} (Proof: ${f.verifiedProofRef})`
    ).join("\n");

    const systemPrompt = `You are BrandLens Compliance AI. Analyze the draft text against the Brand Rules and Approved Facts.
Rules:
${rulesPrompt}

Approved Facts:
${factsPrompt}

Return ONLY a JSON array of objects with schema:
[
  {
    "matchedText": "exact substring from draft",
    "ruleId": "exact Rule ID from rules above (e.g. CP-02, CP-04, GW-01, TV-03)",
    "ruleTitle": "rule title",
    "policySection": "policy section",
    "flagType": "unverified" | "contradicted" | "tone_voice",
    "severity": "high" | "medium" | "low",
    "explanation": "concise explanation of violation or missing proof",
    "suggestedRewrite": "compliant alternative text"
  }
]`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nDraft Content to Analyze:\n${text}` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return [];

    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item, idx) => {
      const matchIdx = text.indexOf(item.matchedText);
      return {
        id: `flag-gemini-${idx}-${Date.now()}`,
        matchedText: item.matchedText,
        startIndex: matchIdx >= 0 ? matchIdx : 0,
        endIndex: matchIdx >= 0 ? matchIdx + item.matchedText.length : item.matchedText.length,
        ruleId: item.ruleId,
        ruleTitle: item.ruleTitle,
        policySection: item.policySection,
        flagType: item.flagType || 'unverified',
        severity: item.severity || 'high',
        explanation: item.explanation,
        suggestedRewrite: item.suggestedRewrite,
        detectionSource: 'gemini_grounded',
        status: 'pending'
      };
    });
  }

  /**
   * Grounding Guard (Crucial for Slide 9: "AI can make up rules or facts; 
   * our code removes any flag it cannot match to a source")
   */
  private filterHallucinations(flags: ContentFlag[]): ContentFlag[] {
    const validRuleIds = new Set(this.brandKit.primaryRules.map(r => r.id));
    return flags.filter(flag => {
      const isValid = validRuleIds.has(flag.ruleId);
      if (!isValid) {
        console.warn(`[Anti-Hallucination Guard] Dropped ungrounded AI flag citing unknown rule: ${flag.ruleId}`);
      }
      return isValid;
    });
  }

  /**
   * Merge and Deduplicate overlapping flags
   */
  private mergeFlags(detFlags: ContentFlag[], aiFlags: ContentFlag[]): ContentFlag[] {
    const all = [...detFlags];
    for (const af of aiFlags) {
      // Check if already covered by deterministic flag
      const overlap = all.some(df => 
        (af.startIndex >= df.startIndex && af.startIndex < df.endIndex) ||
        (df.startIndex >= af.startIndex && df.startIndex < af.endIndex)
      );
      if (!overlap) {
        all.push(af);
      }
    }
    // Sort chronologically by appearance in text
    return all.sort((a, b) => a.startIndex - b.startIndex);
  }

  /**
   * Compute Risk Metrics & Compliance Score
   */
  private computeStatistics(flags: ContentFlag[]) {
    const unverified = flags.filter(f => f.flagType === 'unverified').length;
    const contradicted = flags.filter(f => f.flagType === 'contradicted').length;
    const toneVoice = flags.filter(f => f.flagType === 'tone_voice').length;
    const highRisk = flags.filter(f => f.severity === 'high').length;

    // Penalty scoring algorithm
    let score = 100;
    score -= contradicted * 30; // heavy penalty for false facts
    score -= unverified * 15;   // moderate penalty for missing proof
    score -= toneVoice * 10;    // light penalty for tone issues
    score = Math.max(10, Math.min(100, score));

    return {
      complianceScore: score,
      highRiskCount: highRisk,
      unverifiedCount: unverified,
      contradictedCount: contradicted,
      toneIssueCount: toneVoice
    };
  }
}

export const defaultEngine = new BrandLensEngine(ECOGLOW_BRAND_KIT);
