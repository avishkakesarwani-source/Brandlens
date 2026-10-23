import React from 'react';
import { ShieldCheck, BookOpen, Sparkles, Layers, Zap, Building2, Volume2, VolumeX } from 'lucide-react';
import type { SampleDraft } from '../data/mockBrandKit';
import { SAMPLE_DRAFTS } from '../data/mockBrandKit';

interface NavbarProps {
  onSelectSample: (sample: SampleDraft) => void;
  onOpenBrandKit: () => void;
  onOpenRoadmap: () => void;
  hasApiKey: boolean;
  onToggleApiModal: () => void;
  activeBrand: 'ecoglow' | 'finedge';
  onSwitchBrand: (brand: 'ecoglow' | 'finedge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  onOpenBrandKit,
  onOpenRoadmap,
  hasApiKey,
  onToggleApiModal,
  activeBrand,
  onSwitchBrand,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Team Info */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 bg-clip-text text-transparent">
                BrandLens
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wider">
                Round 2 Build
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Team NovaTech · AI Brand & Claim Verification Gateway</p>
          </div>
        </div>

        {/* Center: Brand Switcher & Judge Demos */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <div className="flex items-center px-2 text-xs font-bold text-slate-500 gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand:</span>
          </div>

          <button
            onClick={() => onSwitchBrand('ecoglow')}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
              activeBrand === 'ecoglow'
                ? 'bg-white text-teal-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌿 EcoGlow (CPG)
          </button>

          <button
            onClick={() => onSwitchBrand('finedge')}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
              activeBrand === 'finedge'
                ? 'bg-white text-indigo-800 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💳 FinEdge (SEBI Fintech)
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          <button
            onClick={() => onSelectSample(SAMPLE_DRAFTS[0])}
            className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg border border-amber-300 transition-colors flex items-center gap-1"
            title="Load Slide 5 EcoGlow demo with 3 unverified claims"
          >
            <Zap className="h-3 w-3 text-amber-600 fill-amber-500" />
            <span>Slide 5 Demo</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Audio Chime Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled ? 'bg-slate-50 text-teal-700 border-slate-200' : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={soundEnabled ? "Audio chimes active" : "Audio muted"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenBrandKit}
            className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-teal-600" />
            <span>Brand Kit</span>
          </button>

          <button
            onClick={onOpenRoadmap}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 transition-colors"
          >
            <Layers className="h-4 w-4 text-indigo-600" />
            <span>Round 3 Vision</span>
          </button>

          <button
            onClick={onToggleApiModal}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              hasApiKey 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className={`h-4 w-4 ${hasApiKey ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{hasApiKey ? 'Gemini Live' : 'AI Engine'}</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="GitHub Repository"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
