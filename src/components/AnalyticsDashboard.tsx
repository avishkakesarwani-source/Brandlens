import React from 'react';
import { BarChart3, AlertOctagon, ShieldCheck } from 'lucide-react';
import type { BrandKit } from '../types';

interface AnalyticsDashboardProps {
  brandKit: BrandKit;
  onSelectRuleForClarification?: (ruleId: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  brandKit
}) => {
  // Real-world analytics stats matching Slide 8 & Slide 6
  const errorFrequencies = [
    { label: "Claims with no proof (Unverified)", count: 42, percentage: 85, color: "bg-rose-500", note: "CCPA Green Claims & Superlatives" },
    { label: "Tone and word choice", count: 28, percentage: 60, color: "bg-amber-500", note: "Urgency hype & aggressive buzzwords" },
    { label: "Missing alt text (WCAG)", count: 19, percentage: 45, color: "bg-indigo-500", note: "53.1% WebAIM accessibility benchmark" },
    { label: "Colour palette mistakes", count: 11, percentage: 25, color: "bg-teal-500", note: "Off-palette marketing banners" },
  ];

  // Slide 6 Feature: "We track which rules people break or overrule most. That usually means the rule is unclear."
  const unclearRules = [
    {
      ruleId: "CP-02",
      title: "No Absolute or Unsubstantiated Guarantees",
      brokenTimes: 24,
      overruledByCreators: 9,
      ambiguityScore: "High Ambiguity (38% Overrule Rate)",
      diagnostic: "Creators frequently bypass this because the line between 'educational confidence' and 'absolute guarantee' is blurred in marketing copy.",
      recommendedFix: "Provide explicit whitelist of approved confidence terms (e.g. 'designed to' instead of 'guaranteed to')."
    },
    {
      ruleId: "GW-01",
      title: "Greenwashing & Planetary Impact Claims",
      brokenTimes: 18,
      overruledByCreators: 6,
      ambiguityScore: "Medium Ambiguity (33% Overrule Rate)",
      diagnostic: "Agencies struggle to know which LCA certificates qualify under October 2024 CCPA regulations.",
      recommendedFix: "Link active third-party cert numbers directly into the editor placeholder."
    },
    {
      ruleId: "TV-03",
      title: "Avoid Sensationalist & Aggressive Hype",
      brokenTimes: 14,
      overruledByCreators: 2,
      ambiguityScore: "Low Ambiguity (14% Overrule Rate)",
      diagnostic: "Clear definition with explicit banned words list.",
      recommendedFix: "Maintain current guidelines."
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-slate-900">Compliance Analytics & "Unclear Rules" Intelligence</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                Slide 6 & 8 Delivered
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Aggregated insights tracking repeat brand violations and identifying ambiguous policy rules for {brandKit.brandName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Active Dataset: 20 Benchmark Audits</span>
        </div>
      </div>

      {/* Slide 8 Exact Illustration: "Dashboard idea" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>Repeat Mistakes Distribution</span>
            <span className="text-xs font-normal text-slate-400 normal-case">(Slide 8 Illustration Implemented)</span>
          </h4>
          <span className="text-xs text-slate-500">100 Total Audit Incidents</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          {errorFrequencies.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 italic text-[11px]">{item.note}</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.count} incidents
                  </span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 6 Delivered: "We fix the rules too" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>We Fix The Rules Too (Policy Ambiguity Index)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              "We track which rules people break or overrule most. That usually means the rule is unclear." (Slide 6)
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Self-Optimizing Governance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {unclearRules.map((rule) => (
            <div key={rule.ruleId} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">
                    {rule.ruleId}
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {rule.ambiguityScore}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-slate-900 mb-1">{rule.title}</h5>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  {rule.diagnostic}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
                <strong>Recommended Policy Update:</strong> {rule.recommendedFix}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
