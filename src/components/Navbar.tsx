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
  ChevronDown,
  Moon,
  Sun,
  Download,
  Split
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
  onOpenExportReport: () => void;
  onOpenAdComparator: () => void;
  hasApiKey: boolean;
  onToggleApiModal: () => void;
  activeBrand: string;
  onSwitchBrand: (brandKey: 'ecoglow' | 'finedge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
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
  onOpenExportReport,
  onOpenAdComparator,
  hasApiKey,
  onToggleApiModal,
  activeBrand,
  onSwitchBrand,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
  currentUserRole,
  onChangeUserRole
}) => {
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Team Info */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 dark:from-white dark:via-slate-200 dark:to-teal-400 bg-clip-text text-transparent">
                BrandLens
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 uppercase tracking-wider">
                Enterprise Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Pre-Publishing Brand & Claim Verification Gateway</p>
          </div>
        </div>

        {/* Center: Main Workflow Tabs & 1-Click Demo */}
        <div className="flex items-center space-x-2">
          
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSelectTab('text')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'text'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Draft Checker
            </button>

            <button
              onClick={() => onSelectTab('image')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'image'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Image Studio</span>
            </button>

            <button
              onClick={() => onSelectTab('analytics')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Rules Dashboard</span>
            </button>
          </div>

          {/* Big, Friendly, Inviting 1-Click Demo Button */}
          <button
            onClick={() => onSelectSample(SAMPLE_DRAFTS[0])}
            className="text-xs bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold px-3 py-2 rounded-xl border border-amber-300 dark:border-amber-800 transition-all flex items-center gap-1.5 shadow-xs transform hover:scale-102"
            title="Load Slide 5 EcoGlow demo with 3 unverified claims"
          >
            <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
            <span>⚡ Try 1-Click Demo</span>
          </button>
        </div>

        {/* Right Side: Clean Help, Theme Toggle & Grouped Tools Dropdown */}
        <div className="flex items-center space-x-2">
          
          {/* Friendly Help Button */}
          <button
            onClick={onOpenHelp}
            className="text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 px-2.5 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 flex items-center gap-1 transition-colors"
            title="How to use BrandLens in 30 seconds"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">How It Works</span>
          </button>

          {/* Active Brand Switcher (EcoGlow / FinEdge) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onSwitchBrand('ecoglow')}
              className={`px-2 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('eco') ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              EcoGlow
            </button>
            <button
              onClick={() => onSwitchBrand('finedge')}
              className={`px-2 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('fin') ? 'bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              FinEdge
            </button>
          </div>

          {/* Role Selector */}
          <div className="hidden sm:flex items-center space-x-1 text-xs bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <select
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="Creator" className="dark:bg-slate-900">Role: Creator</option>
              <option value="Brand Manager" className="dark:bg-slate-900">Role: Manager</option>
              <option value="Reviewer" className="dark:bg-slate-900">Role: Legal</option>
            </select>
          </div>

          {/* "More Tools" Clean Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-colors"
            >
              <span>More Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {toolsDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in"
                onClick={() => setToolsDropdownOpen(false)}
              >
                {/* Advanced Tool 1: Export Audit Report */}
                <button
                  onClick={onOpenExportReport}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Export Compliance Report (PDF / MD)</span>
                </button>

                {/* Advanced Tool 2: A/B Split-Tester */}
                <button
                  onClick={onOpenAdComparator}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Split className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>A/B Ad Variant Split-Tester</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                <button
                  onClick={onOpenBrandKit}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Inspect Brand Kit Rules</span>
                </button>

                <button
                  onClick={onOpenCustomBrandEditor}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>+ Create Brand Kit for Any Brand</span>
                </button>

                <button
                  onClick={onOpenHistory}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <History className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span>Version History & Audit Log</span>
                </button>

                <button
                  onClick={onToggleApiModal}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{hasApiKey ? 'Gemini API Connected' : 'AI Engine Settings'}</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                <button
                  onClick={onOpenRoadmap}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Product Roadmap & Future Scope</span>
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition-colors ${
              soundEnabled 
                ? 'bg-slate-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400 border-slate-200 dark:border-slate-700' 
                : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
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
