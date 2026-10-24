import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  Wand2, 
  FileCheck2,
  LayoutList,
  SplitSquareVertical,
  Sparkles,
  ShieldCheck
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
  const targetScore = allResolved ? 100 : (summary ? summary.complianceScore : 0);
  
  // Smooth animated counter for gamified feedback
  const [displayScore, setDisplayScore] = useState(targetScore);

  useEffect(() => {
    let current = displayScore;
    const target = targetScore;
    if (current === target) return;

    const step = target > current ? 1 : -1;
    const intervalTime = Math.max(8, Math.floor(400 / Math.abs(target - current || 1)));

    const timer = setInterval(() => {
      current += step;
      setDisplayScore(current);
      if (current === target) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetScore]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getScoreStroke = () => {
    if (displayScore >= 90) return '#10b981'; // emerald
    if (displayScore >= 70) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
      
      {/* Left: Gamified Radial Score & Live Status */}
      <div className="flex items-center space-x-4">
        
        {/* Animated Radial Dial */}
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 group cursor-pointer" title="Brand Compliance Shield">
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
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-black text-slate-900 dark:text-white leading-none">
              {displayScore}%
            </span>
            <span className="text-[8px] font-bold uppercase text-slate-400 mt-0.5">Shield</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              {allResolved ? (
                <>
                  <span>🎉 100% Brand Compliant</span>
                  <span className="hidden sm:inline-block text-xs font-normal text-emerald-600 dark:text-emerald-400">· Ready to Publish!</span>
                </>
              ) : pendingCount > 0 ? (
                <>
                  <span>{pendingCount} claim{pendingCount > 1 ? 's' : ''} need proof</span>
                </>
              ) : (
                'Ready to Scan Your Draft'
              )}
            </h2>

            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all ${
              allResolved 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-bounce' 
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {allResolved ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Safe</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Fix to Protect</span>
                </>
              )}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {allResolved
              ? `Zero unverified claims remaining. Fully substantiated against ${brandName} brand guidelines.`
              : pendingCount > 0
              ? `Spotted ${pendingCount} unverified phrase${pendingCount > 1 ? 's' : ''}. Hit "⚡ Fix All Issues" to auto-replace with certified facts!`
              : 'Paste your draft or choose an ad format below to inspect.'}
          </p>
        </div>
      </div>

      {/* Right: Interactive Actions & View Switcher */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
        
        {/* Simple View Switcher */}
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => onChangeView('inspect')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'inspect'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutList className="w-3 h-3 text-teal-600" />
            <span>Inspector</span>
          </button>
          <button
            onClick={() => onChangeView('diff')}
            className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'diff'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3 h-3 text-indigo-600" />
            <span>Diff Mode</span>
          </button>
        </div>

        {/* Primary Action Button */}
        {pendingCount > 0 && !allResolved ? (
          <button
            onClick={onAutoFixAll}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/25 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95 animate-pulse"
          >
            <Wand2 className="w-4 h-4" />
            <span>⚡ Fix All Issues (1-Click)</span>
          </button>
        ) : allResolved ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Safe Text'}</span>
            </button>

            <button
              onClick={onOpenApproval}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/25 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Approve & Export</span>
            </button>
          </div>
        ) : null}

      </div>

    </div>
  );
};
