import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { ContentFlag } from '../types';

interface DiffViewerProps {
  originalText: string;
  currentText: string;
  flags: ContentFlag[];
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  originalText,
  currentText,
  flags
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Before vs. After Compliance Diff</h3>
            <p className="text-xs text-slate-500">Compare original flagged draft against the brand-reconciled version</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          Visual Reconciliation
        </span>
      </div>

      {/* Grid: Original vs Compliant */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 flex-1">
        
        {/* Left Column: Original Draft */}
        <div className="p-5 flex flex-col bg-rose-50/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Original Draft (Unverified & Risky)
            </span>
            <span className="text-[11px] text-rose-700 font-mono bg-rose-100 px-2 py-0.5 rounded">
              {flags.length} violations flagged
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-rose-200 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-sans flex-1">
            {originalText}
          </div>

          <div className="mt-3 text-xs text-rose-700">
            ⚠️ Contains ungrounded absolute guarantees and unverified superlatives that risk regulatory action under ASCI / CCPA guidelines.
          </div>
        </div>

        {/* Right Column: Reconciled Compliant Version */}
        <div className="p-5 flex flex-col bg-emerald-50/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Reconciled Copy (100% Brand-Safe)
            </span>
            <span className="text-[11px] text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded">
              Ready to Publish
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-emerald-200 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-sans flex-1">
            {currentText}
          </div>

          <div className="mt-3 text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All claims grounded in approved company certifications and compliant with advertising laws.</span>
          </div>
        </div>

      </div>

      {/* Key Changes Log */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Substitutions Applied ({flags.filter(f => f.status === 'accepted' || f.status === 'custom_edited').length} of {flags.length})
        </h4>
        <div className="space-y-1.5 max-h-32 overflow-y-auto">
          {flags.map((f, i) => (
            <div key={i} className="text-xs p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-rose-600 line-through">"{f.matchedText}"</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-emerald-700 font-semibold">"{f.status === 'accepted' ? f.suggestedRewrite : (f.customRewrite || f.suggestedRewrite)}"</span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans">{f.policySection}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
