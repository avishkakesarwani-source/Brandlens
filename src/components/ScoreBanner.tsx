import React from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, Volume2, ShieldAlert, SplitSquareVertical, LayoutList } from 'lucide-react';
import type { AnalysisSummary } from '../types';

interface ScoreBannerProps {
  summary: AnalysisSummary;
  allResolved: boolean;
  activeView: 'inspect' | 'diff';
  onChangeView: (view: 'inspect' | 'diff') => void;
}

export const ScoreBanner: React.FC<ScoreBannerProps> = ({ 
  summary, 
  allResolved,
  activeView,
  onChangeView
}) => {
  const { complianceScore, highRiskCount, unverifiedCount, contradictedCount, toneIssueCount } = summary;

  const activeScore = allResolved ? 100 : complianceScore;

  // Circular progress calculations
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (activeScore / 100) * circumference;

  const getScoreStroke = () => {
    if (activeScore >= 90) return '#10b981'; // emerald
    if (activeScore >= 70) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm mb-4 relative overflow-hidden transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Animated Radial Dial & Health Title */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke={getScoreStroke()}
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {activeScore}%
              </span>
              <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-400 mt-0.5">Score</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {allResolved
                  ? 'All Brand Violations Resolved · 100% Compliant'
                  : activeScore >= 90
                  ? 'High Brand Alignment'
                  : activeScore >= 70
                  ? 'Requires Verification & Substantiation'
                  : 'High-Risk Unverified Claims Detected'}
              </h2>
              {allResolved && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {allResolved
                ? 'Every claim has been reconciled with brand records. Ready for authenticated publishing.'
                : 'Checked against Claims Policy §2, Comparative Rules & CCPA Oct 2024 Green Guidelines.'}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Breakdown Chips */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* View Mode Toggle (Interactive WOW factor!) */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onChangeView('inspect')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeView === 'inspect'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5 text-teal-600" />
              <span>Inspector View</span>
            </button>
            <button
              onClick={() => onChangeView('diff')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeView === 'diff'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-indigo-600" />
              <span>Before / After Diff</span>
            </button>
          </div>

          {/* Metric Chips */}
          <div className="flex items-center gap-2">
            <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
              contradictedCount > 0 && !allResolved
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/60' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Contradicted: <strong>{allResolved ? 0 : contradictedCount}</strong></span>
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
              unverifiedCount > 0 && !allResolved
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/60' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="Claims without verified lab proof (Unverified is not false)"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Unverified: <strong>{allResolved ? 0 : unverifiedCount}</strong></span>
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
              toneIssueCount > 0 && !allResolved
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/60' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}>
              <Volume2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Tone: <strong>{allResolved ? 0 : toneIssueCount}</strong></span>
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${
              highRiskCount > 0 && !allResolved
                ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-900/60' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}>
              <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>High Risk: <strong>{allResolved ? 0 : highRiskCount}</strong></span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
