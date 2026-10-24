import React from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Wand2, 
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';
import type { AnalysisSummary, BrandKit } from '../types';

interface SimpleScoreHeaderProps {
  summary: AnalysisSummary | null;
  allResolved: boolean;
  isExpertMode: boolean;
  onToggleExpertMode: () => void;
  onAutoFixAll: () => void;
  onLoadSample: () => void;
  onOpenApproval: () => void;
  draftText: string;
  brandKit: BrandKit;
}

export const SimpleScoreHeader: React.FC<SimpleScoreHeaderProps> = ({
  summary,
  allResolved,
  isExpertMode,
  onToggleExpertMode,
  onAutoFixAll,
  onLoadSample,
  onOpenApproval,
  draftText,
  brandKit
}) => {
  const [copied, setCopied] = React.useState(false);

  const pendingCount = summary ? summary.flags.filter(f => f.status === 'pending').length : 0;
  const score = allResolved ? 100 : (summary ? summary.complianceScore : 0);

  const handleCopyText = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm mb-6 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        
        {/* Left: Big Score & Plain-English Status */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* Circular Score Badge */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#e2e8f0"
                className="dark:stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke={allResolved || score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#f43f5e'}
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={(2 * Math.PI * 32) - (score / 100) * (2 * Math.PI * 32)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none">
                {score}%
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Score</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {allResolved 
                  ? '🎉 100% Brand Compliant & Verified!' 
                  : pendingCount > 0 
                  ? `${pendingCount} claim${pendingCount > 1 ? 's' : ''} need verification`
                  : 'Ready to Check Your Draft'}
              </h2>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                allResolved 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {allResolved ? 'Ready to Publish' : 'Attention Needed'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
              {allResolved
                ? `All claims match verified ${brandKit.brandName} brand facts. You can copy the compliant text or download the certificate.`
                : pendingCount > 0
                ? `We spotted ${pendingCount} unverified phrase${pendingCount > 1 ? 's' : ''}. Click "⚡ Fix All with 1-Click" to auto-replace them with approved facts.`
                : 'Paste your draft or try our sample to see BrandLens in action.'}
            </p>
          </div>
        </div>

        {/* Right: Big Primary Action Button & Mode Toggle */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 w-full md:w-auto">
          
          <div className="flex items-center gap-2">
            {pendingCount > 0 && !allResolved ? (
              <button
                onClick={onAutoFixAll}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Wand2 className="w-4 h-4" />
                <span>⚡ Fix All Issues (1-Click)</span>
              </button>
            ) : allResolved ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Safe Copy'}</span>
                </button>

                <button
                  onClick={onOpenApproval}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Get Official Certificate</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoadSample}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Sample Draft</span>
              </button>
            )}
          </div>

          {/* Simple vs Expert Mode Switcher */}
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { if (isExpertMode) onToggleExpertMode(); }}
              className={`px-3 py-1 rounded-lg transition-all ${
                !isExpertMode 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🟢 Easy Mode
            </button>
            <button
              onClick={() => { if (!isExpertMode) onToggleExpertMode(); }}
              className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                isExpertMode 
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-xs font-bold' 
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>🏢 Expert Audit</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
