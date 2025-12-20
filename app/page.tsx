// app/page.tsx - Fixed Mobile Responsive
import { FormulaGenerator } from "@/components/FormulaGenerator";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Shield,
  FileSpreadsheet,
} from "lucide-react";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--white)",
        overflow: "hidden",
      }}
    >
      {/* Header - Sticky & Clean */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "72px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--gray-200)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-lg) 0",
              gap: "var(--space-md)",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
                minWidth: 0,
                flex: 1,
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
                <FileSpreadsheet
                  style={{ width: "20px", height: "20px", color: "white" }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Formula Generator
                </div>
                <div style={{ fontSize: "11px", color: "var(--gray-600)" }}>
                  AI-Powered
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="badge badge-green" style={{ flexShrink: 0 }}>
              <Sparkles style={{ width: "12px", height: "12px" }} />
              Free
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "var(--space-4xl) 0 var(--space-5xl)",
          background:
            "linear-gradient(to bottom, var(--white), var(--gray-50))",
        }}
      >
        <div className="container">
          <div
            style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
          >
            {/* Accent */}
            <div
              className="animate-fadeIn"
              style={{
                width: "60px",
                height: "4px",
                background: "var(--green)",
                borderRadius: "var(--radius-full)",
                margin: "0 auto var(--space-2xl)",
              }}
            />

            {/* Heading */}
            <h1
              className="animate-fadeInUp"
              style={{
                fontSize: "clamp(28px, 8vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "var(--space-xl)",
                letterSpacing: "-0.02em",
                padding: "0 var(--space-md)",
              }}
            >
              Generate Excel Formulas
              <br />
              <span style={{ color: "var(--green)" }}>Instantly with AI</span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-fadeInUp"
              style={{
                fontSize: "clamp(15px, 3vw, 17px)",
                lineHeight: 1.7,
                color: "var(--gray-600)",
                maxWidth: "600px",
                margin: "0 auto var(--space-3xl)",
                animationDelay: "100ms",
                padding: "0 var(--space-md)",
              }}
            >
              Describe what you want in plain English and get perfect formulas
              with detailed explanations. No signup required.
            </p>

            {/* Stats */}
            <div
              className="animate-fadeInUp"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-lg)",
                maxWidth: "600px",
                margin: "0 auto",
                animationDelay: "200ms",
                padding: "0 var(--space-md)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    fontWeight: 700,
                    color: "var(--green)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  25
                </div>
                <div
                  style={{
                    fontSize: "clamp(10px, 2vw, 12px)",
                    color: "var(--gray-600)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  Free Daily
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    fontWeight: 700,
                    color: "var(--green)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  2s
                </div>
                <div
                  style={{
                    fontSize: "clamp(10px, 2vw, 12px)",
                    color: "var(--gray-600)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  Avg Time
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    fontWeight: 700,
                    color: "var(--green)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  ∞
                </div>
                <div
                  style={{
                    fontSize: "clamp(10px, 2vw, 12px)",
                    color: "var(--gray-600)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  Free Forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Perfect Grid */}
      <main style={{ padding: "var(--space-3xl) 0 var(--space-5xl)" }}>
        <div className="container">
          <div className="main-grid">
            <FormulaGenerator />
            <ExamplePrompts />
          </div>
        </div>
      </main>

      {/* How It Works */}
      <section
        style={{
          padding: "var(--space-4xl) 0",
          background: "var(--gray-50)",
          borderTop: "1px solid var(--gray-200)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Section Header */}
            <div
              style={{ textAlign: "center", marginBottom: "var(--space-4xl)" }}
            >
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "var(--green)",
                  borderRadius: "var(--radius-full)",
                  margin: "0 auto var(--space-xl)",
                }}
              />
              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 32px)",
                  fontWeight: 700,
                  marginBottom: "var(--space-md)",
                }}
              >
                How It Works
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  color: "var(--gray-600)",
                }}
              >
                Generate perfect formulas in four simple steps
              </p>
            </div>

            {/* Steps Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                gap: "var(--space-xl)",
              }}
            >
              {[
                {
                  num: "1",
                  title: "Describe",
                  desc: "Type what you want in plain English. No technical knowledge needed.",
                },
                {
                  num: "2",
                  title: "Generate",
                  desc: "AI analyzes your request and creates the perfect formula instantly.",
                },
                {
                  num: "3",
                  title: "Copy",
                  desc: "Copy the formula with one click and paste into your spreadsheet.",
                },
                {
                  num: "4",
                  title: "Learn",
                  desc: "Get detailed explanations and step-by-step breakdowns.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="card card-hover"
                  style={{ padding: "var(--space-xl)", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "var(--green)",
                      color: "white",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: 700,
                      margin: "0 auto var(--space-lg)",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--gray-600)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "var(--space-4xl) 0" }}>
        <div className="container">
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                gap: "var(--space-lg)",
              }}
            >
              {[
                {
                  icon: Zap,
                  title: "AI-Powered",
                  desc: "Advanced AI generates accurate formulas instantly",
                },
                {
                  icon: TrendingUp,
                  title: "Learn & Grow",
                  desc: "Detailed explanations help you understand",
                },
                {
                  icon: Sparkles,
                  title: "Always Free",
                  desc: "25 free requests daily, no signup needed",
                },
                {
                  icon: Shield,
                  title: "Both Platforms",
                  desc: "Works with Excel and Google Sheets",
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="card card-hover"
                    style={{ padding: "var(--space-xl)" }}
                  >
                    <Icon
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "var(--green)",
                        marginBottom: "var(--space-md)",
                      }}
                    />
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: "15px",
                        marginBottom: "var(--space-xs)",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--gray-600)",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--gray-200)",
          padding: "var(--space-2xl) 0",
          background: "var(--gray-50)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-lg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--green)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FileSpreadsheet
                  style={{ width: "16px", height: "16px", color: "white" }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Formula Generator
                </div>
                <div style={{ fontSize: "11px", color: "var(--gray-600)" }}>
                  Powered by AI
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--gray-600)",
                whiteSpace: "nowrap",
              }}
            >
              © 2024 • Built with{" "}
              <span style={{ color: "var(--green)" }}>♥</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
