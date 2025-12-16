"use client";

import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";

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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setResult(data);

      // Save to localStorage
      const history = JSON.parse(
        localStorage.getItem("formula-history") || "[]"
      );
      history.unshift({ prompt, ...data });
      localStorage.setItem(
        "formula-history",
        JSON.stringify(history.slice(0, 50))
      );
    } catch (err) {
      setError("Failed to generate formula. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyFormula = () => {
    if (result) {
      navigator.clipboard.writeText(result.formula);
      // TODO: Add toast notification
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setType("excel")}
            className={`px-4 py-2 rounded ${
              type === "excel" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Excel
          </button>
          <button
            onClick={() => setType("sheets")}
            className={`px-4 py-2 rounded ${
              type === "sheets" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Google Sheets
          </button>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to do... (e.g., 'Calculate the percentage increase between two cells')"
          className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating...
            </>
          ) : (
            "Generate Formula"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4 border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Formula</h2>
            <button
              onClick={copyFormula}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded font-mono text-lg">
            {result.formula}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Explanation</h3>
            <p className="text-gray-700">{result.explanation}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <ol className="list-decimal list-inside space-y-1">
              {result.breakdown.map((step, i) => (
                <li key={i} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Example</h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded">
              {result.example}
            </p>
          </div>

          {result.alternatives.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Alternatives</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.alternatives.map((alt, i) => (
                  <li key={i} className="text-gray-700">
                    {alt}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
