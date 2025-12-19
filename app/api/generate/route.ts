// app/api/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  console.log("🚀 API called");

  try {
    const { prompt, type } = await request.json();

    // Validate input
    if (!prompt || prompt.length < 3) {
      return NextResponse.json({ error: "Prompt too short" }, { status: 400 });
    }

    console.log("📝 Prompt:", prompt.substring(0, 50) + "...");
    console.log("📊 Type:", type);

    // Determine sheet type
    const sheetType = type === "sheets" ? "Google Sheets" : "Excel";

    // Create enhanced prompt - force JSON output
    const enhancedPrompt = `You are an expert ${sheetType} formula generator.

User request: "${prompt}"

You MUST respond with ONLY a valid JSON object. No other text, no markdown, no code blocks, no explanations outside the JSON.

Response format:
{
  "formula": "=YOUR_FORMULA",
  "explanation": "Clear 1-2 sentence explanation of what this formula does",
  "breakdown": ["Step 1: First part of the formula", "Step 2: Second part", "Step 3: Third part"],
  "example": "Example: If A1=100 and B1=150, this returns 50 (the difference)",
  "alternatives": ["Alternative formula 1", "Alternative formula 2"]
}

Rules:
- Return ONLY the JSON object above, nothing else
- Formula MUST start with = sign
- Formula MUST be valid for ${sheetType}
- Provide 2-4 breakdown steps
- If no alternatives exist, use empty array: []
- Keep all text clear and simple

Generate the JSON now:`;

    console.log("🤖 Calling Gemini 2.5...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.2, // Low temperature for consistent JSON
        maxOutputTokens: 2000,
        responseMimeType: "application/json", // Force JSON response
      },
    });

    const result = await model.generateContent(enhancedPrompt);
    const text = result.response.text();

    console.log("✅ Gemini responded");
    console.log("📝 Response length:", text.length);
    console.log("📝 First 150 chars:", text.substring(0, 150));

    // Clean and parse JSON
    let data;
    try {
      // Remove any potential markdown
      let cleanText = text.trim();

      // Remove markdown code blocks if present
      cleanText = cleanText.replace(/```json\s*/gi, "");
      cleanText = cleanText.replace(/```\s*/g, "");
      cleanText = cleanText.trim();

      // Try to find JSON object
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
        console.log("✅ JSON parsed from regex match");
      } else {
        // Try parsing the whole cleaned text
        data = JSON.parse(cleanText);
        console.log("✅ JSON parsed directly");
      }

      console.log("📊 Formula:", data.formula);
    } catch (parseError: any) {
      console.error("❌ JSON parse failed:", parseError.message);
      console.error("Raw response (first 300 chars):", text.substring(0, 300));

      // Fallback: Create a basic response
      return NextResponse.json({
        formula: '=ERROR("AI response format error")',
        explanation:
          "The AI returned an invalid format. Please try rephrasing your request more clearly.",
        breakdown: [
          "Try being more specific about cell references (e.g., A1, B2)",
          "Clearly state what calculation you need",
          "Example: 'Calculate the sum of cells A1 to A10'",
        ],
        example:
          "Try: 'Add numbers in column A' or 'Calculate percentage from A1 to B1'",
        alternatives: [],
        timestamp: new Date().toISOString(),
      });
    }

    // Validate and normalize response
    const normalizedData = {
      formula: data.formula || '=ERROR("No formula generated")',
      explanation: data.explanation || "No explanation provided",
      breakdown: Array.isArray(data.breakdown)
        ? data.breakdown
        : ["Formula generated successfully"],
      example: data.example || "No example provided",
      alternatives: Array.isArray(data.alternatives) ? data.alternatives : [],
      timestamp: new Date().toISOString(),
    };

    // Ensure formula starts with =
    if (!normalizedData.formula.startsWith("=")) {
      normalizedData.formula = "=" + normalizedData.formula;
    }

    console.log("✅ Success! Formula:", normalizedData.formula);

    return NextResponse.json(normalizedData);
  } catch (error: any) {
    console.error("❌ API Error:", error);
    console.error("Error message:", error.message);

    // Handle specific Gemini errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "API key error. Please check your Gemini API key." },
        { status: 500 }
      );
    }

    if (
      error.message?.includes("quota") ||
      error.message?.includes("rate limit")
    ) {
      return NextResponse.json(
        {
          error: "API rate limit reached. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Failed to generate formula. Please try again with a clearer prompt.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting per IP
const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];

  // Remove old requests (>1 hour)
  const recentRequests = userRequests.filter((time) => now - time < 3600000);

  if (recentRequests.length >= 25) {
    return false; // Rate limited (25 per hour)
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}
