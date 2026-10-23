import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Zap, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon,
  BarChart3,
  History,
  PlusCircle,
  UserCheck
} from 'lucide-react';
import type { SampleDraft } from '../data/mockBrandKit';
import type { UserRole } from '../types';
import { SAMPLE_DRAFTS } from '../data/mockBrandKit';

interface NavbarProps {
  onSelectSample: (sample: SampleDraft) => void;
  onOpenBrandKit: () => void;
  onOpenCustomBrandEditor: () => void;
  onOpenRoadmap: () => void;
  onOpenHistory: () => void;
  hasApiKey: boolean;
  onToggleApiModal: () => void;
  activeBrand: string;
  onSwitchBrand: (brandKey: 'ecoglow' | 'finedge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeTab: 'text' | 'image' | 'analytics';
  onSelectTab: (tab: 'text' | 'image' | 'analytics') => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  onOpenBrandKit,
  onOpenCustomBrandEditor,
  onOpenRoadmap,
  onOpenHistory,
  hasApiKey,
  onToggleApiModal,
  activeBrand,
  onSwitchBrand,
  soundEnabled,
  onToggleSound,
  activeTab,
  onSelectTab,
  currentUserRole,
  onChangeUserRole
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
                Enterprise Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Pre-Publishing Brand & Claim Verification Gateway</p>
          </div>
        </div>

        {/* Center: Module Tabs (Text & Docs, Image Studio, Analytics Dashboard) */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onSelectTab('text')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'text'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Draft & Document
          </button>

          <button
            onClick={() => onSelectTab('image')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'image'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
            <span>Image Studio (Slide 8)</span>
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Rules Dashboard (Slide 8)</span>
          </button>
        </div>

        {/* Right: Actions, Role Selector, Brand Switcher */}
        <div className="flex items-center space-x-2">
          
          {/* Role Switcher (Slide 8: Roles, comments and version history) */}
          <div className="hidden xl:flex items-center space-x-1.5 text-xs bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <select
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as any)}
              className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Creator">Role: Creator</option>
              <option value="Brand Manager">Role: Manager</option>
              <option value="Reviewer">Role: Legal</option>
            </select>
          </div>

          {/* Brand Switcher Pills */}
          <div className="hidden 2xl:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onSwitchBrand('ecoglow')}
              className={`px-2 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('eco') ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'}`}
            >
              EcoGlow
            </button>
            <button
              onClick={() => onSwitchBrand('finedge')}
              className={`px-2 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('fin') ? 'bg-white text-indigo-800 shadow-xs' : 'text-slate-600'}`}
            >
              FinEdge
            </button>
          </div>

          {/* Quick Demo Button */}
          <button
            onClick={() => onSelectSample(SAMPLE_DRAFTS[0])}
            className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-2.5 py-1.5 rounded-lg border border-amber-300 transition-colors flex items-center gap-1"
            title="Load Slide 5 EcoGlow demo with 3 unverified claims"
          >
            <Zap className="h-3 w-3 text-amber-600 fill-amber-500" />
            <span className="hidden sm:inline">Slide 5 Demo</span>
          </button>

          {/* Version History Button (Slide 8) */}
          <button
            onClick={onOpenHistory}
            className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 border border-slate-200 flex items-center gap-1 transition-colors"
            title="Version History & Audit Log"
          >
            <History className="h-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">History</span>
          </button>

          {/* Brand Kit & Custom Brand */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onOpenBrandKit}
              className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 border border-slate-200 flex items-center gap-1 transition-colors"
              title="Inspect Active Brand Rules & Facts"
            >
              <BookOpen className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden lg:inline">Brand Kit</span>
            </button>

            <button
              onClick={onOpenCustomBrandEditor}
              className="text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
              title="Add or Customize Brand Kit for ANY brand"
            >
              <PlusCircle className="h-3.5 w-3.5 text-teal-700" />
              <span>+ Custom Brand</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition-colors ${
              soundEnabled ? 'bg-slate-50 text-teal-700 border-slate-200' : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={soundEnabled ? "Audio chimes active" : "Audio muted"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* AI Settings Button */}
          <button
            onClick={onToggleApiModal}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
              hasApiKey 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Configure Gemini API Key"
          >
            <Sparkles className={`h-3.5 w-3.5 ${hasApiKey ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini Live' : 'AI'}</span>
          </button>

          {/* Roadmap */}
          <button
            onClick={onOpenRoadmap}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden md:inline">Roadmap</span>
          </button>

        </div>
      </div>
    </header>
  );
};
