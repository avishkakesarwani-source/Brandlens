import React from 'react';
import { X, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

interface HelpWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export const HelpWalkthroughModal: React.FC<HelpWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onStartDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-teal-50 to-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-600 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">BrandLens Quick Guide</h3>
              <p className="text-xs text-slate-500">Everything you need to know in 30 seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 leading-relaxed">
            <strong>What is BrandLens?</strong> It is the pre-publishing gateway between <em>"finished draft"</em> and <em>"published post"</em>. It checks if marketing text breaks brand rules, makes unproven claims, or uses off-brand colors before it goes live.
          </div>

          {/* 4 Interactive Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="text-xs font-bold text-slate-900">Paste Draft or Upload Doc</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Type text or upload Word/PDF files. Or click <strong>"Slide 5 Demo"</strong> to test instantly without typing!
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="text-xs font-bold text-slate-900">Click Highlighted Words</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yellow highlights = unverified claims. Pink highlights = contradicted facts. Click them to view the broken rule and why proof is needed.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="text-xs font-bold text-slate-900">Accept 1-Click AI Fixes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click <strong>"Accept Fix"</strong> on any card, or use the <strong>"⚡ Auto-Fix All"</strong> button to repair all violations at once!
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 className="text-xs font-bold text-slate-900">Manager Sign-Off Certificate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once issues are fixed, the Manager clicks <strong>"Manager Approval"</strong> to issue an authenticated publication certificate!
              </p>
            </div>

          </div>

          {/* Differentiator callout */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 text-xs text-slate-600">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Zero-Hallucination AI:</strong> Every issue cites an authentic company rule ID. If AI hallucinates a fake rule, BrandLens automatically filters it out.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button onClick={onClose} className="text-xs font-semibold text-slate-600 hover:text-slate-900">
            Close Guide
          </button>
          
          <button
            onClick={() => {
              onStartDemo();
              onClose();
            }}
            className="text-xs font-bold px-4 py-2 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Launch Slide 5 Demo Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
