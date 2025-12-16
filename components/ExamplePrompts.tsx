// components/ExamplePrompts.tsx
"use client";

import { useState } from "react";
import {
  Lightbulb,
  TrendingUp,
  Calendar,
  FileText,
  Hash,
  Shuffle,
} from "lucide-react";

const EXAMPLE_PROMPTS = [
  {
    text: "Calculate percentage increase between A1 and B1",
    icon: TrendingUp,
    category: "Math",
  },
  {
    text: "VLOOKUP to find employee name from ID",
    icon: FileText,
    category: "Lookup",
  },
  {
    text: 'Sum all values in column C where column A is "Sales"',
    icon: Hash,
    category: "Conditional",
  },
  {
    text: "Get the current date and time",
    icon: Calendar,
    category: "Date",
  },
  {
    text: "Count unique values in a range",
    icon: Hash,
    category: "Count",
  },
  {
    text: "Remove duplicate entries from a list",
    icon: Shuffle,
    category: "Data Cleanup",
  },
  {
    text: "Calculate average excluding zeros",
    icon: TrendingUp,
    category: "Math",
  },
  {
    text: "Combine first and last name with a space",
    icon: FileText,
    category: "Text",
  },
  {
    text: "Check if a cell contains specific text",
    icon: FileText,
    category: "Text",
  },
  {
    text: "Rank values from highest to lowest",
    icon: TrendingUp,
    category: "Ranking",
  },
];

export function ExamplePrompts() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (prompt: string) => {
    // Dispatch custom event that FormulaGenerator can listen to
    window.dispatchEvent(new CustomEvent("selectPrompt", { detail: prompt }));

    // Add haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="space-y-4 animate-slide-in-left">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 border-2 border-purple-100 shadow-soft">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-soft">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Try Examples</h3>
        </div>
        <p className="text-sm text-gray-600">
          Click any example to get started instantly
        </p>
      </div>

      {/* Example List */}
      <div className="space-y-2">
        {EXAMPLE_PROMPTS.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => handleClick(item.text)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full text-left p-4 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-xl text-sm border-2 border-gray-100 hover:border-purple-200 transition-all duration-200 group card-hover shadow-soft"
              style={{
                animationDelay: `${i * 50}ms`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    hoveredIndex === i
                      ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-soft"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      hoveredIndex === i ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium leading-snug group-hover:text-purple-700 transition-colors">
                    {item.text}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-gray-100 group-hover:bg-purple-100 text-xs text-gray-600 group-hover:text-purple-700 rounded-full transition-colors">
                    {item.category}
                  </span>
                </div>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-all duration-200 ${
                    hoveredIndex === i ? "transform translate-x-1" : ""
                  }`}
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
              </div>
            </button>
          );
        })}
      </div>

      {/* Pro Tip Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-soft">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-1">
              Pro Tip
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Be specific about cell references (e.g., "A1", "B2:B10") for more
              accurate formulas
            </p>
          </div>
        </div>
      </div>

      {/* Features Card - Desktop Only */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-soft p-5 border-2 border-gray-100">
        <h3 className="font-bold text-base mb-4 text-gray-900">
          Why use our tool?
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">25 free requests</strong> per
              day
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 leading-relaxed">
              Detailed <strong className="text-gray-900">explanations</strong>{" "}
              included
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 leading-relaxed">
              Works for both{" "}
              <strong className="text-gray-900">Excel & Sheets</strong>
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Learn</strong> as you generate
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">No signup</strong> required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
