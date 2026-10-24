import React, { useState } from 'react';
import { Scale, Eye, BookOpen, Share2, Check } from 'lucide-react';
import type { AnalysisSummary, BrandKit } from '../types';

interface RegulatoryRiskRadarProps {
  summary: AnalysisSummary | null;
  draftText: string;
  brandKit: BrandKit;
  allResolved: boolean;
}

export const RegulatoryRiskRadar: React.FC<RegulatoryRiskRadarProps> = ({
  summary,
  draftText,
  brandKit,
  allResolved
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Readability statistics
  const words = draftText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTimeSec = Math.max(5, Math.round((wordCount / 200) * 60));
  
  // Calculate average word length for rudimentary grade estimation
  const totalLetters = words.reduce((acc, w) => acc + w.length, 0);
  const avgWordLength = wordCount > 0 ? totalLetters / wordCount : 0;
  const readingGrade = avgWordLength > 6 ? 'Grade 10 · Complex' : avgWordLength > 5 ? 'Grade 8 · Standard' : 'Grade 6 · Highly Accessible';

  // Regulatory risk level (ASCI / FTC Advertising code)
  const unverified = allResolved ? 0 : (summary ? summary.unverifiedCount : 0);
  const contradicted = allResolved ? 0 : (summary ? summary.contradictedCount : 0);
  const highRisk = allResolved ? 0 : (summary ? summary.highRiskCount : 0);

  const riskScore = contradicted * 40 + unverified * 20 + highRisk * 15;
  const riskLevel = allResolved || riskScore === 0 ? 'Minimal (Safe to Publish)' : riskScore > 50 ? 'High Legal Risk' : 'Moderate Caution';

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/?brand=${brandKit.id}&status=${allResolved ? 'approved' : 'audit'}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs mb-6 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left: Risk Intelligence Heading */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 flex-shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Regulatory & Ad Legal Intelligence
              </h3>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                allResolved || riskScore === 0 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}>
                {riskLevel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evaluated against ASCI Chapter 1 (Truthfulness in Ads) and SEBI/FTC substantiation mandates.
            </p>
          </div>
        </div>

        {/* Center: Live Metrics */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Readability:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{readingGrade}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Estimated Reading:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">~{readingTimeSec}s ({wordCount} words)</span>
          </div>

          {/* 1-Click Shareable Verification Link */}
          <button
            onClick={handleCopyShareLink}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy shareable link for agency / stakeholder review"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Audit'}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
