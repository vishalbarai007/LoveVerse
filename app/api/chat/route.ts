import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = 'AIzaSyBiCcVcCagFxf7cdvY6w_Vmm8IaNxi_LLM'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `You are LoveBot 💕, a warm, friendly, and helpful relationship assistant for the LoveVerse app. 

Your role is STRICTLY limited to helping with:
- 🎁 Gift ideas and suggestions for partners, anniversaries, birthdays, Valentine's Day, etc.
- 💑 Date plans, romantic outing ideas, creative date nights
- 💌 Relationship advice, communication tips, ways to express love
- 🌹 Surprise ideas, romantic gestures, ways to make someone feel special
- 🎉 Anniversary and celebration planning
- 💕 Love letters, sweet messages, and romantic quotes
- 🍽️ Romantic dinner ideas, recipes for date nights
- 🎶 Playlist suggestions for romantic occasions

IMPORTANT RULES:
1. If someone asks about anything NOT related to relationships, love, gifts, or dating, politely decline and redirect them. Say something like: "I'm LoveBot, your romance expert! 💕 I can only help with things like gift ideas, date plans, and relationship advice. Ask me something lovely! 🌹"
2. Be warm, encouraging, and use occasional emojis tastefully (don't overdo it).
3. Format your responses using Markdown for readability:
   - Use **bold** for emphasis
   - Use bullet points and numbered lists
   - Use ### for section headers when listing multiple items
   - Keep responses concise but helpful
4. Always be positive and supportive about relationships.
5. Suggest creative, thoughtful, and personalized ideas.`

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json()

        // Build conversation history for Gemini
        const contents = messages.map((msg: { sender: string; text: string }) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }))

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                contents,
                generationConfig: {
                    temperature: 0.8,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 1024,
                },
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('Gemini API error:', JSON.stringify(errorData, null, 2))

            // Handle rate limit gracefully
            if (response.status === 429) {
                return NextResponse.json({
                    reply: "⏳ I'm a bit busy right now! The AI service is temporarily rate-limited. Please wait about a minute and try again. 💕",
                })
            }

            return NextResponse.json(
                { error: 'Failed to get response from AI' },
                { status: 500 }
            )
        }

        const data = await response.json()
        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm sorry, I couldn't generate a response right now. Please try again! 💕"

        return NextResponse.json({ reply })
    } catch (error) {
        console.error('Chat API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
