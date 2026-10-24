import React from 'react';
import { Sparkles, ShieldCheck, X, HelpCircle, Zap } from 'lucide-react';

interface QuickGuideBannerProps {
  onLoadDemo: () => void;
  onAutoFix: () => void;
  onOpenApproval: () => void;
  onOpenFullGuide?: () => void;
  hasPendingFlags: boolean;
  allResolved: boolean;
}

export const QuickGuideBanner: React.FC<QuickGuideBannerProps> = ({
  onLoadDemo,
  onAutoFix,
  onOpenApproval,
  onOpenFullGuide,
  hasPendingFlags,
  allResolved
}) => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) {
    return (
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 flex items-center gap-1 font-semibold transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Show 3-Step Guide</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg mb-6 border border-teal-500/20 relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header row */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md bg-teal-400/20 text-teal-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            How BrandLens Works (In 3 Simple Steps)
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">· No training needed</span>
          {onOpenFullGuide && (
            <button
              onClick={onOpenFullGuide}
              className="ml-2 text-xs font-semibold text-teal-300 hover:text-teal-100 underline decoration-teal-400/50 hover:decoration-teal-200 transition-colors"
            >
              (Open Full Manual ➔)
            </button>
          )}
        </div>

        <button 
          onClick={() => setIsDismissed(true)} 
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Dismiss guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Steps Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Step 1 */}
        <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Step 1</span>
            <button
              onClick={onLoadDemo}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1 transition-all"
            >
              <Zap className="w-3 h-3 fill-amber-300" />
              <span>Load Slide 5</span>
            </button>
          </div>
          <h4 className="text-xs font-bold text-white mb-0.5">Upload or Type Draft</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Paste your marketing copy or upload a Word/PDF file. The engine scans against brand rules.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Step 2</span>
            {hasPendingFlags && (
              <button
                onClick={onAutoFix}
                className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200 bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1 transition-all animate-pulse"
              >
                <span>⚡ Auto-Fix All</span>
              </button>
            )}
          </div>
          <h4 className="text-xs font-bold text-white mb-0.5">Review Flagged Words</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Click any highlighted phrase to view the broken rule and click 'Accept' on the suggested rewrite.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Step 3</span>
            {allResolved && (
              <button
                onClick={onOpenApproval}
                className="text-[11px] font-bold text-teal-300 hover:text-teal-200 bg-teal-500/20 px-2 py-0.5 rounded border border-teal-400/30 flex items-center gap-1 transition-all"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Approve</span>
              </button>
            )}
          </div>
          <h4 className="text-xs font-bold text-white mb-0.5">Manager Approval & Publish</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Once issues are resolved, the manager stamps approval and generates a digital audit certificate!
          </p>
        </div>

      </div>

    </div>
  );
};
