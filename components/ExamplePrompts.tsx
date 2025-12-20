// components/ExamplePrompts.tsx
"use client";

import { useState } from "react";
import {
  TrendingUp,
  Calculator,
  Calendar,
  Search,
  DollarSign,
  BarChart3,
  FileText,
  Filter,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const examples = [
  {
    title: "Percentage Growth",
    prompt: "Calculate percentage increase between A1 and B1",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Sum Values",
    prompt: "Sum all values in column A from row 1 to 10",
    icon: Calculator,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Conditional Logic",
    prompt: "If A1 is greater than 100, show 'High', otherwise 'Low'",
    icon: Filter,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Date Calculation",
    prompt: "Calculate number of days between two dates in A1 and B1",
    icon: Calendar,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "VLOOKUP Search",
    prompt: "Look up employee name from ID in A1 using data in D:E",
    icon: Search,
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "Currency Format",
    prompt: "Convert number in A1 to currency format with 2 decimals",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Average Values",
    prompt: "Calculate average of values in range B2:B20, ignoring errors",
    icon: BarChart3,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Extract Text",
    prompt: "Extract first name from full name in A1",
    icon: FileText,
    gradient: "from-pink-500 to-fuchsia-500",
  },
];

export function ExamplePrompts() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (prompt: string) => {
    window.dispatchEvent(new CustomEvent("selectPrompt", { detail: prompt }));

    if ("vibrate" in navigator) {
      navigator.vibrate(30);
    }

    if (window.innerWidth < 1024) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div
      className="space-y-xl animate-fadeInUp"
      style={{ animationDelay: "100ms" }}
    >
      {/* Header Card */}
      <div className="card" style={{ padding: "var(--space-2xl)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
            marginBottom: "var(--space-md)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--green)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Lightbulb
              style={{ width: "20px", height: "20px", color: "white" }}
            />
          </div>
          <div>
            <h2
              style={{ fontWeight: 600, fontSize: "17px", marginBottom: "2px" }}
            >
              Quick Start
            </h2>
            <p style={{ fontSize: "13px", color: "var(--gray-600)" }}>
              Click any example to begin
            </p>
          </div>
        </div>
      </div>

      {/* Examples List */}
      <div className="space-y-sm">
        {examples.map((example, index) => {
          const Icon = example.icon;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={index}
              onClick={() => handleSelect(example.prompt)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="card card-interactive"
              style={{
                width: "100%",
                textAlign: "left",
                padding: "var(--space-lg)",
                animationDelay: `${index * 40}ms`,
                transition: "all var(--duration-normal) var(--ease-out)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-md)",
                    background: isHovered ? "var(--green)" : "var(--gray-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all var(--duration-normal) var(--ease-out)",
                  }}
                >
                  <Icon
                    style={{
                      width: "18px",
                      height: "18px",
                      color: isHovered ? "white" : "var(--gray-600)",
                      transition: "color var(--duration-fast) var(--ease-out)",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      marginBottom: "2px",
                      color: isHovered ? "var(--green)" : "var(--gray-900)",
                      transition: "color var(--duration-fast) var(--ease-out)",
                    }}
                  >
                    {example.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--gray-600)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {example.prompt}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  style={{
                    width: "16px",
                    height: "16px",
                    color: isHovered ? "var(--green)" : "var(--gray-400)",
                    flexShrink: 0,
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "all var(--duration-normal) var(--ease-out)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Tips Card */}
      <div
        className="card"
        style={{
          padding: "var(--space-xl)",
          background: "var(--green-subtle)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-md)",
          }}
        >
          <Sparkles
            style={{
              width: "20px",
              height: "20px",
              color: "var(--green)",
              flexShrink: 0,
              marginTop: "2px",
            }}
          />
          <div>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "var(--space-sm)",
                color: "var(--green-dark)",
              }}
            >
              Pro Tips
            </h3>
            <ul
              className="space-y-xs"
              style={{ fontSize: "13px", color: "var(--gray-700)" }}
            >
              <li style={{ display: "flex", gap: "var(--space-xs)" }}>
                <span className="accent-dot" style={{ marginTop: "7px" }} />
                <span>Be specific about cell references</span>
              </li>
              <li style={{ display: "flex", gap: "var(--space-xs)" }}>
                <span className="accent-dot" style={{ marginTop: "7px" }} />
                <span>Mention your data types</span>
              </li>
              <li style={{ display: "flex", gap: "var(--space-xs)" }}>
                <span className="accent-dot" style={{ marginTop: "7px" }} />
                <span>Describe expected output clearly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Card - Desktop Only */}
      <div
        className="card hidden lg:block"
        style={{ padding: "var(--space-xl)" }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--green)",
              marginBottom: "var(--space-xs)",
            }}
          >
            25
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--gray-600)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            Free Daily Requests
          </div>
        </div>
      </div>
    </div>
  );
}
