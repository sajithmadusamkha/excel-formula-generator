// components/FormulaGenerator.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Loader2,
  CheckCircle,
  Sparkles,
  Zap,
  ArrowRight,
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
  const [charCount, setCharCount] = useState(0);
  const [focusedInput, setFocusedInput] = useState(false);

  useEffect(() => {
    const handleSelectPrompt = (e: Event) => {
      const customEvent = e as CustomEvent;
      setPrompt(customEvent.detail);
      setCharCount(customEvent.detail.length);
      setTimeout(() => {
        const textarea = document.querySelector("textarea");
        textarea?.focus();
        if (window.innerWidth < 768) {
          textarea?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    window.addEventListener("selectPrompt", handleSelectPrompt);
    return () => window.removeEventListener("selectPrompt", handleSelectPrompt);
  }, []);

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

      // Save to history
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
        console.error("Failed to save:", e);
      }

      // Scroll to result on mobile
      setTimeout(() => {
        if (window.innerWidth < 768) {
          document.querySelector(".result-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate formula"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyFormula = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.formula);
      setCopied(true);
      showToast("Formula copied!", "success");

      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast("Failed to copy", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "toast-success" : ""}`;
    toast.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        ${
          type === "success"
            ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
            : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>'
        }
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setPrompt(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="space-y-xl animate-fadeInUp">
      {/* Input Card */}
      <div className="card">
        {/* Type Toggle */}
        <div
          style={{
            padding: "var(--space-lg)",
            borderBottom: "1px solid var(--gray-200)",
            display: "flex",
            gap: "var(--space-sm)",
          }}
        >
          <button
            onClick={() => setType("excel")}
            className={`btn ${type === "excel" ? "btn-primary" : "btn-ghost"}`}
            style={{ flex: 1 }}
          >
            <svg
              style={{ width: "16px", height: "16px" }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            </svg>
            Excel
          </button>
          <button
            onClick={() => setType("sheets")}
            className={`btn ${type === "sheets" ? "btn-primary" : "btn-ghost"}`}
            style={{ flex: 1 }}
          >
            <svg
              style={{ width: "16px", height: "16px" }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            Sheets
          </button>
        </div>

        {/* Input Section */}
        <div style={{ padding: "var(--space-2xl)" }} className="space-y-xl">
          <div className="space-y-md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--gray-600)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Describe Your Formula
              </label>
              <span
                style={{
                  fontSize: "12px",
                  color: charCount > 450 ? "var(--green)" : "var(--gray-400)",
                  fontWeight: 600,
                }}
              >
                {charCount}/500
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyPress}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              placeholder="Example: Calculate percentage increase from A1 to B1..."
              className="input"
              rows={4}
              disabled={loading}
              style={{
                resize: "vertical",
                minHeight: "100px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                fontSize: "12px",
                color: "var(--gray-500)",
              }}
            >
              <Info style={{ width: "14px", height: "14px" }} />
              <span>
                Press{" "}
                <kbd
                  style={{
                    padding: "2px 6px",
                    background: "var(--gray-100)",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                  }}
                >
                  ⌘↵
                </kbd>{" "}
                to generate
              </span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "var(--space-lg) var(--space-xl)",
            }}
          >
            {loading ? (
              <>
                <Loader2
                  style={{ width: "18px", height: "18px" }}
                  className="animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Zap style={{ width: "18px", height: "18px" }} />
                Generate Formula
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="card animate-scaleIn"
          style={{
            padding: "var(--space-xl)",
            borderColor: "#dc2626",
            background: "#fef2f2",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              alignItems: "flex-start",
            }}
          >
            <svg
              style={{
                width: "20px",
                height: "20px",
                color: "#dc2626",
                flexShrink: 0,
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: "#991b1b",
                  marginBottom: "4px",
                }}
              >
                Error
              </div>
              <div style={{ fontSize: "14px", color: "#991b1b" }}>{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="result-section space-y-xl animate-fadeInUp">
          {/* Formula Display */}
          <div className="card">
            <div
              style={{
                padding: "var(--space-xl)",
                borderBottom: "1px solid var(--gray-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "var(--space-md)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                }}
              >
                <CheckCircle
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "var(--green)",
                  }}
                />
                <span style={{ fontWeight: 600, fontSize: "15px" }}>
                  Your Formula
                </span>
              </div>
              <button
                onClick={copyFormula}
                className={`btn ${copied ? "btn-primary" : "btn-secondary"}`}
              >
                {copied ? (
                  <>
                    <CheckCircle style={{ width: "16px", height: "16px" }} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy style={{ width: "16px", height: "16px" }} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div style={{ padding: "var(--space-2xl)" }}>
              <div
                className="card"
                style={{
                  padding: "var(--space-xl)",
                  background: "var(--gray-50)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  wordBreak: "break-all",
                  borderColor: "var(--green-subtle)",
                }}
              >
                {result.formula}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div
            className="card accent-bar"
            style={{ padding: "var(--space-2xl)" }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--gray-600)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-md)",
              }}
            >
              Explanation
            </div>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--gray-700)",
              }}
            >
              {result.explanation}
            </p>
          </div>

          {/* Breakdown */}
          <div className="card" style={{ padding: "var(--space-2xl)" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--gray-600)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-xl)",
              }}
            >
              Step-by-Step Breakdown
            </div>
            <div className="space-y-lg">
              {result.breakdown.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "var(--space-lg)",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="number-badge" style={{ flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--gray-700)",
                      paddingTop: "4px",
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div
            className="card"
            style={{
              padding: "var(--space-2xl)",
              background: "var(--green-subtle)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--green-dark)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-md)",
              }}
            >
              Example Usage
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "var(--gray-700)",
              }}
            >
              {result.example}
            </p>
          </div>

          {/* Alternatives */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="card" style={{ padding: "var(--space-2xl)" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--gray-600)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--space-xl)",
                }}
              >
                Alternative Approaches
              </div>
              <div className="space-y-md">
                {result.alternatives.map((alt, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "var(--space-md)",
                      alignItems: "flex-start",
                    }}
                  >
                    <ArrowRight
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "var(--green)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "var(--gray-700)",
                      }}
                    >
                      {alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Formula Button */}
          <button
            onClick={() => {
              setPrompt("");
              setResult(null);
              setError("");
              setCharCount(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(
                () => document.querySelector("textarea")?.focus(),
                300
              );
            }}
            className="btn btn-secondary hover-lift"
            style={{ width: "100%", padding: "var(--space-lg)" }}
          >
            <Sparkles style={{ width: "18px", height: "18px" }} />
            Generate Another Formula
          </button>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-5xl) var(--space-xl)",
          }}
          className="animate-fadeIn"
        >
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "var(--green)",
              margin: "0 auto var(--space-xl)",
              borderRadius: "var(--radius-full)",
            }}
          />
          <Sparkles
            style={{
              width: "40px",
              height: "40px",
              color: "var(--gray-400)",
              margin: "0 auto var(--space-lg)",
            }}
          />
          <p style={{ fontSize: "14px", color: "var(--gray-500)" }}>
            Enter a description to generate your formula
          </p>
        </div>
      )}
    </div>
  );
}
