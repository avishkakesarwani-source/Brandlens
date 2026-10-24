import React, { useState, useEffect } from 'react';
import { X, Download, Printer, Copy, Check, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import type { AnalysisSummary, BrandKit, ContentVersion } from '../types';
import { computeSha256 } from '../utils/security';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandKit: BrandKit;
  summary: AnalysisSummary | null;
  draftText: string;
  versions: ContentVersion[];
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  brandKit,
  summary,
  draftText,
  versions
}) => {
  const [copied, setCopied] = useState(false);
  const [sha256Hash, setSha256Hash] = useState<string>('Computing cryptographic hash...');

  useEffect(() => {
    if (isOpen && draftText) {
      computeSha256(draftText).then(hash => setSha256Hash(hash));
    }
  }, [isOpen, draftText]);

  if (!isOpen) return null;

  const score = summary ? summary.complianceScore : 0;
  const isApproved = score >= 85 && (!summary || summary.highRiskCount === 0);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const generateMarkdownReport = (): string => {
    return `# BrandLens Enterprise Compliance Audit Report
**Brand:** ${brandKit.brandName}
**Category:** ${brandKit.industry}
**Audit Date:** ${reportDate}
**Compliance Status:** ${isApproved ? 'APPROVED FOR PUBLICATION' : 'REQUIRES REVISION'}
**Overall Score:** ${score}/100
**Verification Hash (SHA-256):** \`${sha256Hash}\`

---

## 1. Executive Summary
- **Total Claims Verified:** ${summary ? summary.provenClaimsCount : 0}
- **Unverified Claims Flagged:** ${summary ? summary.unverifiedCount : 0}
- **Fact Contradictions:** ${summary ? summary.contradictedCount : 0}
- **Tone Violations:** ${summary ? summary.toneIssueCount : 0}
- **Total Revisions Logged:** ${versions.length}

---

## 2. Final Publication Copy
\`\`\`
${draftText}
\`\`\`

---

## 3. Policy & Claim Audit Details
${summary && summary.flags.length > 0 ? summary.flags.map((f, i) => `
### Flag #${i + 1}: ${f.ruleTitle} (\`${f.ruleId}\`)
- **Severity:** ${f.severity.toUpperCase()}
- **Original Copy:** "${f.matchedText}"
- **Policy Violation:** ${f.explanation}
- **Resolution Status:** ${f.status}
- **Final Compliant Text:** "${f.suggestedRewrite}"
`).join('\n') : '*No policy violations detected. Content complies 100% with registered Brand Kit.*'}

---
*Report generated automatically via BrandLens Pre-Publishing Gateway · Team NovaTech*
`;
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdownReport();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${brandKit.brandName}_Compliance_Audit_Report.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    const mdContent = generateMarkdownReport();
    navigator.clipboard.writeText(mdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-teal-50 dark:from-teal-950/40 to-slate-50 dark:to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Export Compliance Audit Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official verification documentation for legal, PR, and ad publishing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable & Scrollable Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1 print:p-0">
          
          {/* Certificate Badge Banner */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isApproved 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60' 
              : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl text-white ${isApproved ? 'bg-emerald-600' : 'bg-amber-600'}`}>
                {isApproved ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isApproved 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                }`}>
                  {isApproved ? 'Certified Publication Ready' : 'Pending Manager Review'}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                  {brandKit.brandName} Marketing Compliance Audit
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  SHA-256: <code className="text-[11px] font-mono text-slate-700 dark:text-slate-300">{sha256Hash.slice(0, 24)}...</code>
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {score}<span className="text-sm font-semibold text-slate-400">/100</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Compliance Score</p>
            </div>
          </div>

          {/* Audit Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Verified Facts</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{summary ? summary.provenClaimsCount : 0} claims</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Unverified Claims</div>
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                {summary ? summary.unverifiedCount : 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Contradictions</div>
              <div className="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                {summary ? summary.contradictedCount : 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Audit Timestamp</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {reportDate}
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Approved Publication Copy
            </h5>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed whitespace-pre-wrap">
              {draftText}
            </div>
          </div>

          {/* Flags Audit Table */}
          {summary && summary.flags.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Policy Violations & Remediations Log ({summary.flags.length})
              </h5>
              <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left divide-y divide-slate-200 dark:divide-slate-800">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-2.5">Rule / Policy</th>
                      <th className="p-2.5">Original Copy</th>
                      <th className="p-2.5">Remediation</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                    {summary.flags.map((flag) => (
                      <tr key={flag.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-2.5 font-semibold text-teal-800 dark:text-teal-400">
                          {flag.ruleId}
                        </td>
                        <td className="p-2.5 text-rose-600 dark:text-rose-400 font-mono text-[11px]">
                          "{flag.matchedText}"
                        </td>
                        <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                          "{flag.suggestedRewrite}"
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            flag.status === 'accepted' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                              : flag.status === 'rejected'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}>
                            {flag.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Export ready in Markdown, Print-to-PDF, and Clipboard format.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyClipboard}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-sm shadow-teal-600/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md Report</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
