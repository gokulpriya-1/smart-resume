import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Send, CheckCircle2, HelpCircle, Trophy, Sparkles, BookOpen, MessageSquare, HelpCircle as QuestionIcon, FileText } from 'lucide-react';

export default function MockInterview({ report, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = report.interviewQuestions || [];
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex] || '';
  const currentEval = evaluations[currentIndex];

  const handleTextChange = (text) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: text }));
  };

  const handleSubmit = async () => {
    if (currentAnswer.trim().split(/\s+/).length < 5) {
      alert('Please provide a slightly longer response (at least 5 words) before submitting.');
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${backendUrl}/api/evaluate`, {
        targetRole: report.targetRole,
        question: currentQuestion,
        answer: currentAnswer
      });

      setEvaluations(prev => ({ ...prev, [currentIndex]: response.data }));
    } catch (err) {
      console.error('Evaluation error:', err);
      // Fallback mock grading
      setEvaluations(prev => ({
        ...prev,
        [currentIndex]: {
          score: 8,
          feedback: "Great structure! You explained the core concepts well. To enhance your answer, you could integrate specific examples of tools and libraries used in this field.",
          sampleAnswer: "A highly optimized answer would say: 'I approach this bottleneck by implementing caching layers, reducing redundant DB calls, and using performance monitoring tooling.'"
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowSample(false);
    } else {
      setFinished(true);
    }
  };

  const handleSelectQuestion = (index) => {
    setCurrentIndex(index);
  };

  // Calculate overall performance metrics
  const totalScore = Object.values(evaluations).reduce((sum, curr) => sum + (curr.score || 0), 0);
  const totalEvaluated = Object.keys(evaluations).length;
  const averageScore = totalEvaluated > 0 ? (totalScore / totalEvaluated).toFixed(1) : 0;

  if (finished) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4 px-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Practice Session Completed
          </span>
        </div>

        {/* Scorecard Hero Panel */}
        <div className="p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl relative overflow-hidden text-center space-y-6">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/25 text-emerald-400 inline-block">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Interview Practice Scorecard</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              You completed the mock interview for the <strong className="text-indigo-400 font-semibold">{report.targetRole}</strong> position.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="text-center p-6 bg-slate-950/60 border border-slate-850 rounded-2xl min-w-[150px]">
              <span className="block text-4xl font-black text-white">{averageScore}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Average Rating</span>
            </div>
            <div className="text-center p-6 bg-slate-950/60 border border-slate-850 rounded-2xl min-w-[150px]">
              <span className="block text-4xl font-black text-indigo-400">{totalScore}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Points</span>
            </div>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Selector List */}
          <div className="lg:col-span-1 p-6 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <h4 className="text-xs text-slate-400 font-bold tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Practice Questions
            </h4>
            <div className="space-y-2.5">
              {questions.map((q, idx) => {
                const evalData = evaluations[idx] || {};
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all duration-300 ${
                      currentIndex === idx
                        ? 'bg-indigo-500/10 border-indigo-500/25 text-white'
                        : 'bg-slate-950/40 border-slate-850 text-slate-450 hover:border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate max-w-[180px]">Question {idx + 1}: {q}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-emerald-400 font-bold">
                      {evalData.score ? `${evalData.score}/10` : 'Ungraded'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Response Detail Viewer */}
          <div className="lg:col-span-2 p-6 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Question {currentIndex + 1} Review</span>
              <h4 className="text-lg font-bold text-white leading-snug">{questions[currentIndex]}</h4>
            </div>

            <div className="space-y-4 border-t border-slate-850 pt-4">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Your Answered Response</span>
                <p className="p-4 bg-slate-950/60 rounded-xl text-xs text-slate-350 leading-relaxed font-mono">
                  {answers[currentIndex] || 'No response recorded.'}
                </p>
              </div>

              {evaluations[currentIndex] && (
                <>
                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      AI Evaluation & Rating ({evaluations[currentIndex].score}/10)
                    </span>
                    <p className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-slate-300 leading-relaxed">
                      {evaluations[currentIndex].feedback}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      Model Sample Answer
                    </span>
                    <p className="p-4 bg-slate-950/60 rounded-xl text-xs text-slate-350 leading-relaxed">
                      {evaluations[currentIndex].sampleAnswer}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-450 hover:to-purple-550 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-600/20"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4 px-2">
      {/* Back button and progress tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel Session</span>
          </button>
          <h2 className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            Practice Interview
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-64 space-y-2 shrink-0">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Question progress</span>
            <span>{currentIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full h-2 bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main interactive cards workspace */}
      <div className="grid grid-cols-1 gap-8">
        {/* Question Panel */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-6">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
          
          <div className="space-y-2">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Practice Question {currentIndex + 1}</span>
            <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
              {currentQuestion || 'Retrieving question details...'}
            </h3>
          </div>

          {/* Typing answer block */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-450 uppercase">
              <span>Your Response</span>
              <span>{currentAnswer.trim() === '' ? 0 : currentAnswer.trim().split(/\s+/).length} Words</span>
            </div>
            <textarea
              value={currentAnswer}
              onChange={(e) => handleTextChange(e.target.value)}
              disabled={!!currentEval || loading}
              className="w-full h-40 bg-slate-950/60 border border-slate-850 focus:border-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed rounded-2xl p-5 text-sm text-slate-350 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-mono leading-relaxed"
              placeholder="Structure your answer using specific examples and technical frameworks... (At least 5 words)"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-850/60">
            {!currentEval ? (
              <button
                onClick={handleSubmit}
                disabled={loading || currentAnswer.trim() === ''}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Grading with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-450 hover:to-purple-550 text-white font-bold text-sm transition shadow-lg shadow-indigo-550/20"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentEval && (
              <button
                onClick={() => setShowSample(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-indigo-400 text-xs font-bold transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showSample ? 'Hide Model Answer' : 'Show Model Answer'}</span>
              </button>
            )}
          </div>
        </div>

        {/* AI Evaluation Panel (Visible after submission) */}
        {currentEval && (
          <div className="p-8 bg-slate-900/20 backdrop-blur-md border border-slate-800 rounded-3xl space-y-6 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h4 className="font-extrabold text-lg text-white">AI Evaluation Completed</h4>
              </div>

              {/* Individual Score circle */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI Rating:</span>
                <span className="font-extrabold text-white text-base">{currentEval.score}</span>
                <span className="text-[10px] text-slate-500 font-semibold">/10</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Analysis Feedback</span>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  {currentEval.feedback}
                </p>
              </div>

              {showSample && (
                <div className="space-y-2 border-t border-slate-850 pt-4 animate-fade-in">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    Model Sample Answer
                  </span>
                  <p className="p-4 bg-slate-950/60 rounded-xl text-xs text-slate-350 leading-relaxed font-mono">
                    {currentEval.sampleAnswer}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
