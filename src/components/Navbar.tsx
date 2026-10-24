import React, { useState } from 'react';
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
  UserCheck,
  HelpCircle,
  ChevronDown
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
  onOpenHelp: () => void;
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
  onOpenHelp,
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
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

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
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Pre-Publishing Brand & Claim Verification Gateway</p>
          </div>
        </div>

        {/* Center: Main Workflow Tabs & 1-Click Demo */}
        <div className="flex items-center space-x-2">
          
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectTab('text')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Draft Checker
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
              <span>Image Studio</span>
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
              <span>Rules Dashboard</span>
            </button>
          </div>

          {/* Big, Friendly, Inviting 1-Click Demo Button */}
          <button
            onClick={() => onSelectSample(SAMPLE_DRAFTS[0])}
            className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-3 py-2 rounded-xl border border-amber-300 transition-all flex items-center gap-1.5 shadow-xs transform hover:scale-102"
            title="Load Slide 5 EcoGlow demo with 3 unverified claims"
          >
            <Zap className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
            <span>⚡ Try 1-Click Demo</span>
          </button>
        </div>

        {/* Right Side: Clean Help & Grouped Tools Dropdown */}
        <div className="flex items-center space-x-2">
          
          {/* Friendly Help Button */}
          <button
            onClick={onOpenHelp}
            className="text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
            title="How to use BrandLens in 30 seconds"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">How It Works</span>
          </button>

          {/* Active Brand Switcher (EcoGlow / FinEdge) */}
          <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
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

          {/* Role Selector */}
          <div className="hidden sm:flex items-center space-x-1 text-xs bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <select
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Creator">Role: Creator</option>
              <option value="Brand Manager">Role: Manager</option>
              <option value="Reviewer">Role: Legal</option>
            </select>
          </div>

          {/* "More Tools" Clean Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
            >
              <span>More Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {toolsDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in"
                onClick={() => setToolsDropdownOpen(false)}
              >
                <button
                  onClick={onOpenBrandKit}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Inspect Brand Kit Rules</span>
                </button>

                <button
                  onClick={onOpenCustomBrandEditor}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-teal-800 hover:bg-teal-50 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-teal-600" />
                  <span>+ Create Brand Kit for Any Brand</span>
                </button>

                <button
                  onClick={onOpenHistory}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <History className="w-4 h-4 text-slate-600" />
                  <span>Version History & Audit Log</span>
                </button>

                <button
                  onClick={onToggleApiModal}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{hasApiKey ? 'Gemini API Connected' : 'AI Engine Settings'}</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={onOpenRoadmap}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Product Roadmap & Future Scope</span>
                </button>
              </div>
            )}
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

        </div>
      </div>
    </header>
  );
};
