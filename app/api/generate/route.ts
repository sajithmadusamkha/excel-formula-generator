import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { prompt, type } = await request.json();

    // Validate input
    if (!prompt || prompt.length < 3) {
      return NextResponse.json({ error: "Prompt too short" }, { status: 400 });
    }

    // Determine sheet type
    const sheetType = type === "sheets" ? "Google Sheets" : "Excel";

    // Create enhanced prompt
    const enhancedPrompt = `
You are an expert ${sheetType} formula generator.

User request: "${prompt}"

Generate a response with:
1. The exact formula (wrapped in backticks)
2. A clear explanation of what it does
3. Step-by-step breakdown
4. Example usage
5. Common variations or alternatives

Format your response as JSON:
{
  "formula": "=FORMULA_HERE",
  "explanation": "Brief explanation",
  "breakdown": ["Step 1", "Step 2", ...],
  "example": "Example with sample data",
  "alternatives": ["Alternative formula 1", ...]
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.3, // Lower = more consistent
        maxOutputTokens: 1000,
      },
    });

    const result = await model.generateContent(enhancedPrompt);
    const text = result.response.text();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate formula" },
      { status: 500 }
    );
  }
}

// Rate limiting (optional but recommended)
const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];

  // Remove old requests (>1 hour)
  const recentRequests = userRequests.filter((time) => now - time < 3600000);

  if (recentRequests.length >= 10) {
    return false; // Rate limited
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}
