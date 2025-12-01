import { ai } from "../genkit-config"
import { z } from "zod"

// Helper function to convert PCM to WAV format
function pcmToWav(pcmData: Buffer, sampleRate = 24000): Buffer {
  const numChannels = 1
  const bitsPerSample = 16
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8)
  const blockAlign = numChannels * (bitsPerSample / 8)
  const dataSize = pcmData.length
  const fileSize = 36 + dataSize

  const header = Buffer.alloc(44)

  // RIFF header
  header.write("RIFF", 0)
  header.writeUInt32LE(fileSize, 4)
  header.write("WAVE", 8)

  // fmt chunk
  header.write("fmt ", 12)
  header.writeUInt32LE(16, 16) // fmt chunk size
  header.writeUInt16LE(1, 20) // audio format (1 = PCM)
  header.writeUInt16LE(numChannels, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(byteRate, 28)
  header.writeUInt16LE(blockAlign, 32)
  header.writeUInt16LE(bitsPerSample, 34)

  // data chunk
  header.write("data", 36)
  header.writeUInt32LE(dataSize, 40)

  return Buffer.concat([header, pcmData])
}

export const textToSpeechFlow = ai.defineFlow(
  {
    name: "textToSpeechFlow",
    inputSchema: z.object({
      text: z.string(),
    }),
    outputSchema: z.object({
      audioDataUri: z.string(),
    }),
  },
  async (input) => {
    const { text } = input

    // Generate audio using Gemini TTS model
    const response = await ai.generate({
      model: "googleai/gemini-2.5-flash-preview-tts",
      prompt: text,
      config: {
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Puck",
            },
          },
        },
      },
    })

    // Extract audio data from response
    // Note: The actual implementation depends on how Genkit returns audio data
    // This is a placeholder for the audio conversion logic

    // Assuming we get PCM audio data from the response
    const pcmData = response.media?.[0]?.data || Buffer.from([])

    // Convert PCM to WAV
    const wavBuffer = pcmToWav(pcmData)

    // Convert to base64 data URI
    const base64Audio = wavBuffer.toString("base64")
    const audioDataUri = `data:audio/wav;base64,${base64Audio}`

    return {
      audioDataUri,
    }
  },
)
