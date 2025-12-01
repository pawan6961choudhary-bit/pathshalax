import { ai } from "../genkit-config"
import { z } from "zod"

// Define the chat flow with Genkit
export const chatFlow = ai.defineFlow(
  {
    name: "chatFlow",
    inputSchema: z.object({
      message: z.string(),
    }),
    outputSchema: z.object({
      response: z.string(),
      action: z.string().optional(),
    }),
  },
  async (input) => {
    const { message } = input

    // Check for admin access command
    if (message.toLowerCase().includes("admin access")) {
      return {
        response:
          "Dear Student, Admin access granted! You can now navigate to the Admin Dashboard to access advanced features and student management tools.",
        action: "ADMIN_ACCESS",
      }
    }

    // Generate response using Gemini
    const { text } = await ai.generate({
      model: "googleai/gemini-2.0-flash-exp",
      prompt: `You are PathshalaX, a friendly AI assistant for an educational platform that helps students prepare for UPSC CSE (Civil Services Examination). 

Your role is to:
- Help students with their learning questions
- Provide information about courses, assignments, and platform features
- Give study tips and motivation
- Answer questions about UPSC CSE preparation

IMPORTANT: You MUST always start every response with "Dear Student," followed by your answer.

User message: ${message}

Respond in a helpful, friendly, and encouraging manner. Keep responses concise (2-3 sentences). Remember to always begin with "Dear Student,".`,
    })

    return {
      response: text,
    }
  },
)
