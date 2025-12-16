// components/FormulaGenerator.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Loader2,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Info,
} from "lucide-react";

interface FormulaResult {
  formula: string;
  explanation: string;
  breakdown: string[];
  example: string;
  alternatives: string[];
  timestamp: string;
}

export function FormulaGenerator() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState<"excel" | "sheets">("excel");
  const [result, setResult] = useState<FormulaResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  // Listen for example prompt selections
  useEffect(() => {
    const handleSelectPrompt = (e: Event) => {
      const customEvent = e as CustomEvent;
      setPrompt(customEvent.detail);

      // Auto-scroll to textarea on mobile
      setTimeout(() => {
        const textarea = document.querySelector("textarea");
        if (textarea && window.innerWidth < 1024) {
          textarea.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          textarea.focus();
        }
      }, 100);
    };

    window.addEventListener("selectPrompt", handleSelectPrompt);
    return () => window.removeEventListener("selectPrompt", handleSelectPrompt);
  }, []);

  // Load history on mount
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("formula-history") || "[]"
      );
      setHistory(savedHistory.slice(0, 10)); // Show last 10
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Generation failed");
      }

      const data = await response.json();
      setResult(data);

      // Save to localStorage
      try {
        const history = JSON.parse(
          localStorage.getItem("formula-history") || "[]"
        );
        history.unshift({ prompt, type, ...data });
        localStorage.setItem(
          "formula-history",
          JSON.stringify(history.slice(0, 50))
        );
      } catch (e) {
        console.error("Failed to save to history:", e);
      }

      // Smooth scroll to result on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.querySelector(".result-container")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate formula. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyFormula = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.formula);
      setCopied(true);

      // Show toast notification
      showToast("Formula copied to clipboard!", "success");

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast("Failed to copy. Please try again.", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    const toast = document.createElement("div");
    toast.className = `toast ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`;
    toast.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        ${
          type === "success"
            ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />'
            : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />'
        }
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const loadFromHistory = (item: any) => {
    setPrompt(item.prompt);
    setType(item.type);
    setResult(item);
    setShowHistory(false);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 p-4 sm:p-6 space-y-4 border border-gray-100">
        {/* Sheet Type Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setType("excel")}
            className={`flex-1 px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              type === "excel"
                ? "bg-white text-blue-600 shadow-soft"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 2v6h6M10 9H8v6h2v-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z" />
              </svg>
              <span className="hidden sm:inline">Excel</span>
              <span className="sm:hidden">Excel</span>
            </span>
          </button>
          <button
            onClick={() => setType("sheets")}
            className={`flex-1 px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              type === "sheets"
                ? "bg-white text-green-600 shadow-soft"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                <path d="M7 12h2v5H7zm4-5h2v10h-2zm4 3h2v7h-2z" />
              </svg>
              <span className="hidden sm:inline">Google Sheets</span>
              <span className="sm:hidden">Sheets</span>
            </span>
          </button>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            What do you want to do?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Example: Calculate the percentage increase between cell A1 and B1&#10;&#10;💡 Tip: Click an example from the sidebar or describe your task in plain English"
            className="w-full h-32 sm:h-36 p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-sm sm:text-base"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span className="hidden sm:inline">
                Press Cmd/Ctrl + Enter to generate
              </span>
              <span className="sm:hidden">Cmd/Ctrl + Enter to generate</span>
            </p>
            <p className="text-xs text-gray-400">{prompt.length} characters</p>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-3.5 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold shadow-medium hover:shadow-large transition-all duration-200 btn-press text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Generating your formula...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Formula</span>
            </>
          )}
        </button>

        {/* History Toggle (Mobile) */}
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full sm:hidden flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>View History ({history.length})</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showHistory ? "rotate-180" : ""
              }`}
            />
          </button>
        )}

        {/* History Dropdown (Mobile) */}
        {showHistory && history.length > 0 && (
          <div className="sm:hidden space-y-2 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Recent Formulas
            </h4>
            {history.slice(0, 5).map((item, i) => (
              <button
                key={i}
                onClick={() => loadFromHistory(item)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs border border-gray-200 transition-colors"
              >
                <div className="font-medium text-gray-900 line-clamp-1">
                  {item.prompt}
                </div>
                <div className="text-gray-500 mt-1 font-mono text-xs line-clamp-1">
                  {item.formula}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 shadow-soft animate-fade-in">
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <p className="font-semibold text-sm">Oops! Something went wrong</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="result-container space-y-4 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-large p-4 sm:p-6 border-2 border-purple-100 animate-fade-in">
          {/* Header with Copy Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-purple-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Your Formula
            </h2>
            <button
              onClick={copyFormula}
              disabled={copied}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 shadow-soft hover:shadow-medium btn-press ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Copy Formula</span>
                </>
              )}
            </button>
          </div>

          {/* Formula Display */}
          <div className="relative group">
            <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 p-1 rounded-xl">
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="font-mono text-base sm:text-lg lg:text-xl text-gray-900 break-all leading-relaxed code-block">
                  {result.formula}
                </div>
              </div>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-100 shadow-soft">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-xl">💡</span>
              What it does
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {result.explanation}
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-100 shadow-soft">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-gray-900 flex items-center gap-2">
              <span className="text-xl">🔍</span>
              How it works
            </h3>
            <ol className="space-y-3">
              {result.breakdown.map((step, i) => (
                <li key={i} className="flex gap-3 sm:gap-4 group">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-soft group-hover:shadow-medium transition-shadow">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-gray-700 flex-1 pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Example */}
          <div className="bg-blue-50 rounded-xl p-4 sm:p-5 border-2 border-blue-200">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Example usage
            </h3>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
              {result.example}
            </div>
          </div>

          {/* Alternatives */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 sm:p-5 border-2 border-green-200">
              <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Alternative approaches
              </h3>
              <ul className="space-y-2">
                {result.alternatives.map((alt, i) => (
                  <li key={i} className="flex gap-3 group">
                    <svg
                      className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">
                      {alt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-purple-100">
            <button
              onClick={() => {
                setPrompt("");
                setResult(null);
                setError("");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(
                  () => document.querySelector("textarea")?.focus(),
                  300
                );
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-soft hover:shadow-medium btn-press text-sm sm:text-base"
            >
              Generate Another Formula
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 rounded-2xl p-8 sm:p-12 text-center border-2 border-dashed border-purple-200 animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-medium animate-pulse-subtle">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Ready to create your formula
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Describe what you want to do in plain English, or click an example
              to get started instantly
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
