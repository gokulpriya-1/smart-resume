import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdvancedLoader({ targetRole }) {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { text: 'Parsing uploaded PDF layout and extracting text structures...', duration: 1500 },
    { text: 'Scanning candidate profile against target position requirements...', duration: 2000 },
    { text: 'Running ATS database keyword audits and match scoring...', duration: 1800 },
    { text: 'Constructing tailored situational technical interview questions...', duration: 2200 },
    { text: 'Formulating 3-Phase training timeline roadmap and capstone blueprints...', duration: 2500 },
  ];

  useEffect(() => {
    // Progress bar increments smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return prev;
        return prev + 1;
      });
    }, 100);

    // Active steps checks tick off one-by-one
    let currentStep = 0;
    const runSteps = () => {
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          currentStep += 1;
          setActiveStep(currentStep);
          runSteps();
        }, steps[currentStep].duration);
      }
    };
    runSteps();

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto py-12 px-4 animate-fade-in">
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl space-y-8 relative overflow-hidden text-center shadow-2xl">
        {/* Glow decoration */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

        {/* Header loader logo */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-ping" />
            <div className="w-16 h-16 rounded-full bg-slate-955 border border-slate-800 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Analysis In Progress
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Evaluating alignment for: <span className="text-indigo-300 font-semibold">{targetRole}</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-450 font-medium">Global AI Pipeline Progress</span>
            <span className="text-indigo-400 font-extrabold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps checklist */}
        <div className="text-left space-y-4 pt-4 border-t border-slate-800/60">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-opacity duration-500 ${
                  isCompleted ? 'opacity-100' : isActive ? 'opacity-100 animate-pulse' : 'opacity-40'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-800 flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    isCompleted ? 'text-slate-300' : isActive ? 'text-indigo-300 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
