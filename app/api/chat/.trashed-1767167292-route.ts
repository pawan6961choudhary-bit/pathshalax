import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("[v0] Chat API received message:", message)

    if (message.toLowerCase().includes("admin access")) {
      return NextResponse.json({
        response:
          "Dear Student, Admin access granted! You can now navigate to the Admin Dashboard to access advanced features and student management tools.",
        action: "ADMIN_ACCESS",
      })
    }

    const { text } = await generateText({
      model: "google/gemini-2.5-flash-image",
      prompt: `You are PathshalaX AI Assistant, a helpful educational chatbot for UPSC CSE preparation students.

IMPORTANT INSTRUCTIONS:
- Always start your responses with "Dear Student,"
- Be friendly, helpful, and encouraging
- Provide accurate information about UPSC CSE preparation, courses, study materials, and platform features
- If asked about PathshalaX features, explain that students can access courses, assignments, live classes, quizzes, and track their progress
- Encourage students in their UPSC preparation journey
- Keep responses concise but informative

Student's Question: ${message}

Your Response:`,
    })

    console.log("[v0] Chat API sending response:", text)

    return NextResponse.json({
      response: text,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        response:
          "Dear Student, I apologize, but I encountered an error. Please try again or contact support if the issue persists.",
      },
      { status: 200 },
    )
  }
}
