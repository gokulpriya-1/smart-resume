import React from 'react';
import { Monitor, Cpu, Terminal, CheckCircle2, ArrowRight, ArrowLeft, Download, ShieldCheck, Zap, Laptop } from 'lucide-react';

export default function DownloadPage({ onBack }) {
  const platforms = [
    {
      name: 'Windows',
      icon: Monitor,
      type: 'NSIS Installer (.exe)',
      version: '1.1.0',
      size: '101 MB',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      btnColor: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20',
      link: 'https://github.com/gokulpriya-1/smart-resume/releases/download/1.1/Smart.Resume.Analyzer.Setup.0.0.0.exe',
      supported: 'Windows 10, 11 (64-bit)'
    },
    {
      name: 'macOS',
      icon: Cpu,
      type: 'Universal DMG (.dmg)',
      version: 'v1.1.0',
      size: '105 MB',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
      btnColor: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20',
      link: 'https://github.com/gokulpriya-1/smart-resume/releases',
      supported: 'macOS Monterey or higher (Intel/Apple Silicon)'
    },
    {
      name: 'Linux',
      icon: Terminal,
      type: 'Binary Package (.AppImage)',
      version: 'v1.1.0',
      size: '98 MB',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      btnColor: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20',
      link: 'https://github.com/gokulpriya-1/smart-resume/releases',
      supported: 'Ubuntu, Debian, Fedora, Arch'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Local High Performance',
      description: 'Faster PDF processing and resume loading leveraging your device CPU cores.'
    },
    {
      icon: ShieldCheck,
      title: 'Enhanced Security',
      description: 'Secure, sandboxed environment keeping sensitive profile credentials safe.'
    },
    {
      icon: Laptop,
      title: 'System Integration',
      description: 'Run directly from your taskbar or launcher without keeping tabs open.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in py-8 px-4">
      {/* Go Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analyzer</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Desktop Builds Released
        </span>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Get the Desktop App
        </h2>
        <p className="text-slate-450 text-base md:text-lg leading-relaxed">
          Experience the Smart Resume Analyzer as a native desktop application. Complete ATS grading, qualification mismatch warnings, and custom technical mock interview prep.
        </p>
      </div>

      {/* Platforms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <div
              key={platform.name}
              className={`bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-xl`}
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-6 relative">
                {/* Platform Badge */}
                <div className={`p-3 rounded-2xl border bg-gradient-to-br ${platform.color} inline-block`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{platform.type}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Version:</span>
                    <span className="text-slate-350 font-semibold">{platform.version}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">File Size:</span>
                    <span className="text-slate-350 font-semibold">{platform.size}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Platform:</span>
                    <span className="text-slate-350 font-semibold">{platform.supported}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative">
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm transition shadow-lg transition-all duration-200 ${platform.btnColor}`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download for {platform.name}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature list / Install Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* Desktop features */}
        <div className="p-8 bg-slate-900/20 backdrop-blur-md border border-slate-800 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Why Use the Desktop App?</h3>
          <div className="space-y-4">
            {features.map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div key={feat.title} className="flex gap-4 items-start">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 mt-0.5">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{feat.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Install Guide */}
        <div className="p-8 bg-slate-900/20 backdrop-blur-md border border-slate-800 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Quick Installation Guide</h3>
          <div className="space-y-4 text-xs text-slate-350">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-850 flex items-center justify-center text-indigo-400 font-bold border border-slate-800 shrink-0">1</span>
              <p className="leading-relaxed mt-0.5">
                Download the setup package corresponding to your operating system from the cards above.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-850 flex items-center justify-center text-indigo-400 font-bold border border-slate-800 shrink-0">2</span>
              <p className="leading-relaxed mt-0.5">
                Run the downloaded installer (e.g. double-click `.exe` for Windows or mount the `.dmg` on macOS).
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-850 flex items-center justify-center text-indigo-400 font-bold border border-slate-800 shrink-0">3</span>
              <p className="leading-relaxed mt-0.5">
                Launch the application from your desktop launcher and start evaluating resumes locally!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
