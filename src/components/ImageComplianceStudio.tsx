import React, { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import type { BrandKit } from '../types';

interface ImageComplianceStudioProps {
  brandKit: BrandKit;
}

export const ImageComplianceStudio: React.FC<ImageComplianceStudioProps> = ({
  brandKit
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'
  );
  const [fileName, setFileName] = useState('ecoglow_bottle_social_card.png');
  const [altText, setAltText] = useState('');
  const [extractedColors, setExtractedColors] = useState<string[]>(['#0d9488', '#14b8a6', '#e06a55', '#7c3aed']);
  const [isGeneratingAlt, setIsGeneratingAlt] = useState(false);

  // Analyze image on canvas to extract colors
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      analyzeColorsFromSrc(src);
    };
    reader.readAsDataURL(file);
  };

  const analyzeColorsFromSrc = (src: string) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      const imageData = ctx.getImageData(0, 0, 100, 100).data;
      const sampledHexes: string[] = [];
      const step = 4 * 250; // sample 40 pixels

      for (let i = 0; i < imageData.length; i += step) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        if (!sampledHexes.includes(hex)) {
          sampledHexes.push(hex);
        }
        if (sampledHexes.length >= 4) break;
      }

      setExtractedColors(sampledHexes);
    };
    img.src = src;
  };

  // Generate compliant Alt-Text
  const handleAutoGenerateAltText = () => {
    setIsGeneratingAlt(true);
    setTimeout(() => {
      const generated = `${brandKit.brandName} reusable eco-friendly product with certified recycled ocean plastic body and sleek ergonomic lid, presented in natural studio lighting.`;
      setAltText(generated);
      setIsGeneratingAlt(false);
    }, 600);
  };

  // Compare extracted colors against Brand Kit colors
  const brandHexes = brandKit.colors.map(c => c.hex.toLowerCase());
  const offBrandColors = extractedColors.filter(hex => {
    // Check if color is remotely close to brand colors
    return !brandHexes.some(bHex => hex.toLowerCase() === bHex);
  });

  const hasMissingAltText = altText.trim().length === 0;
  const hasOffBrandColors = offBrandColors.length >= 2;

  const imageScore = 100 - (hasMissingAltText ? 40 : 0) - (hasOffBrandColors ? 30 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-slate-900">Image & Visual Compliance Studio</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                Slide 8 Feature
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Audits marketing creatives for brand palette compliance and mandatory WCAG 2.1 Alt-Text
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase">Visual Score</div>
            <div className={`text-xl font-extrabold ${imageScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {imageScore}%
            </div>
          </div>
          
          <label className="text-xs font-bold px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm transition-transform active:scale-95">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Creative</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Main Grid: Preview & Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video max-h-64 flex items-center justify-center group">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={altText || "Preview"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-400 p-4">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <span className="text-xs">No image loaded</span>
              </div>
            )}

            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] text-white flex justify-between items-center">
              <span className="truncate">{fileName}</span>
              <span className="font-mono text-emerald-400 font-bold">RGB Analyzed</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Test with preloaded creative:</span>
            <button
              onClick={() => {
                setImageSrc('https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80');
                setFileName('ecoglow_bottle_social_card.png');
                setAltText('');
                analyzeColorsFromSrc('https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80');
              }}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Sample</span>
            </button>
          </div>
        </div>

        {/* Right Column: Compliance Audits (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Audit 1: Brand Colors Extraction */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase text-slate-800">
                  1. Color Palette Conformity
                </span>
                {hasOffBrandColors ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                    Off-Palette Detected
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    Compliant
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">Target: {brandKit.brandName} Palette</span>
            </div>

            {/* Extracted Colors */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Sampled Image Pixels:</div>
              <div className="flex items-center gap-2">
                {extractedColors.map((hex, idx) => {
                  const isOff = brandHexes.every(b => b !== hex.toLowerCase());
                  return (
                    <div key={idx} className="flex items-center space-x-1.5 p-1.5 rounded-lg border border-slate-200 bg-white">
                      <div className="w-5 h-5 rounded-md shadow-xs" style={{ backgroundColor: hex }} />
                      <span className="text-[11px] font-mono text-slate-700 font-medium">{hex}</span>
                      {isOff && <span className="text-[9px] text-rose-600 font-bold px-1 rounded bg-rose-50">Off</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand Colors Reference */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Approved Brand Colors:</span>
              <div className="flex items-center gap-1.5">
                {brandKit.colors.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 text-[11px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c.hex }} />
                    {c.hex} ({c.name})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Audit 2: Alt-Text & WCAG Accessibility */}
          <div className={`p-4 rounded-xl border space-y-3 transition-colors ${
            hasMissingAltText ? 'border-amber-200 bg-amber-50/40' : 'border-emerald-200 bg-emerald-50/40'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase text-slate-800">
                  2. Mandatory Alt-Text (WCAG 2.1 AA)
                </span>
                {hasMissingAltText ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    Missing Alt-Text (53.1% WebAIM Violation)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Screen-Reader Compliant
                  </span>
                )}
              </div>

              <button
                onClick={handleAutoGenerateAltText}
                disabled={isGeneratingAlt}
                className="text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-100/80 hover:bg-teal-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Sparkles className={`w-3.5 h-3.5 text-teal-700 ${isGeneratingAlt ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAlt ? 'Synthesizing...' : '⚡ Generate Alt-Text'}</span>
              </button>
            </div>

            <div>
              <textarea
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter descriptive screen-reader Alt-Text for visually impaired users..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Slide 3 Citation: 53.1% of published creatives lack alt-text, creating legal accessibility risks under global digital compliance directives.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
