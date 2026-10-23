import React from 'react';
import { X, Shield, FileCheck, Ban, Sparkles } from 'lucide-react';
import { ECOGLOW_BRAND_KIT } from '../data/mockBrandKit';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900">Active Brand Kit: {ECOGLOW_BRAND_KIT.brandName}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-medium">
                {ECOGLOW_BRAND_KIT.industry}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              The single source of truth used by the Grounding Engine to verify marketing copy
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Rules Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Governed Brand Rules & Legal Policies ({ECOGLOW_BRAND_KIT.primaryRules.length})
              </h3>
            </div>
            <div className="space-y-2.5">
              {ECOGLOW_BRAND_KIT.primaryRules.map((rule) => (
                <div key={rule.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        {rule.id}
                      </span>
                      {rule.policySection} — {rule.title}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      rule.severity === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{rule.ruleText}</p>
                  <p className="text-[11px] text-slate-400 italic font-mono">Basis: {rule.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approved Facts Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Approved Facts Repository ({ECOGLOW_BRAND_KIT.approvedFacts.length})
              </h3>
            </div>
            <div className="space-y-2">
              {ECOGLOW_BRAND_KIT.approvedFacts.map((fact) => (
                <div key={fact.id} className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/40">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-emerald-950 font-mono">{fact.id} · {fact.topic}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mb-1">{fact.statement}</p>
                  <div className="text-[11px] text-emerald-800 bg-white/70 px-2 py-0.5 rounded border border-emerald-200 inline-block font-mono">
                    Verified Citation: {fact.verifiedProofRef}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited Superlatives & Voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40">
              <div className="flex items-center space-x-2 mb-2">
                <Ban className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-rose-950 uppercase">Prohibited Superlatives</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ECOGLOW_BRAND_KIT.prohibitedSuperlatives.map((word, idx) => (
                  <span key={idx} className="text-xs bg-white text-rose-900 px-2 py-0.5 rounded border border-rose-200 font-mono">
                    "{word}"
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-blue-950 uppercase">Tone & Voice Pillars</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {ECOGLOW_BRAND_KIT.voiceAndTone.traits.map((trait, idx) => (
                  <span key={idx} className="text-xs bg-white text-blue-900 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                    {trait}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">
                "{ECOGLOW_BRAND_KIT.voiceAndTone.guidelines}"
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-medium px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
