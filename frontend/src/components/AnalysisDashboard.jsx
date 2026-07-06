import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, HelpCircle, Star, Sparkles, FileText } from 'lucide-react';
import ScoreDonut from './ScoreDonut';

export default function AnalysisDashboard({ report, onReset, onOpenOptimizer, onOpenInterview }) {
  if (report.isQualified === false) {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
        {/* Back navigation button */}
        <div className="flex items-center">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Try Another Resume / Role</span>
          </button>
        </div>

        {/* Qualification Not Matched Panel */}
        <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
          
          <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-400 inline-block">
            <AlertTriangle className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Qualification Not Matched</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Your resume qualifications do not match the required skill set for the target role: <strong className="text-rose-400 font-semibold">{report.targetRole}</strong>.
            </p>
          </div>

          <div className="p-5 bg-slate-950/60 border border-slate-850 rounded-2xl text-left text-sm text-slate-300 leading-relaxed max-w-md mx-auto space-y-3">
            <p className="font-bold text-slate-200">Why was this rejected?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
              <li>The experience details and core technical tags in the resume do not align with the requested role.</li>
              <li>A minimum background overlap is required to perform structured ATS grading and custom technical interview generation.</li>
            </ul>
          </div>

          <button
            onClick={onReset}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-rose-500/20"
          >
            Choose a Different Role
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Back navigation button */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload Another Resume</span>
          </button>
          {report.isQualified !== false && (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Export PDF Report</span>
            </button>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          AI Analysis Complete
        </span>
      </div>

      {/* Target Role & Overview Card */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs text-indigo-400 font-semibold tracking-widest uppercase">Target Job Position</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">{report.targetRole}</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              This report evaluates your resume's alignment with target requirements, highlighting strengths, missing keywords, and customizing mock interview questions.
            </p>
          </div>
          <button
            onClick={onOpenOptimizer}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-450 hover:to-purple-550 text-white font-bold text-sm transition shadow-lg shadow-indigo-500/20 group relative overflow-hidden shrink-0 no-print"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition duration-200" />
            <span>Optimize Resume Live</span>
          </button>
        </div>
      </div>

      {/* Main Grid: ATS Score Gauge, Strengths & Missing Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ATS Score card */}
        <div className="lg:col-span-1">
          <ScoreDonut score={report.atsScore} />
        </div>

        {/* Strengths & Missing Skills */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-col">
            <h3 className="text-emerald-400 text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Key Strengths
            </h3>
            <ul className="space-y-4 flex-grow">
              {report.strengths && report.strengths.length > 0 ? (
                report.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <Star className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No specific strengths generated.</p>
              )}
            </ul>
          </div>

          {/* Missing Skills */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-col">
            <h3 className="text-amber-400 text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Gaps & Missing Skills
            </h3>
            <ul className="space-y-4 flex-grow">
              {report.missingSkills && report.missingSkills.length > 0 ? (
                report.missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    <span>{skill}</span>
                  </li>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No missing skills detected.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive AI Career Roadmap & Upgradation Blueprint */}
      {report.roadmap && report.roadmap.length > 0 && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl space-y-8 relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
          
          <div className="space-y-2">
            <h3 className="text-white text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              Interactive Career Roadmap & Upgradation Blueprint
            </h3>
            <p className="text-slate-400 text-sm max-w-3xl">
              Follow this step-by-step timeline designed by AI to bridge your missing skills gap and land the targeted position.
            </p>
          </div>

          {/* Vertical Roadmap Timeline */}
          <div className="relative pl-8 md:pl-12 border-l border-slate-800 space-y-12 ml-4">
            {report.roadmap.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Glowing Node Marker */}
                <div className="absolute -left-[45px] md:-left-[61px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center font-bold text-xs md:text-sm text-indigo-400 shadow-md group-hover:border-indigo-500 transition duration-300">
                  {index + 1}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  {/* Left Column: Phase & Topics */}
                  <div className="lg:col-span-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                        {phase.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition duration-200">
                      {phase.phase}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {phase.topics.map((topic, tid) => (
                        <li key={tid} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Project Card */}
                  <div className="lg:col-span-2 p-5 bg-slate-950/60 border border-slate-850 rounded-2xl space-y-2 group-hover:border-slate-700 transition duration-300">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Target Project Blueprint</span>
                    <h5 className="text-sm font-bold text-slate-200">{phase.project.title}</h5>
                    <p className="text-xs text-slate-450 leading-relaxed">{phase.project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customized Interview Questions */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-white text-lg font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400 animate-pulse" />
              Customized Technical Interview Questions
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Here are 5 tailored interview questions based on your resume experience and target role, designed to prepare you for technical rounds.
            </p>
          </div>
          {report.isQualified !== false && (
            <button
              onClick={onOpenInterview}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-650 hover:bg-indigo-550 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/20 shrink-0 no-print"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Practice Session</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {report.interviewQuestions && report.interviewQuestions.length > 0 ? (
            report.interviewQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-slate-950/40 hover:bg-slate-950/60 border border-slate-800 rounded-2xl transition group hover:-translate-y-0.5 duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="text-slate-200 group-hover:text-white font-medium text-sm transition leading-relaxed">
                    {question}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm italic">No interview questions generated.</p>
          )}
        </div>
      </div>
    </div>
  );
}
