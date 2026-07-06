import React, { useState, useRef } from 'react';
import { Upload, FileText, ChevronRight, Briefcase } from 'lucide-react';

export default function FileUpload({ onAnalyze, loading }) {
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file only!");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role.trim()) {
      alert("Please enter a Target Job Role");
      return;
    }
    if (!file) {
      alert("Please upload a Resume PDF file");
      return;
    }
    onAnalyze(file, role);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      <h2 className="text-2xl font-bold text-center text-white mb-2">Upload Resume</h2>
      <p className="text-slate-400 text-sm text-center mb-8">
        Enter your target role and upload your PDF resume to receive a comprehensive ATS evaluation and personalized interview preparation questions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Role Input */}
        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Target Job Role
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Frontend Engineer, Fullstack Developer..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition disabled:opacity-50"
            />
          </div>
        </div>

        {/* Drag & Drop File Container */}
        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Resume PDF File
          </label>
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${
              dragActive
                ? "border-indigo-400 bg-indigo-500/5"
                : file
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-slate-800 hover:border-slate-700 bg-slate-950/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
              disabled={loading}
            />

            {file ? (
              <div className="text-center space-y-2">
                <div className="p-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 inline-block">
                  <FileText className="w-8 h-8" />
                </div>
                <p className="text-emerald-400 font-medium text-sm">{file.name}</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p className="text-xs text-slate-400 mt-2">Click or drag new file to replace</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="p-3 bg-slate-900 rounded-full text-slate-400 inline-block border border-slate-800">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="text-slate-300 font-medium text-sm">Drag and drop your file here</p>
                <p className="text-xs text-slate-500">Supports PDF format up to 5MB</p>
                <button
                  type="button"
                  className="mt-3 px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file || !role.trim()}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Resume...</span>
            </div>
          ) : (
            <>
              <span>Start Analysis</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
