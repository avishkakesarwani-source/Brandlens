import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScoreBanner } from './components/ScoreBanner';
import { ContentEditor } from './components/ContentEditor';
import { IssueCard } from './components/IssueCard';
import { DiffViewer } from './components/DiffViewer';
import { ImageComplianceStudio } from './components/ImageComplianceStudio';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BrandKitModal } from './components/BrandKitModal';
import { BrandKitEditorModal } from './components/BrandKitEditorModal';
import { VersionHistoryDrawer } from './components/VersionHistoryDrawer';
import { Round3Modal } from './components/Round3Modal';
import { ApprovalModal } from './components/ApprovalModal';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { ExportReportModal } from './components/ExportReportModal';
import { HowToUseGuide } from './components/HowToUseGuide';
import { defaultEngine } from './services/analyzer';
import { SAMPLE_DRAFTS, ECOGLOW_BRAND_KIT, FINEDGE_BRAND_KIT } from './data/mockBrandKit';
import type { SampleDraft } from './data/mockBrandKit';
import type { AnalysisSummary, BrandKit, ContentVersion, UserRole, ApprovalRecord, FlagComment } from './types';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { triggerCelebration, playFeedbackSound } from './utils/effects';

export function App() {
  const [activeBrandKit, setActiveBrandKit] = useState<BrandKit>(ECOGLOW_BRAND_KIT);
  const [draftText, setDraftText] = useState(SAMPLE_DRAFTS[0].draftText);
  const [originalDraftForDiff, setOriginalDraftForDiff] = useState(SAMPLE_DRAFTS[0].draftText);
  const [summary, setSummary] = useState<AnalysisSummary | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unverified' | 'contradicted' | 'tone' | 'resolved'>('all');
  const [activeView, setActiveView] = useState<'inspect' | 'diff'>('inspect');
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'analytics' | 'guide'>('text');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Creator');
  const soundEnabled = true;
  
  // Theme state (Dark / Light mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('brandlens_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('brandlens_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Version history (Slide 8)
  const [versions, setVersions] = useState<ContentVersion[]>([
    {
      versionNumber: 1.0,
      author: "Akshat Kesarwani",
      role: "Creator",
      timestamp: new Date().toLocaleTimeString(),
      content: SAMPLE_DRAFTS[0].draftText,
      changeNote: "Initial Marketing Copy Upload",
      status: "draft"
    }
  ]);

  // Modals
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isBrandEditorOpen, setIsBrandEditorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('brandlens_gemini_key') || '');

  // Perform initial scan on load
  useEffect(() => {
    runAnalysis(draftText, activeBrandKit);
  }, []);

  const runAnalysis = async (textToScan: string, kit: BrandKit = activeBrandKit) => {
    setIsAnalyzing(true);
    if (soundEnabled) playFeedbackSound('scan');
    try {
      defaultEngine.setBrandKit(kit);
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

  const handleSwitchBrand = (brandKey: 'ecoglow' | 'finedge') => {
    const brandKit = brandKey === 'ecoglow' ? ECOGLOW_BRAND_KIT : FINEDGE_BRAND_KIT;
    setActiveBrandKit(brandKit);
    defaultEngine.setBrandKit(brandKit);
    
    const relevantSample = SAMPLE_DRAFTS.find(s => s.brandKey === brandKey) || SAMPLE_DRAFTS[0];
    setDraftText(relevantSample.draftText);
    setOriginalDraftForDiff(relevantSample.draftText);
    runAnalysis(relevantSample.draftText, brandKit);
  };

  // Support for ANY custom brand
  const handleSaveCustomBrand = (newKit: BrandKit) => {
    setActiveBrandKit(newKit);
    defaultEngine.setBrandKit(newKit);
    runAnalysis(draftText, newKit);
    triggerCelebration();
  };

  const handleSelectSample = (sample: SampleDraft) => {
    const brandKit = sample.brandKey === 'ecoglow' ? ECOGLOW_BRAND_KIT : FINEDGE_BRAND_KIT;
    setActiveBrandKit(brandKit);
    defaultEngine.setBrandKit(brandKit);
    setDraftText(sample.draftText);
    setOriginalDraftForDiff(sample.draftText);
    runAnalysis(sample.draftText, brandKit);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('brandlens_gemini_key', key);
  };

  // User accepts single AI rewrite
  const handleAcceptRewrite = (flagId: string, rewriteText: string) => {
    if (!summary) return;

    const targetFlag = summary.flags.find(f => f.id === flagId);
    if (!targetFlag) return;

    const updatedDraft = draftText.replace(targetFlag.matchedText, rewriteText);
    setDraftText(updatedDraft);

    if (soundEnabled) playFeedbackSound('fix');

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

    const newVer: ContentVersion = {
      versionNumber: Number((versions[versions.length - 1].versionNumber + 0.1).toFixed(1)),
      author: "Ayushi Mishra",
      role: currentUserRole,
      timestamp: new Date().toLocaleTimeString(),
      content: updatedDraft,
      changeNote: `Adopted compliant rewrite for: "${targetFlag.matchedText}"`,
      status: "draft"
    };
    setVersions([...versions, newVer]);

    const remaining = updatedFlags.filter(f => f.status === 'pending');
    if (remaining.length === 0) {
      triggerCelebration();
      if (soundEnabled) playFeedbackSound('success');
    }
  };

  // ⚡ Auto-Fix All Issues Simultaneously
  const handleAutoFixAll = () => {
    if (!summary) return;

    let updated = draftText;
    const pending = summary.flags.filter(f => f.status === 'pending');
    if (pending.length === 0) return;

    pending.forEach(f => {
      updated = updated.replace(f.matchedText, f.suggestedRewrite);
    });

    const updatedFlags = summary.flags.map(f => ({
      ...f,
      status: 'accepted' as const
    }));

    setDraftText(updated);
    setSummary({
      ...summary,
      originalText: updated,
      flags: updatedFlags,
      complianceScore: 100,
      highRiskCount: 0,
      unverifiedCount: 0,
      contradictedCount: 0,
      toneIssueCount: 0
    });

    const newVer: ContentVersion = {
      versionNumber: Number((versions[versions.length - 1].versionNumber + 0.1).toFixed(1)),
      author: "Ayushi Mishra",
      role: currentUserRole,
      timestamp: new Date().toLocaleTimeString(),
      content: updated,
      changeNote: "Auto-remediated all detected brand violations with AI rewrites",
      status: "draft"
    };
    setVersions([...versions, newVer]);

    triggerCelebration();
    if (soundEnabled) playFeedbackSound('success');
  };

  // Custom Edit
  const handleCustomEdit = (flagId: string, customText: string) => {
    if (!summary) return;

    const targetFlag = summary.flags.find(f => f.id === flagId);
    if (!targetFlag) return;

    const updatedDraft = draftText.replace(targetFlag.matchedText, customText);
    setDraftText(updatedDraft);

    if (soundEnabled) playFeedbackSound('fix');

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

  // Reject / Overrule
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

  // Reset Flag
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

  // Add Comment to Flag
  const handleAddComment = (flagId: string, commentText: string) => {
    if (!summary) return;
    const newComment: FlagComment = {
      id: `comm-${Date.now()}`,
      author: "Ayushi Mishra",
      role: currentUserRole,
      text: commentText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedFlags = summary.flags.map(f => {
      if (f.id === flagId) {
        return { ...f, comments: [...f.comments, newComment] };
      }
      return f;
    });

    setSummary({ ...summary, flags: updatedFlags });
  };

  // Manager Approval or Changes Requested Decision
  const handleRecordDecision = (record: ApprovalRecord) => {
    const newVer: ContentVersion = {
      versionNumber: Number((versions[versions.length - 1].versionNumber + 0.1).toFixed(1)),
      author: record.approvedBy,
      role: record.userRole,
      timestamp: record.timestamp,
      content: record.finalContent,
      changeNote: record.status === 'approved' 
        ? `Official Sign-Off Issued (${record.auditHash.substring(0, 14)})` 
        : `Changes Requested by Manager: ${record.managerFeedback || 'Please revise ungrounded claims.'}`,
      status: record.status
    };
    setVersions([...versions, newVer]);
  };

  const pendingFlags = summary ? summary.flags.filter(f => f.status === 'pending') : [];
  const allResolved = summary !== null && summary.flags.length > 0 && pendingFlags.length === 0;

  const filteredFlags = summary ? summary.flags.filter(f => {
    if (activeFilter === 'resolved') return f.status !== 'pending';
    if (activeFilter === 'unverified') return f.claimStatus === 'no_proof_found' && f.status === 'pending';
    if (activeFilter === 'contradicted') return f.claimStatus === 'goes_against_facts' && f.status === 'pending';
    if (activeFilter === 'tone') return f.flagType === 'tone_voice' && f.status === 'pending';
    return true; // 'all'
  }) : [];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        onSelectSample={handleSelectSample}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeBrand={activeBrandKit.brandName}
        onSwitchBrand={handleSwitchBrand}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUserRole={currentUserRole}
        onChangeUserRole={setCurrentUserRole}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col">

        {/* Unified Compliance Score Gauge & Quick Remediation */}
        {summary && activeTab === 'text' && (
          <ScoreBanner 
            summary={summary} 
            allResolved={allResolved} 
            activeView={activeView}
            onChangeView={setActiveView}
            onAutoFixAll={handleAutoFixAll}
            onOpenApproval={() => setIsApprovalOpen(true)}
            draftText={draftText}
            brandName={activeBrandKit.brandName}
          />
        )}

        {/* Tab 1: Text & Word/PDF Document Analysis */}
        {activeTab === 'text' && (
          activeView === 'inspect' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              
              {/* Left Pane: Interactive Document & Highlighting (7 cols) */}
              <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[11px] font-bold">1</span>
                    Step 1: Check Marketing Copy
                  </span>
                  <span className="text-slate-400 text-[11px]">Click any highlighted word to inspect</span>
                </div>

                <ContentEditor
                  draftText={draftText}
                  flags={summary ? summary.flags : []}
                  selectedFlagId={selectedFlagId}
                  onSelectFlag={(id) => setSelectedFlagId(id)}
                  onChangeText={(newText) => setDraftText(newText)}
                  onReanalyze={() => runAnalysis(draftText, activeBrandKit)}
                  onAutoFixAll={handleAutoFixAll}
                  isAnalyzing={isAnalyzing}
                  activeBrandName={activeBrandKit.brandName}
                />
              </div>

              {/* Right Pane: Issues, Citations & Suggested Rewrites (5 cols) */}
              <div className="lg:col-span-5 flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                
                {/* Filter Bar with Friendly Step Indicator */}
                <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1 overflow-x-auto">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        activeFilter === 'all' 
                          ? 'bg-slate-900 dark:bg-slate-700 text-white' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700'
                      }`}
                    >
                      All ({summary?.flags.length || 0})
                    </button>
                    <button
                      onClick={() => setActiveFilter('unverified')}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        activeFilter === 'unverified' 
                          ? 'bg-amber-600 text-white' 
                          : 'text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                      }`}
                    >
                      No Proof ({summary ? summary.flags.filter(f => f.claimStatus === 'no_proof_found' && f.status === 'pending').length : 0})
                    </button>
                    <button
                      onClick={() => setActiveFilter('tone')}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        activeFilter === 'tone' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                      }`}
                    >
                      Tone
                    </button>
                    <button
                      onClick={() => setActiveFilter('resolved')}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        activeFilter === 'resolved' 
                          ? 'bg-emerald-700 text-white' 
                          : 'text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      Resolved ({summary ? summary.flags.filter(f => f.status !== 'pending').length : 0})
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center text-[10px] font-bold">2</span>
                    Step 2: Fix
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
                        currentUserRole={currentUserRole}
                        onSelect={() => setSelectedFlagId(flag.id)}
                        onAcceptRewrite={handleAcceptRewrite}
                        onRejectFlag={handleRejectFlag}
                        onCustomEdit={handleCustomEdit}
                        onResetFlag={handleResetFlag}
                        onAddComment={handleAddComment}
                      />
                    ))
                  ) : (
                    <div className="text-center py-16 px-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">All Clear</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                        {allResolved 
                          ? "Great job! All flagged claims and brand rules have been addressed." 
                          : "No active flags matching the selected filter."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Approval Action Bar with Step 3 */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">3</span>
                      <span>{allResolved ? "Step 3: Ready for Sign-Off" : `${pendingFlags.length} action${pendingFlags.length === 1 ? '' : 's'} remaining`}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {allResolved 
                        ? "Generate official approval certificate" 
                        : "Click 'Accept Fix' on cards above"}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsApprovalOpen(true)}
                    disabled={!allResolved && summary?.flags.length !== 0 && pendingFlags.length > 0}
                    className={`text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all ${
                      allResolved || (summary && summary.flags.length === 0)
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white cursor-pointer shadow-emerald-600/20 shadow-md transform hover:scale-[1.02]'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Manager Approval</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* View Mode 2: Before vs. After Diff Mode */
            <div className="flex-1 min-h-[500px]">
              <DiffViewer
                originalText={originalDraftForDiff}
                currentText={draftText}
                flags={summary ? summary.flags : []}
              />
            </div>
          )
        )}

        {/* Tab 2: Image Compliance Studio */}
        {activeTab === 'image' && (
          <ImageComplianceStudio 
            brandKit={activeBrandKit} 
          />
        )}

        {/* Tab 3: Dashboard of Repeat Mistakes & Unclear Rules */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            brandKit={activeBrandKit} 
          />
        )}

        {/* Tab 4: Dedicated How to Use & Platform Guide */}
        {activeTab === 'guide' && (
          <HowToUseGuide
            brandKit={activeBrandKit}
            onGoToDraftChecker={() => setActiveTab('text')}
            onGoToImageStudio={() => setActiveTab('image')}
            onGoToAnalytics={() => setActiveTab('analytics')}
            onLoadDemoDraft={() => handleSelectSample(SAMPLE_DRAFTS[0])}
            onOpenExportReport={() => setIsExportReportOpen(true)}
          />
        )}

      </main>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>BrandLens</strong> · Pre-Publishing Compliance Gateway · Built by <strong>Team NovaTech</strong> (Ayushi Mishra, Avishka Kesarwani, Akash, Akshat Kesarwani)
          </span>
          <div className="flex items-center space-x-4 text-xs">
            <button 
              onClick={() => setActiveTab('guide')}
              className="text-teal-700 dark:text-teal-400 hover:underline font-semibold"
            >
              How to Use (Guide)
            </button>
            <span>·</span>
            <button 
              onClick={() => setIsBrandKitOpen(true)}
              className="text-slate-700 dark:text-slate-300 hover:underline font-semibold"
            >
              Active Brand Kit ({activeBrandKit.brandName})
            </button>
            <span>·</span>
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="text-slate-700 dark:text-slate-300 hover:underline font-semibold"
            >
              Audit Trail ({versions.length} revisions)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />

      <BrandKitEditorModal
        isOpen={isBrandEditorOpen}
        onClose={() => setIsBrandEditorOpen(false)}
        currentBrandKit={activeBrandKit}
        onSaveBrandKit={handleSaveCustomBrand}
      />

      <VersionHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        versions={versions}
        onRestoreVersion={(ver) => {
          setDraftText(ver.content);
          runAnalysis(ver.content, activeBrandKit);
        }}
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
        soundEnabled={soundEnabled}
        onRecordDecision={handleRecordDecision}
      />

      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
        brandKit={activeBrandKit}
        summary={summary}
        draftText={draftText}
        versions={versions}
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
