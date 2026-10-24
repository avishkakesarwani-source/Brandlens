import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Zap, 
  Image as ImageIcon,
  BarChart3,
  History,
  UserCheck,
  HelpCircle,
  Moon,
  Sun,
  Lock
} from 'lucide-react';
import type { SampleDraft } from '../data/mockBrandKit';
import type { UserRole } from '../types';
import { SAMPLE_DRAFTS } from '../data/mockBrandKit';

interface NavbarProps {
  onSelectSample: (sample: SampleDraft) => void;
  onOpenBrandKit: () => void;
  onOpenHistory: () => void;
  activeBrand: string;
  onSwitchBrand: (brandKey: 'ecoglow' | 'finedge') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeTab: 'text' | 'image' | 'analytics' | 'guide';
  onSelectTab: (tab: 'text' | 'image' | 'analytics' | 'guide') => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  onOpenBrandKit,
  onOpenHistory,
  activeBrand,
  onSwitchBrand,
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
  currentUserRole,
  onChangeUserRole
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Team Info */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                BrandLens
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 uppercase tracking-wider">
                NovaTech
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Pre-Publishing Verification Gateway</p>
          </div>
        </div>

        {/* Center: Main Workflow Tabs (Slide 8) */}
        <div className="flex items-center space-x-2">
          
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSelectTab('text')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'text'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Draft Checker
            </button>

            <button
              onClick={() => onSelectTab('image')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'image'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
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
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Rules Dashboard</span>
              <span className="sm:hidden">Rules</span>
            </button>

            <button
              onClick={() => onSelectTab('guide')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'guide'
                  ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="hidden sm:inline">How to Use</span>
              <span className="sm:hidden">Guide</span>
            </button>
          </div>

          {/* Quick 1-Click Demo */}
          <button
            onClick={() => onSelectSample(SAMPLE_DRAFTS[0])}
            className="text-xs bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold px-3 py-2 rounded-xl border border-amber-300 dark:border-amber-800 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Load sample draft with unverified claims"
          >
            <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
            <span className="hidden sm:inline">⚡ Try Sample</span>
            <span className="sm:hidden">Sample</span>
          </button>
        </div>

        {/* Right Side: Brand Switcher, History, Brand Kit, Role, Theme */}
        <div className="flex items-center space-x-2">

          {/* Active Brand Switcher (EcoGlow / FinEdge) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSwitchBrand('ecoglow')}
              className={`px-2.5 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('eco') ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
            >
              EcoGlow
            </button>
            <button
              onClick={() => onSwitchBrand('finedge')}
              className={`px-2.5 py-1 rounded-md transition-all ${activeBrand.toLowerCase().includes('fin') ? 'bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
            >
              FinEdge
            </button>
          </div>

          {/* Cybersecurity & Privacy Badge */}
          <div 
            className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 select-none shadow-xs"
            title="100% Client-Side Cryptography: Files and drafts are processed locally in your browser. Zero cloud leak."
          >
            <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Zero-Leak Safe</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </div>

          {/* Brand Kit Rules Button */}
          <button
            onClick={onOpenBrandKit}
            className="text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect Brand Kit Rules & Facts"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Brand Kit</span>
          </button>

          {/* History Button (Slide 8: Version history) */}
          <button
            onClick={onOpenHistory}
            className="text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Version History & Audit Log"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>History</span>
          </button>

          {/* Role Selector (Slide 8: Roles) */}
          <div className="hidden sm:flex items-center space-x-1 text-xs bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <select
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="Creator" className="dark:bg-slate-900">Creator</option>
              <option value="Brand Manager" className="dark:bg-slate-900">Manager</option>
              <option value="Reviewer" className="dark:bg-slate-900">Legal</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

        </div>
      </div>
    </header>
  );
};
