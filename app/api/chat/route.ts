import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// 1. Initialize API with the key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are LoveBot 💕, a warm, friendly, and helpful relationship assistant for the LoveVerse app. 

Your role is STRICTLY limited to helping with:
- 🎁 Gift ideas and suggestions
- 💑 Date plans and romantic outings
- 💌 Relationship advice and love letters
- 🌹 Romantic gestures and surprises

IMPORTANT RULES:
1. If asked about non-romantic topics, politely decline and redirect to love/relationships.
2. Be warm and use emojis tastefully.
3. Format responses with Markdown (bold, lists, headers).
4. Keep responses concise and supportive.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // 2. Select the correct model (gemini-1.5-flash is the current fast/stable version)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT, 
    });

    // 3. Format history for the SDK
    // The SDK expects roles to be 'user' or 'model'
    const history = messages.map((msg: { sender: string; text: string }) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // 4. Start the chat
    const chat = model.startChat({
      history: history.slice(0, -1), // Previous context
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8,
      },
    });

    // 5. Send the last message
    const lastMessage = messages[messages.length - 1].text;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}