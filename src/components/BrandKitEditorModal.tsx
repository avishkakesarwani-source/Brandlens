import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Shield, FileCheck, Ban } from 'lucide-react';
import type { BrandKit, BrandRule, ApprovedFact, BrandColor } from '../types';

interface BrandKitEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBrandKit: BrandKit;
  onSaveBrandKit: (newKit: BrandKit) => void;
}

export const BrandKitEditorModal: React.FC<BrandKitEditorModalProps> = ({
  isOpen,
  onClose,
  currentBrandKit,
  onSaveBrandKit,
}) => {
  const [brandName, setBrandName] = useState(currentBrandKit.brandName);
  const [tagline, setTagline] = useState(currentBrandKit.tagline);
  const [industry, setIndustry] = useState(currentBrandKit.industry);
  const [rules, setRules] = useState<BrandRule[]>(currentBrandKit.primaryRules);
  const [facts, setFacts] = useState<ApprovedFact[]>(currentBrandKit.approvedFacts);
  const colors: BrandColor[] = currentBrandKit.colors || [
    { name: "Teal Primary", hex: "#0d9488", usage: "Primary" },
    { name: "Coral Alert", hex: "#e06a55", usage: "Secondary" }
  ];
  const [superlatives, setSuperlatives] = useState<string[]>(currentBrandKit.prohibitedSuperlatives);
  const [newSuperlative, setNewSuperlative] = useState('');

  // Form states for adding items
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleSection, setNewRuleSection] = useState('');
  const [newRuleText, setNewRuleText] = useState('');
  const [newFactStatement, setNewFactStatement] = useState('');
  const [newFactProof, setNewFactProof] = useState('');

  if (!isOpen) return null;

  const handleAddRule = () => {
    if (!newRuleTitle || !newRuleText) return;
    const rule: BrandRule = {
      id: `CUSTOM-${rules.length + 1}`,
      title: newRuleTitle,
      policySection: newRuleSection || "General Brand Policy",
      category: "claims",
      severity: "high",
      ruleText: newRuleText,
      rationale: "Enterprise brand compliance requirement"
    };
    setRules([...rules, rule]);
    setNewRuleTitle('');
    setNewRuleSection('');
    setNewRuleText('');
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleAddFact = () => {
    if (!newFactStatement) return;
    const fact: ApprovedFact = {
      id: `FACT-CUST-${facts.length + 1}`,
      topic: "Verified Product Fact",
      statement: newFactStatement,
      verifiedProofRef: newFactProof || "Internal Company Verification Ref #2026"
    };
    setFacts([...facts, fact]);
    setNewFactStatement('');
    setNewFactProof('');
  };

  const handleDeleteFact = (id: string) => {
    setFacts(facts.filter(f => f.id !== id));
  };

  const handleAddSuperlative = () => {
    if (!newSuperlative.trim()) return;
    setSuperlatives([...superlatives, newSuperlative.trim().toLowerCase()]);
    setNewSuperlative('');
  };

  const handleSave = () => {
    const updatedKit: BrandKit = {
      ...currentBrandKit,
      id: `brand-${Date.now()}`,
      brandName: brandName.trim() || "Custom Brand",
      tagline: tagline.trim(),
      industry: industry.trim() || "General Commercial",
      primaryRules: rules,
      approvedFacts: facts,
      colors: colors,
      prohibitedSuperlatives: superlatives
    };
    onSaveBrandKit(updatedKit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Custom Brand Kit Creator & Editor</h3>
            <p className="text-xs text-slate-500">Configure custom brand rules, approved fact sheets, and colors for ANY company</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Brand Identity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Health & Wellness"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Pure Everyday Nutrition"
              />
            </div>
          </div>

          {/* Section 1: Rules */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Governed Brand Policies ({rules.length})</span>
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto p-1">
              {rules.map((rule) => (
                <div key={rule.id} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{rule.policySection}: {rule.title}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{rule.ruleText}</p>
                  </div>
                  <button onClick={() => handleDeleteRule(rule.id)} className="text-slate-400 hover:text-rose-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Rule */}
            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200 space-y-2 text-xs">
              <span className="font-bold text-teal-900 uppercase text-[10px]">Add Custom Rule</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Policy Section (e.g. Health Claims §1)"
                  value={newRuleSection}
                  onChange={(e) => setNewRuleSection(e.target.value)}
                  className="p-2 rounded border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Rule Title (e.g. No Unproven Medical Cures)"
                  value={newRuleTitle}
                  onChange={(e) => setNewRuleTitle(e.target.value)}
                  className="p-2 rounded border border-slate-200 bg-white text-xs"
                />
              </div>
              <textarea
                placeholder="Rule Definition: What is strictly prohibited?"
                value={newRuleText}
                onChange={(e) => setNewRuleText(e.target.value)}
                rows={2}
                className="w-full p-2 rounded border border-slate-200 bg-white text-xs"
              />
              <button
                onClick={handleAddRule}
                className="text-xs font-bold px-3 py-1.5 bg-teal-700 text-white rounded-lg flex items-center gap-1 hover:bg-teal-800"
              >
                <Plus className="w-3.5 h-3.5" /> Add Rule
              </button>
            </div>
          </div>

          {/* Section 2: Approved Facts */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Approved Fact Sheet ({facts.length})</span>
            </span>

            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
              {facts.map((fact) => (
                <div key={fact.id} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">{fact.topic}: </span>
                    <span className="text-slate-700">{fact.statement}</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Proof: {fact.verifiedProofRef}</div>
                  </div>
                  <button onClick={() => handleDeleteFact(fact.id)} className="text-slate-400 hover:text-rose-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2 text-xs">
              <span className="font-bold text-emerald-900 uppercase text-[10px]">Add Approved Truth Statement</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Verified Statement (e.g. Made from 100% organic cotton)"
                  value={newFactStatement}
                  onChange={(e) => setNewFactStatement(e.target.value)}
                  className="p-2 rounded border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Official Proof / Lab Report ID"
                  value={newFactProof}
                  onChange={(e) => setNewFactProof(e.target.value)}
                  className="p-2 rounded border border-slate-200 bg-white text-xs"
                />
              </div>
              <button
                onClick={handleAddFact}
                className="text-xs font-bold px-3 py-1.5 bg-emerald-700 text-white rounded-lg flex items-center gap-1 hover:bg-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" /> Add Fact
              </button>
            </div>
          </div>

          {/* Section 3: Prohibited Superlatives */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-rose-600" />
              <span>Prohibited Superlatives & Words</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {superlatives.map((word, i) => (
                <span key={i} className="text-xs bg-rose-50 text-rose-800 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1.5 font-mono">
                  "{word}"
                  <button onClick={() => setSuperlatives(superlatives.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add banned phrase (e.g. miracle, best on earth)"
                value={newSuperlative}
                onChange={(e) => setNewSuperlative(e.target.value)}
                className="text-xs p-2 rounded-lg border border-slate-200 flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSuperlative()}
              />
              <button onClick={handleAddSuperlative} className="text-xs px-3 py-2 bg-slate-800 text-white rounded-lg font-semibold">
                Add Word
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button onClick={onClose} className="text-xs font-medium text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-xs font-bold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Save & Activate Brand Kit</span>
          </button>
        </div>

      </div>
    </div>
  );
};
