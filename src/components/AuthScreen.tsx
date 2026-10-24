import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Shield
} from 'lucide-react';
import type { UserRole } from '../types';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  team: string;
}

interface AuthScreenProps {
  onLogin: (user: UserProfile) => void;
}

const PRESET_USERS: UserProfile[] = [
  {
    name: 'Akshat Kesarwani',
    email: 'akshat@novatech.ai',
    role: 'Creator',
    team: 'Marketing & Content'
  },
  {
    name: 'Ayushi Mishra',
    email: 'ayushi@novatech.ai',
    role: 'Brand Manager',
    team: 'AI & Brand Governance'
  },
  {
    name: 'Avishka Kesarwani',
    email: 'avishka@novatech.ai',
    role: 'Reviewer',
    team: 'Legal & Compliance'
  }
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<UserProfile>(PRESET_USERS[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>('Creator');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onLogin({
      name: customName.trim(),
      email: customEmail.trim() || `${customName.toLowerCase().replace(/\s+/g, '')}@company.com`,
      role: customRole,
      team: customRole === 'Creator' ? 'Content Team' : customRole === 'Brand Manager' ? 'Brand Strategy' : 'Legal Compliance'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Background glow & mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">BrandLens</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800 uppercase tracking-wider">
                  Team NovaTech
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Pre-Publishing AI Compliance Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Hackathon Round 2 Build</span>
          </div>
        </div>
      </header>

      {/* Main Login / Welcome Card */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Left Side: Product Value & Flow explanation */}
        <div className="flex-1 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/60 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>3-Step Automated Verification Workflow</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Stop unsubstantiated claims <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-200">before they go live.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            BrandLens acts as the pre-publishing safety checkpoint for marketing teams. 
            Scan ad copy, verify claims against approved company facts, protect user PII, and generate tamper-proof audit certificates.
          </p>

          {/* 3 Step Flow */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Input Content</h4>
                <p className="text-[11px] text-slate-400">Paste your marketing draft or upload PDF/Word ad copy.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">AI Claim Verification</h4>
                <p className="text-[11px] text-slate-400">Auto-detect contradictions, unverified stats, and tone drift.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Cryptographic Sign-Off</h4>
                <p className="text-[11px] text-slate-400">Issue SHA-256 sealed compliance certificate for legal safety.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Sign in to Workspace</span>
              <Lock className="w-4 h-4 text-teal-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a team member to enter with predefined role permissions:
            </p>
          </div>

          {!isCustom ? (
            <div className="space-y-4">
              {/* Preset Member Selection */}
              <div className="space-y-2.5">
                {PRESET_USERS.map((u) => {
                  const isSelected = selectedUser.email === u.email;
                  return (
                    <div
                      key={u.email}
                      onClick={() => setSelectedUser(u)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-500 bg-teal-950/40 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                          isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{u.team}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          u.role === 'Creator'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : u.role === 'Brand Manager'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {u.role}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-teal-400 font-semibold mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={() => onLogin(selectedUser)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-teal-500/25 transition-all transform hover:scale-[1.01] active:scale-98 cursor-pointer mt-2"
              >
                <span>Continue as {selectedUser.name.split(' ')[0]} ({selectedUser.role})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className="text-xs text-slate-400 hover:text-teal-300 transition-colors font-medium"
                >
                  Or enter custom name & role →
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Workspace Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Creator', 'Brand Manager', 'Reviewer'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setCustomRole(r)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                        customRole === r
                          ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustom(false)}
                  className="px-4 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Security Badge */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>Client-Side Zero Data Leakage</span>
            </span>
            <span>SHA-256 Secured</span>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BrandLens · Built with pride by <strong>Team NovaTech</strong></span>
          <span>Ayushi Mishra · Avishka Kesarwani · Akash · Akshat Kesarwani</span>
        </div>
      </footer>

    </div>
  );
};
