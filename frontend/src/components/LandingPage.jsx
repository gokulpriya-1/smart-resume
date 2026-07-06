import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Code, History, Zap } from 'lucide-react';

export default function LandingPage({ onStart, onViewHistory }) {
  return (
    <div className="max-w-6xl mx-auto space-y-20 animate-fade-in py-10 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto relative">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Career Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Bridge the Gap to Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Dream Job</span> with AI
        </h1>

        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Scan your resume for ATS optimization, practice real-time interactive mock interviews, and follow customized AI learning roadmaps to bypass recruiters.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 no-print">
          <button
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold tracking-wide transition shadow-lg hover:shadow-indigo-500/20 active:scale-98"
          >
            <span>Analyze Your Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewHistory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-bold transition shadow-md"
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span>Browse History Log</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { label: 'ATS Target Score', value: '80+' },
          { label: 'Feedback Accuracy', value: '98%' },
          { label: 'Evaluation Speed', value: '< 10s' },
          { label: 'Interview Questions', value: 'Custom' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-slate-450 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Section Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Full-Stack Feature Blueprint</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Everything you need to optimize and pass technical recruitment cycles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'ATS Scanner & Score Matching',
              desc: 'Compares your resume against requirements, grading it on alignment and identifying missing credentials.',
              icon: ShieldCheck,
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            },
            {
              title: 'Interactive Mock Interviewer',
              desc: 'Grades your technical and behavioral answers using AI, giving scores out of 10 and optimal sample answers.',
              icon: Cpu,
              color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
            },
            {
              title: 'STAR Method Live Optimizer',
              desc: 'An inline code editor workspace that lets you edit and polish resume sentences with action verbs in real-time.',
              icon: Code,
              color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            },
            {
              title: 'Upgradation Learning Timeline',
              desc: 'Get a customized 3-phase study roadmap with practical capstone project specifications to patch your skill gap.',
              icon: Zap,
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl flex gap-4 hover:border-slate-800 transition duration-300">
                <div className={`p-3 rounded-2xl border flex-shrink-0 w-12 h-12 flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-white text-base font-bold">{feat.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
