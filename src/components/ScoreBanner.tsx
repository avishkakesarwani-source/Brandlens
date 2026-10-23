import React from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, Volume2, ShieldAlert } from 'lucide-react';
import type { AnalysisSummary } from '../types';

interface ScoreBannerProps {
  summary: AnalysisSummary;
  allResolved: boolean;
}

export const ScoreBanner: React.FC<ScoreBannerProps> = ({ summary, allResolved }) => {
  const { complianceScore, highRiskCount, unverifiedCount, contradictedCount, toneIssueCount } = summary;

  // Determine score health color
  const getScoreColor = (score: number) => {
    if (allResolved || score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const activeScore = allResolved ? 100 : complianceScore;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Score & Main Health Gauge */}
        <div className="flex items-center space-x-4">
          <div className={`h-16 w-16 rounded-2xl border-2 flex flex-col items-center justify-center font-bold transition-all shadow-sm ${getScoreColor(activeScore)}`}>
            <span className="text-2xl leading-none">{activeScore}%</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">Score</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">
                {allResolved
                  ? 'All Brand Issues Resolved — Ready for Publishing'
                  : activeScore >= 90
                  ? 'High Brand Alignment'
                  : activeScore >= 70
                  ? 'Requires Claims & Proof Verification'
                  : 'Critical Violations & Unverified Claims Detected'}
              </h2>
              {allResolved && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {allResolved
                ? 'Every flagged claim has been reconciled with the active Brand Kit.'
                : 'Checked against Claims Policy §2, Comparative Advertising Rules & CCPA Oct 2024 Green Guidelines.'}
            </p>
          </div>
        </div>

        {/* Breakdown Metric Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Contradicted Facts */}
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
            contradictedCount > 0 && !allResolved
              ? 'bg-rose-50 text-rose-800 border-rose-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Contradicted: <strong>{allResolved ? 0 : contradictedCount}</strong></span>
          </div>

          {/* Unverified (Differentiator from Slide 6) */}
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
            unverifiedCount > 0 && !allResolved
              ? 'bg-amber-50 text-amber-800 border-amber-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}
          title="Claims that lack proof in brand kit (Unverified is not false)"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Unverified Claims: <strong>{allResolved ? 0 : unverifiedCount}</strong></span>
          </div>

          {/* Tone & Voice */}
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
            toneIssueCount > 0 && !allResolved
              ? 'bg-blue-50 text-blue-800 border-blue-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            <Volume2 className="w-4 h-4 text-blue-500" />
            <span>Tone & Voice: <strong>{allResolved ? 0 : toneIssueCount}</strong></span>
          </div>

          {/* High Severity */}
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
            highRiskCount > 0 && !allResolved
              ? 'bg-orange-50 text-orange-800 border-orange-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span>High Severity: <strong>{allResolved ? 0 : highRiskCount}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
