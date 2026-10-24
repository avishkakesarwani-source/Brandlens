import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Split } from 'lucide-react';
import type { BrandKit } from '../types';
import { defaultEngine } from '../services/analyzer';

interface AdVariantComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandKit: BrandKit;
  onApplyVariant: (chosenText: string) => void;
}

export const AdVariantComparatorModal: React.FC<AdVariantComparatorModalProps> = ({
  isOpen,
  onClose,
  brandKit,
  onApplyVariant
}) => {
  const [variantA, setVariantA] = useState(
    brandKit.id.toLowerCase().includes('eco')
      ? "EcoGlow is India's #1 miracle organic cream with 100% natural pure botanicals. Guaranteed to eliminate wrinkles overnight!"
      : "FinEdge guarantees 24% annual returns completely risk-free! Join 5 million investors getting rich today."
  );

  const [variantB, setVariantB] = useState(
    brandKit.id.toLowerCase().includes('eco')
      ? "EcoGlow daily radiance cream delivers 72-hour clinically tested hydration with 98% naturally derived ingredients and recyclable packaging."
      : "Invest smarter with FinEdge's SEBI-registered portfolio insights. Investments are subject to market risks; read all scheme related documents carefully."
  );

  const [scoreA, setScoreA] = useState<number | null>(null);
  const [scoreB, setScoreB] = useState<number | null>(null);
  const [flagsA, setFlagsA] = useState<string[]>([]);
  const [flagsB, setFlagsB] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  if (!isOpen) return null;

  const handleRunComparison = async () => {
    setIsComparing(true);
    defaultEngine.setBrandKit(brandKit);

    try {
      const resA = await defaultEngine.analyzeContent(variantA);
      const resB = await defaultEngine.analyzeContent(variantB);

      setScoreA(resA.complianceScore);
      setScoreB(resB.complianceScore);
      setFlagsA(resA.flags.map(f => f.explanation));
      setFlagsB(resB.flags.map(f => f.explanation));
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-50 dark:from-purple-950/40 to-indigo-50 dark:to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-sm shadow-purple-600/30">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ad Variant A/B Compliance Split-Tester
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare multiple ad headlines & body copies before spending marketing budget
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Variant A */}
            <div className={`p-4 rounded-2xl border flex flex-col transition-all ${
              scoreA !== null && scoreA < 70
                ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-black">A</span>
                  <span>Ad Copy Variant A</span>
                </span>
                {scoreA !== null && (
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    scoreA >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    Score: {scoreA}/100
                  </span>
                )}
              </div>

              <textarea
                value={variantA}
                onChange={(e) => setVariantA(e.target.value)}
                rows={5}
                className="w-full text-xs font-serif p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none"
                placeholder="Enter first ad copy variant..."
              />

              {/* Variant A Diagnostics */}
              {flagsA.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{flagsA.length} Regulatory & Policy Issue{flagsA.length > 1 ? 's' : ''}:</span>
                  </div>
                  {flagsA.slice(0, 3).map((fl, i) => (
                    <div key={i} className="text-[10px] text-rose-600 dark:text-rose-400/90 pl-4 list-disc font-medium">
                      • {fl}
                    </div>
                  ))}
                </div>
              )}

              {scoreA !== null && (
                <button
                  onClick={() => {
                    onApplyVariant(variantA);
                    onClose();
                  }}
                  className="mt-4 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Load Variant A into Editor
                </button>
              )}
            </div>

            {/* Variant B */}
            <div className={`p-4 rounded-2xl border flex flex-col transition-all ${
              scoreB !== null && scoreB >= 80
                ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-[10px] font-black">B</span>
                  <span>Ad Copy Variant B (Recommended)</span>
                </span>
                {scoreB !== null && (
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    scoreB >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    Score: {scoreB}/100
                  </span>
                )}
              </div>

              <textarea
                value={variantB}
                onChange={(e) => setVariantB(e.target.value)}
                rows={5}
                className="w-full text-xs font-serif p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none"
                placeholder="Enter second ad copy variant..."
              />

              {/* Variant B Diagnostics */}
              {flagsB.length === 0 && scoreB !== null && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Compliant with {brandKit.brandName} brand facts & ASCI advertising guidelines!</span>
                </div>
              )}

              {scoreB !== null && (
                <button
                  onClick={() => {
                    onApplyVariant(variantB);
                    onClose();
                  }}
                  className="mt-4 text-xs font-bold py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-600/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apply Winning Variant B</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Action to Compare */}
          <div className="text-center">
            <button
              onClick={handleRunComparison}
              disabled={isComparing}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-2 mx-auto transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isComparing ? 'Analyzing Both Variants...' : '⚡ Run Instant A/B Comparison'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
