import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisDashboard from './components/AnalysisDashboard';
import DownloadPage from './components/DownloadPage';
import LiveOptimizer from './components/LiveOptimizer';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [view, setView] = useState('analyzer');

  const handleAnalyze = async (file, role) => {
    setLoading(true);
    setError(null);
    setReport(null);
    setExtractedText('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', role);

    try {
      // Connect to our Node/Express backend (uses env variable in production, fallbacks to localhost in development)
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${backendUrl}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setReport(response.data);
      setExtractedText(response.data.extractedText || '');
    } catch (err) {
      console.error('Analysis error:', err);
      const message = err.response?.data?.error || err.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setExtractedText('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-955 flex flex-col font-sans antialiased text-slate-100 pb-16">
      <Header currentView={view} onNavigate={setView} />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {view === 'download' ? (
          <DownloadPage onBack={() => setView('analyzer')} />
        ) : view === 'optimizer' ? (
          <LiveOptimizer 
            report={report} 
            extractedText={extractedText} 
            onBack={() => setView('analyzer')} 
          />
        ) : (
          <>
            {/* Global Error Banner */}
            {error && (
              <div className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Analysis Failed</p>
                  <p className="leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* Dashboard toggle */}
            {report ? (
              <AnalysisDashboard 
                report={report} 
                onReset={handleReset} 
                onOpenOptimizer={() => setView('optimizer')} 
              />
            ) : (
              <FileUpload onAnalyze={handleAnalyze} loading={loading} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
