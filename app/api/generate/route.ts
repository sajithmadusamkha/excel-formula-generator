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

    console.log("📝 Prompt:", prompt);
    console.log("📊 Type:", type);

    // Determine sheet type
    const sheetType = type === "sheets" ? "Google Sheets" : "Excel";

    // Create enhanced prompt - force JSON output
    const enhancedPrompt = `You are an expert ${sheetType} formula generator.

User request: "${prompt}"

You MUST respond with ONLY a valid JSON object. No other text, no markdown, no code blocks.

Response format:
{
  "formula": "=YOUR_FORMULA",
  "explanation": "Clear 1-2 sentence explanation",
  "breakdown": ["Step 1: explanation", "Step 2: explanation", "Step 3: explanation"],
  "example": "Example: If A1=100 and B1=150, the result is 50",
  "alternatives": ["Alternative 1", "Alternative 2"]
}

Rules:
- Return ONLY the JSON object above
- Formula must start with =
- If no alternatives exist, use empty array []
- No extra text outside the JSON
- No markdown formatting

Generate the JSON now:`;

    console.log("🤖 Calling Gemini...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using stable model
      generationConfig: {
        temperature: 0.2, // Lower for more consistent JSON
        maxOutputTokens: 1500,
        responseMimeType: "application/json", // Force JSON response
      },
    });

    const result = await model.generateContent(enhancedPrompt);
    const text = result.response.text();

    console.log("✅ Gemini responded");
    console.log("📝 Response length:", text.length);
    console.log("📝 First 200 chars:", text.substring(0, 200));

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
        console.log("✅ JSON parsed from match");
      } else {
        // Try parsing the whole cleaned text
        data = JSON.parse(cleanText);
        console.log("✅ JSON parsed directly");
      }

      console.log("📊 Formula:", data.formula);
    } catch (parseError) {
      console.error("❌ JSON parse failed:", parseError);
      console.error("Raw text:", text);

      // Fallback: Create a basic response
      return NextResponse.json({
        formula: "=ERROR",
        explanation:
          "Failed to parse AI response. Please try again with a clearer prompt.",
        breakdown: [
          "The AI returned an invalid format",
          "Try rephrasing your request",
          "Be more specific about what you want",
        ],
        example: "Example: 'Calculate sum of A1 to A10'",
        alternatives: [],
        timestamp: new Date().toISOString(),
      });
    }

    // Validate required fields
    if (!data.formula) {
      data.formula = "=ERROR";
    }
    if (!data.explanation) {
      data.explanation = "No explanation provided";
    }
    if (!Array.isArray(data.breakdown)) {
      data.breakdown = ["Formula generated successfully"];
    }
    if (!data.example) {
      data.example = "No example provided";
    }
    if (!Array.isArray(data.alternatives)) {
      data.alternatives = [];
    }

    console.log("✅ Success!");

    return NextResponse.json({
      formula: data.formula,
      explanation: data.explanation,
      breakdown: data.breakdown,
      example: data.example,
      alternatives: data.alternatives,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("❌ API Error:", error);
    console.error("Error message:", error.message);

    return NextResponse.json(
      {
        error: "Failed to generate formula. Please try again.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
