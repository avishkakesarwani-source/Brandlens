import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScoreBanner } from './components/ScoreBanner';
import { ContentEditor } from './components/ContentEditor';
import { IssueCard } from './components/IssueCard';
import { BrandKitModal } from './components/BrandKitModal';
import { Round3Modal } from './components/Round3Modal';
import { ApprovalModal } from './components/ApprovalModal';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { defaultEngine } from './services/analyzer';
import { SAMPLE_DRAFTS } from './data/mockBrandKit';
import type { SampleDraft } from './data/mockBrandKit';
import type { AnalysisSummary } from './types';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function App() {
  const [draftText, setDraftText] = useState(SAMPLE_DRAFTS[0].draftText);
  const [summary, setSummary] = useState<AnalysisSummary | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unverified' | 'contradicted' | 'tone' | 'resolved'>('all');
  
  // Modals
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('brandlens_gemini_key') || '');

  // Perform initial scan on load
  useEffect(() => {
    runAnalysis(draftText);
  }, []);

  const runAnalysis = async (textToScan: string) => {
    setIsAnalyzing(true);
    try {
      const result = await defaultEngine.analyzeContent(textToScan, apiKey);
      setSummary(result);
      if (result.flags.length > 0) {
        setSelectedFlagId(result.flags[0].id);
      } else {
        setSelectedFlagId(null);
      }
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = (sample: SampleDraft) => {
    setDraftText(sample.draftText);
    runAnalysis(sample.draftText);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('brandlens_gemini_key', key);
  };

  // User accepts AI rewrite: replaces in text and updates status
  const handleAcceptRewrite = (flagId: string, rewriteText: string) => {
    if (!summary) return;

    const targetFlag = summary.flags.find(f => f.id === flagId);
    if (!targetFlag) return;

    // Replace text in draft
    const updatedDraft = draftText.replace(targetFlag.matchedText, rewriteText);
    setDraftText(updatedDraft);

    // Update flag status
    const updatedFlags = summary.flags.map(f => {
      if (f.id === flagId) {
        return { ...f, status: 'accepted' as const, suggestedRewrite: rewriteText };
      }
      return f;
    });

    setSummary({
      ...summary,
      originalText: updatedDraft,
      flags: updatedFlags
    });
  };

  // User types custom edit
  const handleCustomEdit = (flagId: string, customText: string) => {
    if (!summary) return;

    const targetFlag = summary.flags.find(f => f.id === flagId);
    if (!targetFlag) return;

    const updatedDraft = draftText.replace(targetFlag.matchedText, customText);
    setDraftText(updatedDraft);

    const updatedFlags = summary.flags.map(f => {
      if (f.id === flagId) {
        return { ...f, status: 'custom_edited' as const, customRewrite: customText };
      }
      return f;
    });

    setSummary({
      ...summary,
      originalText: updatedDraft,
      flags: updatedFlags
    });
  };

  // User dismisses flag
  const handleRejectFlag = (flagId: string) => {
    if (!summary) return;
    const updatedFlags = summary.flags.map(f => {
      if (f.id === flagId) {
        return { ...f, status: 'rejected' as const };
      }
      return f;
    });

    setSummary({
      ...summary,
      flags: updatedFlags
    });
  };

  // Undo decision
  const handleResetFlag = (flagId: string) => {
    if (!summary) return;
    const updatedFlags = summary.flags.map(f => {
      if (f.id === flagId) {
        return { ...f, status: 'pending' as const };
      }
      return f;
    });

    setSummary({
      ...summary,
      flags: updatedFlags
    });
  };

  // Check if all flags have been resolved
  const pendingFlags = summary ? summary.flags.filter(f => f.status === 'pending') : [];
  const allResolved = summary !== null && summary.flags.length > 0 && pendingFlags.length === 0;

  // Filter flags for the right pane
  const filteredFlags = summary ? summary.flags.filter(f => {
    if (activeFilter === 'resolved') return f.status !== 'pending';
    if (activeFilter === 'unverified') return f.flagType === 'unverified' && f.status === 'pending';
    if (activeFilter === 'contradicted') return f.flagType === 'contradicted' && f.status === 'pending';
    if (activeFilter === 'tone') return f.flagType === 'tone_voice' && f.status === 'pending';
    return true; // 'all'
  }) : [];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar
        onSelectSample={handleSelectSample}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        hasApiKey={Boolean(apiKey)}
        onToggleApiModal={() => setIsApiSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col">
        
        {/* Compliance Score Gauge & Health Chips */}
        {summary && (
          <ScoreBanner 
            summary={summary} 
            allResolved={allResolved} 
          />
        )}

        {/* Workspace: Split-Pane Editor & Issues Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Left Pane: Interactive Document & Highlighting (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
            <ContentEditor
              draftText={draftText}
              flags={summary ? summary.flags : []}
              selectedFlagId={selectedFlagId}
              onSelectFlag={(id) => setSelectedFlagId(id)}
              onChangeText={(newText) => setDraftText(newText)}
              onReanalyze={() => runAnalysis(draftText)}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Right Pane: Issues, Citations & Suggested Rewrites (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Filter Bar */}
            <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-1 overflow-x-auto">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeFilter === 'all' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  All ({summary?.flags.length || 0})
                </button>
                <button
                  onClick={() => setActiveFilter('unverified')}
                  className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                    activeFilter === 'unverified' 
                      ? 'bg-amber-600 text-white' 
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  Unverified
                </button>
                <button
                  onClick={() => setActiveFilter('tone')}
                  className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                    activeFilter === 'tone' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  Tone
                </button>
                <button
                  onClick={() => setActiveFilter('resolved')}
                  className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                    activeFilter === 'resolved' 
                      ? 'bg-emerald-700 text-white' 
                      : 'text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  Resolved ({summary ? summary.flags.filter(f => f.status !== 'pending').length : 0})
                </button>
              </div>

              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Rule Inspector
              </span>
            </div>

            {/* Cards List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3.5 max-h-[580px]">
              {filteredFlags.length > 0 ? (
                filteredFlags.map((flag) => (
                  <IssueCard
                    key={flag.id}
                    flag={flag}
                    isSelected={selectedFlagId === flag.id}
                    onSelect={() => setSelectedFlagId(flag.id)}
                    onAcceptRewrite={handleAcceptRewrite}
                    onRejectFlag={handleRejectFlag}
                    onCustomEdit={handleCustomEdit}
                    onResetFlag={handleResetFlag}
                  />
                ))
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">No Issues in this Category</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    {allResolved 
                      ? "Great job! All flagged claims and brand rules have been addressed." 
                      : "No active flags matching the selected filter."}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Approval Action Bar */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {allResolved 
                    ? "Ready for Manager Sign-off" 
                    : `${pendingFlags.length} action${pendingFlags.length === 1 ? '' : 's'} remaining`}
                </div>
                <p className="text-[11px] text-slate-500">
                  {allResolved 
                    ? "Generate formal approval certificate" 
                    : "Accept or dismiss flags to proceed"}
                </p>
              </div>

              <button
                onClick={() => setIsApprovalOpen(true)}
                disabled={!allResolved && summary?.flags.length !== 0 && pendingFlags.length > 0}
                className={`text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all ${
                  allResolved || (summary && summary.flags.length === 0)
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Manager Approval</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Footer Note for Hackathon Judges */}
      <footer className="border-t border-slate-200 bg-white py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>TechCircuit Round 2 Submission</strong> — Team NovaTech (Ayushi Mishra, Avishka Kesarwani, Akash, Akshat Kesarwani)
          </span>
          <div className="flex items-center space-x-4 text-xs">
            <button 
              onClick={() => setIsBrandKitOpen(true)}
              className="text-teal-700 hover:underline font-medium"
            >
              Inspect Brand Kit
            </button>
            <span>·</span>
            <button 
              onClick={() => setIsRoadmapOpen(true)}
              className="text-indigo-700 hover:underline font-medium"
            >
              Round 3 Improvements (15 pts)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />

      <Round3Modal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
      />

      <ApprovalModal
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        finalContent={draftText}
        resolvedCount={summary ? summary.flags.length - pendingFlags.length : 0}
      />

      <ApiSettingsModal
        isOpen={isApiSettingsOpen}
        onClose={() => setIsApiSettingsOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

    </div>
  );
}

export default App;
