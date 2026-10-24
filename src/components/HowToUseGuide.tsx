import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Wand2, 
  ArrowRight,
  HelpCircle,
  Play,
  FileCheck2,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { BrandKit } from '../types';

interface HowToUseGuideProps {
  brandKit: BrandKit;
  onGoToDraftChecker: () => void;
  onGoToImageStudio: () => void;
  onGoToAnalytics: () => void;
  onLoadDemoDraft: () => void;
  onOpenExportReport: () => void;
}

export const HowToUseGuide: React.FC<HowToUseGuideProps> = ({
  brandKit,
  onGoToDraftChecker,
  onGoToImageStudio,
  onGoToAnalytics,
  onLoadDemoDraft,
  onOpenExportReport
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const steps = [
    {
      stepNumber: "01",
      title: "Input or Upload Marketing Copy",
      badge: "Text / Word / PDF",
      icon: <Upload className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      color: "from-teal-500/10 to-emerald-500/10 border-teal-200 dark:border-teal-800",
      description: "Paste your ad copy, social post, or email draft directly into the Draft Workspace. You can also upload Microsoft Word (.docx) or Adobe PDF (.pdf) files with 100% private in-browser text extraction.",
      actionLabel: "⚡ Load Interactive Demo Draft",
      action: () => {
        onLoadDemoDraft();
        onGoToDraftChecker();
      }
    },
    {
      stepNumber: "02",
      title: "Inspect 3-Tier Claim Fact-Checking",
      badge: "Real-Time Scan",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      color: "from-indigo-500/10 to-blue-500/10 border-indigo-200 dark:border-indigo-800",
      description: "BrandLens instantly cross-references every factual statement against registered approved brand facts and advertising regulations:",
      subPoints: [
        { label: "Proven Fact (Green)", text: "Substantiated with lab certification data in the active Brand Kit." },
        { label: "No Proof Found (Amber)", text: "Unsubstantiated superlative or claim that risks legal scrutiny." },
        { label: "Goes Against Facts (Red)", text: "Contradicts certified product data or regulatory guidelines." }
      ],
      actionLabel: "View Draft Checker Workspace",
      action: onGoToDraftChecker
    },
    {
      stepNumber: "03",
      title: "1-Click Remediation & Auto-Fix",
      badge: "Zero-Hallucination AI",
      icon: <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      color: "from-purple-500/10 to-fuchsia-500/10 border-purple-200 dark:border-purple-800",
      description: "Click on any highlighted phrase to view its rule citation, explanation, and AI-suggested compliant rewrite. Accept individual fixes or click '⚡ Auto-Fix All' to resolve all policy violations simultaneously.",
      actionLabel: "Test Before / After Diff Mode",
      action: onGoToDraftChecker
    },
    {
      stepNumber: "04",
      title: "Manager Approval & Official Certificate",
      badge: "Cryptographic SHA-256",
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800",
      description: "Switch to 'Brand Manager' role in the header. Once all flags are addressed, click 'Manager Approval' to issue a cryptographic SHA-256 publication certificate or export an official audit report for legal compliance.",
      actionLabel: "Export Compliance Report",
      action: onOpenExportReport
    }
  ];

  const tools = [
    {
      title: "🎨 Visual Image Compliance Studio",
      desc: "Upload product creatives, flyers, or banners. Extracts dominant hex palettes, matches against Brand Kit colors with Delta-E distance, and audits WCAG missing Alt-Text with 1-click AI generation.",
      btnText: "Open Image Studio",
      onClick: onGoToImageStudio
    },
    {
      title: "📊 Rules Dashboard & Ambiguity Index",
      desc: "Analytics dashboard highlighting repeat creator mistakes and calculating an Ambiguity Index to identify which brand policies are frequently overruled.",
      btnText: "Open Analytics",
      onClick: onGoToAnalytics
    },
    {
      title: "📄 Official Compliance Audit Export",
      desc: "Download formatted Markdown reports or trigger 1-click print-to-PDF certificates complete with SHA-256 validation stamps for agencies and brand legal teams.",
      btnText: "Export Report",
      onClick: onOpenExportReport
    }
  ];

  const faqs = [
    {
      q: "Does BrandLens work without an internet connection or Gemini API key?",
      a: "Yes! BrandLens is built with an offline-capable deterministic heuristic engine that runs with zero latency directly in your browser. Adding a Google Gemini API key unlocks dynamic contextual scans, but the core workflow is 100% functional without it."
    },
    {
      q: "Can I use BrandLens for a brand other than EcoGlow or FinEdge?",
      a: "Absolutely! Open 'More Tools' in the header and click '+ Create Brand Kit for Any Brand'. You can configure custom brand rules, approved facts, hex color codes, and banned superlatives for any company."
    },
    {
      q: "Are my uploaded Word (.docx) and PDF files uploaded to an external server?",
      a: "No. All document parsing is handled 100% client-side inside your browser using WebAssembly and Web Workers (mammoth.js for Word and pdfjs-dist for PDF). No draft content ever leaves your machine."
    },
    {
      q: "What is the difference between Creator, Brand Manager, and Legal Reviewer roles?",
      a: "Creators can draft, upload files, and apply suggested fixes. Brand Managers have the authority to grant final approval and generate cryptographic certificates. Legal Reviewers can leave inline discussion notes on specific rule flags."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in pb-12 text-slate-800 dark:text-slate-100">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-teal-600/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive User Manual & Platform Guide</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            How to Use BrandLens in Under 60 Seconds
          </h1>

          <p className="mt-3 text-sm sm:text-base text-teal-100/90 leading-relaxed">
            BrandLens is an enterprise pre-publishing firewall that audits marketing copy, documents, and creatives against governed brand guidelines, verified claims, and regulatory advertising standards (ASCI & FTC).
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onLoadDemoDraft();
                onGoToDraftChecker();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all transform hover:scale-[1.02]"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Launch 1-Click Interactive Demo</span>
            </button>

            <button
              onClick={onGoToDraftChecker}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors"
            >
              Go to Workspace
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* The 4-Step Core Journey */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              The 4-Step Publishing Workflow
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The end-to-end journey from raw draft to authenticated publication
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            Active Brand: {brandKit.brandName}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((st) => (
            <div 
              key={st.stepNumber}
              className={`p-6 rounded-2xl border bg-gradient-to-br ${st.color} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between transition-all hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-black text-slate-400 dark:text-slate-500 font-mono">
                      {st.stepNumber}
                    </span>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700">
                      {st.icon}
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {st.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {st.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {st.description}
                </p>

                {st.subPoints && (
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    {st.subPoints.map((sp, idx) => (
                      <div key={idx} className="text-[11px] flex items-start gap-1.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200">• {sp.label}:</span>
                        <span className="text-slate-500 dark:text-slate-400">{sp.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  onClick={st.action}
                  className="w-full text-xs font-bold py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>{st.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Specialized Tooling & Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dedicated enterprise studios for images, analytics, A/B ad comparison, and exports
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tl, i) => (
            <div 
              key={i}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between transition-all hover:border-teal-500/50 hover:shadow-md"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {tl.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tl.desc}
                </p>
              </div>

              <button
                onClick={tl.onClick}
                className="mt-4 text-xs font-semibold py-1.5 px-3 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center gap-1 transition-colors"
              >
                <span>{tl.btnText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture & Security Highlights */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-teal-600 text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Privacy & Strict Anti-Hallucination Guardrails
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How BrandLens guarantees zero data leaks and 100% grounded claim audits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              🔒 100% Client-Side Parsing
            </span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Files (.txt, .docx, .pdf) are parsed inside browser memory with WebAssembly. No sensitive marketing files are stored on remote servers.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              🎯 Strict Grounding Filter
            </span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Every flagged claim must link back to an exact, registered Rule ID from the active Brand Kit. Unverifiable AI hallucinated flags are discarded.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              📜 Cryptographic SHA-256 Stamp
            </span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Every manager approval generates a unique cryptographic hash and audit trail, proving the exact text verified at that specific moment.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {activeFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
