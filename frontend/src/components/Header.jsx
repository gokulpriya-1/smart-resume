import React from 'react';
import { Cpu, Download, ArrowLeft } from 'lucide-react';

export default function Header({ currentView, onNavigate }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate('landing')}>
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Smart Resume & Interview Analyzer
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              AI-Powered SaaS Platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {currentView === 'download' ? (
            <button
              onClick={() => onNavigate('analyzer')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-650 text-slate-350 hover:text-white text-xs font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Analyzer</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('download')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition animate-pulse"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Desktop App</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </span>
        </div>
      </div>
    </header>
  );
}
