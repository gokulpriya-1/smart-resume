import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Calendar, Award, Trash2, Eye, AlertTriangle, RefreshCw, FileText } from 'lucide-react';

export default function HistoryDashboard({ onBack, onLoadReport }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports from MongoDB on mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${backendUrl}/api/reports`);
      setReports(response.data);
    } catch (err) {
      console.error('Error fetching reports history:', err);
      setError(err.response?.data?.error || err.message || 'Failed to retrieve reports from the database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report from the database history?')) {
      return;
    }
    
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${backendUrl}/api/reports/${id}`);
      setReports(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Error deleting report:', err);
      alert('Failed to delete report. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in py-4 px-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <h2 className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            Saved Reports History
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            View, reload, or manage all historical resume analysis files saved to your database.
          </p>
        </div>

        <button
          onClick={fetchReports}
          className="flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white transition"
          title="Refresh History"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Panel Content */}
      {loading ? (
        <div className="p-16 text-center space-y-4">
          <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-450">Loading historical records from MongoDB Atlas...</p>
        </div>
      ) : error ? (
        <div className="p-8 max-w-xl mx-auto bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center rounded-3xl space-y-4">
          <AlertTriangle className="w-12 h-12 mx-auto text-rose-450" />
          <div>
            <h3 className="font-bold text-white">Database Fetch Failed</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{error}</p>
          </div>
          <button
            onClick={fetchReports}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition"
          >
            Retry Connection
          </button>
        </div>
      ) : reports.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/20 border border-slate-850 rounded-3xl space-y-4 max-w-xl mx-auto">
          <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-slate-500 inline-block">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg">No Reports Found</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              You haven't analyzed any resumes yet, or your database is empty. Upload a resume to get started!
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition"
          >
            Analyze Resume Now
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] uppercase font-black tracking-wider text-slate-400 select-none">
                  <th className="px-6 py-4">Target Job Role</th>
                  <th className="px-6 py-4">Analysis Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">ATS Score</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
                {reports.map((report) => (
                  <tr key={report._id} className="hover:bg-slate-900/30 transition duration-150">
                    <td className="px-6 py-4 font-bold text-white">
                      {report.targetRole}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(report.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {report.isQualified === false ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Not Matched
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Qualified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Award className={`w-4 h-4 ${
                          report.atsScore >= 80 ? 'text-emerald-400' : report.atsScore >= 60 ? 'text-indigo-400' : 'text-rose-400'
                        }`} />
                        <span className="font-extrabold text-white text-base">{report.atsScore}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onLoadReport(report)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 text-xs font-bold transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-900 hover:text-rose-400 text-slate-450 transition"
                          title="Delete Report"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
