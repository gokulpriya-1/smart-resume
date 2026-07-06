import React from 'react';

export default function ScoreDonut({ score }) {
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color theme based on score
  const getColors = (s) => {
    if (s >= 75) return { stroke: 'stroke-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    if (s >= 50) return { stroke: 'stroke-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    return { stroke: 'stroke-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
  };

  const theme = getColors(score);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
      <h3 className="text-slate-400 text-xs font-semibold tracking-wider uppercase mb-4">ATS Match Score</h3>
      <div className="relative flex items-center justify-center">
        {/* SVG Circle Gauge */}
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground progress circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className={`transition-all duration-1000 ease-out ${theme.stroke}`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Centered score number */}
        <div className="absolute text-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">{score}</span>
          <span className="text-xs text-slate-500 block -mt-1">/100</span>
        </div>
      </div>
      <div className={`mt-4 px-3 py-1 rounded-full text-xs font-semibold ${theme.bg} ${theme.text} border ${theme.border}`}>
        {score >= 75 ? 'Strong Match' : score >= 50 ? 'Average Match' : 'Weak Match'}
      </div>
    </div>
  );
}
