// app/page.tsx
import { FormulaGenerator } from "@/components/FormulaGenerator";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import { Sparkles, Zap, Shield, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-medium">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Excel Formula Generator
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  AI-powered formulas in seconds ⚡
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full shadow-soft">
                <Shield className="w-3 h-3" />
                100% Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full shadow-soft">
                <Zap className="w-3 h-3" />
                No Signup
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar - Examples (Hidden on mobile, shown as dropdown) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <ExamplePrompts />
            </div>
          </aside>

          {/* Main Column - Formula Generator */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Mobile Example Prompts */}
            <div className="lg:hidden mb-6">
              <ExamplePrompts />
            </div>

            {/* Formula Generator */}
            <FormulaGenerator />
          </div>
        </div>

        {/* How It Works Section */}
        <section className="mt-12 sm:mt-16 lg:mt-20 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-large p-6 sm:p-8 lg:p-12 border-2 border-gray-100">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                How It Works
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Generate Excel and Google Sheets formulas in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-110">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-soft">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                  Describe Your Task
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Tell us what you want to do in plain English. No formula
                  knowledge needed!
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-110">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-soft">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                  AI Creates Formula
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our AI generates the perfect formula and explains every step
                  clearly.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-110">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-soft">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        3
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                  Copy & Learn
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Copy to your spreadsheet and understand how it works with our
                  explanation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-12 sm:mt-16 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border-2 border-gray-100 card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
                AI-Powered
              </h3>
              <p className="text-sm text-gray-600">
                Advanced AI generates accurate formulas instantly
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border-2 border-gray-100 card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600">
                Get your formula in seconds, not minutes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border-2 border-gray-100 card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
                Always Free
              </h3>
              <p className="text-sm text-gray-600">
                25 formulas per day, forever free
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border-2 border-gray-100 card-hover">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
                Learn & Grow
              </h3>
              <p className="text-sm text-gray-600">
                Understand formulas with detailed explanations
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 bg-white/50 backdrop-blur-sm mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Excel Formula Generator
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              © 2025 Excel Formula Generator. Free forever, no signup required.
            </p>
            <p className="text-xs text-gray-500">
              Built with <Heart className="w-3 h-3 inline text-pink-500" />{" "}
              using Next.js and Google Gemini AI
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
