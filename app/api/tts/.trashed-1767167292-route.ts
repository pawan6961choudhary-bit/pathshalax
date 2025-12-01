import { type NextRequest, NextResponse } from "next/server"
import { textToSpeechFlow } from "@/lib/flows/tts-flow"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Run the TTS flow
    const result = await textToSpeechFlow({ text })

    return NextResponse.json({
      audioUrl: result.audioDataUri,
    })
  } catch (error) {
    console.error("TTS API error:", error)
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 })
  }
}
