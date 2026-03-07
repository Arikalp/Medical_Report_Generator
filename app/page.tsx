'use client';

import { useState } from 'react';
import Image from 'next/image';
import { generatePDF } from '@/lib/pdf-generator';

export default function Home() {
  const [patientName, setPatientName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('image', file));
      formData.append('patientInfo', patientName || 'Anonymous');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
      setPatientInfo(data.patientInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!analysis) return;

    const pdfBlob = generatePDF({
      reportText: analysis,
      patientInfo: patientInfo || 'Anonymous',
    });

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    a.download = `Medical_Report_${timestamp}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <br key={index} />;
      }

      // Bold headers
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const headerText = trimmed.replace(/\*\*/g, '');
        return (
          <h3 key={index} className="text-lg font-bold text-blue-400 mt-4 mb-2 border-b border-blue-400 pb-1">
            {headerText}
          </h3>
        );
      }

      // Horizontal line
      if (trimmed === '---') {
        return <hr key={index} className="my-4 border-gray-600" />;
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-2 text-gray-300 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            🩺 AI Medical Report Analyzer
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Upload a medical image to receive an AI-powered analysis. For educational and informational use only.
          </p>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        {/* Input Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 mb-6">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Enter Patient Name or ID (Optional)
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g., John Doe, Patient #12345"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Choose medical images...
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/bmp,image/gif"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-dashed border-blue-500 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={selectedFiles.length === 0 || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing image... This may take a moment.
              </span>
            ) : (
              'Generate Analysis Report'
            )}
          </button>

          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {!selectedFiles.length && !isAnalyzing && !error && (
            <div className="mt-4 bg-yellow-900/30 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-lg text-sm">
              Please upload at least one image file before generating the analysis.
            </div>
          )}
        </div>

        {/* Results Section */}
        {analysis && (
          <>
            <div className="border-t border-gray-700 my-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Uploaded Medical Images</h2>
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          src={url}
                          alt={`Patient Scan ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">AI-Generated Analysis</h2>
                <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-gray-300">
                    {renderMarkdown(analysis)}
                  </div>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  📄 Download Full Report (PDF)
                </button>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Developed by <strong className="text-white">Sankalp</strong> | This is a demonstration tool and not for clinical use.
          </p>
        </div>
      </div>
    </main>
  );
}
