import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Wand2, 
  FileCheck2,
  LayoutList,
  SplitSquareVertical
} from 'lucide-react';
import type { AnalysisSummary } from '../types';

interface ScoreBannerProps {
  summary: AnalysisSummary | null;
  allResolved: boolean;
  activeView: 'inspect' | 'diff';
  onChangeView: (view: 'inspect' | 'diff') => void;
  onAutoFixAll: () => void;
  onOpenApproval: () => void;
  draftText: string;
  brandName: string;
}

export const ScoreBanner: React.FC<ScoreBannerProps> = ({ 
  summary, 
  allResolved,
  activeView,
  onChangeView,
  onAutoFixAll,
  onOpenApproval,
  draftText,
  brandName
}) => {
  const [copied, setCopied] = useState(false);

  const pendingCount = summary ? summary.flags.filter(f => f.status === 'pending').length : 0;
  const score = allResolved ? 100 : (summary ? summary.complianceScore : 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreStroke = () => {
    if (allResolved || score >= 90) return '#10b981'; // emerald
    if (score >= 70) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
      
      {/* Left: Radial Score & Status */}
      <div className="flex items-center space-x-4">
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg className="w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              stroke="#e2e8f0"
              className="dark:stroke-slate-800"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="28"
              cy="28"
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
            <span className="text-sm font-black text-slate-900 dark:text-white leading-none">
              {score}%
            </span>
            <span className="text-[8px] font-bold uppercase text-slate-400 mt-0.5">Score</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {allResolved
                ? '🎉 100% Brand Compliant · Ready to Publish'
                : pendingCount > 0
                ? `${pendingCount} claim${pendingCount > 1 ? 's' : ''} need verification`
                : 'Ready to Check Your Draft'}
            </h2>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
              allResolved 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {allResolved ? 'Approved' : 'Attention Needed'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {allResolved
              ? `All claims verified against ${brandName} approved facts and rules.`
              : pendingCount > 0
              ? `We spotted ${pendingCount} unverified phrase${pendingCount > 1 ? 's' : ''}. Click "⚡ Fix All Issues" to apply approved rewrites.`
              : 'Paste your draft or try our sample to inspect.'}
          </p>
        </div>
      </div>

      {/* Right: Actions & View Switcher */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
        
        {/* Simple View Switcher */}
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => onChangeView('inspect')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeView === 'inspect'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutList className="w-3 h-3 text-teal-600" />
            <span>Inspector</span>
          </button>
          <button
            onClick={() => onChangeView('diff')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeView === 'diff'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3 h-3 text-indigo-600" />
            <span>Diff</span>
          </button>
        </div>

        {/* Primary Action Button */}
        {pendingCount > 0 && !allResolved ? (
          <button
            onClick={onAutoFixAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/20 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>⚡ Fix All Issues (1-Click)</span>
          </button>
        ) : allResolved ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={onOpenApproval}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Approve & Export</span>
            </button>
          </div>
        ) : null}

      </div>

    </div>
  );
};
