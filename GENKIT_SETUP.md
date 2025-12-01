# Genkit AI Setup Instructions

This project uses Google's Genkit AI framework for chat and text-to-speech features.

## Prerequisites

1. **Google AI API Key**: You need a Google AI API key to use Genkit features.
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the API key

## Setup Steps

1. **Create Environment File**:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

2. **Add Your API Key**:
   Open `.env.local` and replace `your_google_ai_api_key_here` with your actual Google AI API key:
   \`\`\`
   GOOGLE_GENAI_API_KEY=AIzaSy...your-actual-key
   \`\`\`

3. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

## Features Powered by Genkit

### 1. ChatBot (Chat Flow)
- Located in: `src/ai/flows/chat-flow.ts`
- Accessible globally via the floating chat button
- Special command: Type "admin access" to get admin dashboard link
- Uses Gemini 2.0 Flash model for responses

### 2. Text-to-Speech (TTS Flow)
- Located in: `src/ai/flows/tts-flow.ts`
- Used on homepage for the Anthem player
- Converts Sanskrit shloka to audio
- Uses Gemini 2.5 Flash Preview TTS model

## API Routes

- **Chat**: `/api/chat` - POST endpoint for chatbot messages
- **TTS**: `/api/tts` - POST endpoint for text-to-speech conversion

## Troubleshooting

If you encounter issues:

1. **API Key Not Working**: 
   - Verify your API key is correct
   - Ensure billing is enabled in Google Cloud Console
   - Check API quotas and limits

2. **Audio Not Playing**:
   - Check browser console for errors
   - Ensure audio permissions are granted
   - Try a different browser

3. **Chatbot Not Responding**:
   - Check network tab for API errors
   - Verify API key is set in `.env.local`
   - Restart development server after adding env variables

## Resources

- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Google AI Documentation](https://ai.google.dev/)
- [Gemini API Guide](https://ai.google.dev/docs)
