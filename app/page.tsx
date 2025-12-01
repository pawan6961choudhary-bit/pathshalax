"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Play, Pause, Loader2, Video, Award, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const handleAnthemPlay = async () => {
    if (isPlaying && audioElement) {
      audioElement.pause()
      setIsPlaying(false)
      return
    }

    if (audioUrl && audioElement) {
      audioElement.play()
      setIsPlaying(true)
      return
    }

    // Generate audio using TTS
    setIsGeneratingAudio(true)
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Yada Yada Hi Dharmasya, Glanirbhavati Bharata, Abhyutthanamadharmasya, Tadatmanam Srjamyaham",
        }),
      })

      const data = await response.json()
      const audio = new Audio(data.audioUrl)
      setAudioElement(audio)
      setAudioUrl(data.audioUrl)

      audio.play()
      setIsPlaying(true)

      audio.onended = () => setIsPlaying(false)
    } catch (error) {
      console.error("Error generating audio:", error)
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const handleWhatsAppJoin = () => {
    // Replace with your actual WhatsApp group/channel link
    window.open("https://chat.whatsapp.com/PathshalaXCommunity", "_blank", "noopener,noreferrer")
  }

  const handleTelegramJoin = () => {
    // Replace with your actual Telegram group/channel link
    window.open("https://t.me/PathshalaXOfficial", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PathshalaX</span>
          </Link>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Prepare for UPSC CSE</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-yellow-300 mb-6">#LetsCrackIt</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Crack UPSC CSE with top educators and best classroom experience on India's largest learning platform
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>

          {/* Anthem Player */}
          <Card className="mt-12 max-w-md mx-auto bg-white/10 backdrop-blur border-white/20">
            <CardContent className="pt-6">
              <p className="text-white mb-4 font-medium">Listen to our new Anthem</p>
              <Button onClick={handleAnthemPlay} disabled={isGeneratingAudio} variant="secondary" className="w-full">
                {isGeneratingAudio ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Audio...
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Anthem
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Play Anthem
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What you'll get</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Video className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Daily live classes</CardTitle>
                <CardDescription className="text-base">
                  Attend interactive live classes with India's top educators and get your doubts cleared in real-time
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Live tests & quizzes</CardTitle>
                <CardDescription className="text-base">
                  Test your knowledge with regular quizzes and get instant feedback to track your progress
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <BookOpen className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Join PathshalaX Community</h2>

          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900 border-green-200 dark:border-green-800"
              onClick={handleWhatsAppJoin}
            >
              <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              Join WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 border-blue-200 dark:border-blue-800"
              onClick={handleTelegramJoin}
            >
              <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Join Telegram
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Video className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Live Classes</h3>
              <p className="text-muted-foreground">Learn from the best educators in real-time</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">India's Top Educators</h3>
              <p className="text-muted-foreground">Get guidance from experienced mentors</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Syllabus</h3>
              <p className="text-muted-foreground">Complete coverage of UPSC CSE curriculum</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
