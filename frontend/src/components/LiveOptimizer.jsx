import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Download, CheckCircle, AlertCircle, Award, Sparkles, FileText } from 'lucide-react';

export default function LiveOptimizer({ report, extractedText, onBack }) {
  const [resumeText, setResumeText] = useState(extractedText || '');
  const [copied, setCopied] = useState(false);

  // Parse word and character counts dynamically
  const charCount = resumeText.length;
  const wordCount = resumeText.trim() === '' ? 0 : resumeText.trim().split(/\s+/).length;

  // Track match status of missing skills (case-insensitive)
  const missingSkills = report.missingSkills || [];
  const trackedSkills = missingSkills.map(skill => {
    const isFound = resumeText.toLowerCase().includes(skill.toLowerCase());
    return { name: skill, found: isFound };
  });

  const foundCount = trackedSkills.filter(s => s.found).length;
  const totalCount = missingSkills.length;

  // Estimate real-time ATS Score
  // Increase rating by 5 points for every missing skill successfully integrated, capped at 100.
  const baseScore = report.atsScore || 0;
  const estimatedScore = Math.min(100, baseScore + (foundCount * 5));

  // Handle Copy to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download as plain text (.txt)
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${report.targetRole.toLowerCase().replace(/\s+/g, '_')}_optimized_resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in py-4 px-2">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            Live Resume Optimizer
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Edit your resume text in the workspace below and integrate missing keywords to boost your ATS score.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-semibold transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition shadow-lg shadow-indigo-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Download TXT</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Text Area Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl flex flex-col space-y-4 h-[650px] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-3 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Resume Body Text
              </span>
              <div className="flex items-center gap-4">
                <span>{charCount} Characters</span>
                <span>{wordCount} Words</span>
              </div>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full flex-grow bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-6 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-mono leading-relaxed"
              placeholder="Paste or edit your resume text here..."
              autoFocus
            />

            {!extractedText && (
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 text-amber-450 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Notice: Historical database reports do not store raw text. You can paste your resume text here manually to track keywords!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Keyword Tracker & Gauge */}
        <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
          {/* Estimated Score card */}
          <div className="p-6 bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-800 rounded-3xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
            
            <h3 className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Estimated ATS Score</h3>
            
            <div className="relative inline-flex items-center justify-center">
              {/* Outer Score circle */}
              <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                {/* Simulated progress border color */}
                <div 
                  className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                    estimatedScore >= 80 ? 'border-emerald-400' : estimatedScore >= 60 ? 'border-indigo-400' : 'border-rose-400'
                  }`}
                  style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` }}
                />
                <span className="text-4xl font-black text-white">{estimatedScore}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-200">
                {foundCount} of {totalCount} Keywords Added
              </p>
              <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
                Each integrated missing skill boosts your candidate score by +5 points. Target a score of 80+ for optimal ATS pass rates.
              </p>
            </div>
          </div>

          {/* Keywords Checklist Card */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-xs text-slate-400 font-bold tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              Missing Keywords Lint Check
            </h3>

            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {trackedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                    skill.found
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-800'
                  }`}
                >
                  <span className="truncate">{skill.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    {skill.found ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Found</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Missing</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
