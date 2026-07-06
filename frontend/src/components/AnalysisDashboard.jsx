import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, HelpCircle, Star, Sparkles } from 'lucide-react';
import ScoreDonut from './ScoreDonut';

export default function AnalysisDashboard({ report, onReset }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Back navigation button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Upload Another Resume</span>
        </button>

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

      {/* Customized Interview Questions */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl space-y-6">
        <h3 className="text-white text-lg font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400 animate-pulse" />
          Customized Technical Interview Questions
        </h3>
        <p className="text-slate-400 text-sm max-w-3xl">
          Here are 5 tailored interview questions based on your resume experience and target role, designed to prepare you for technical rounds.
        </p>

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
