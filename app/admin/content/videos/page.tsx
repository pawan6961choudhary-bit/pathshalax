"use client"

import type React from "react"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, Upload, Video } from "lucide-react"
import Link from "next/link"

function VideoUploadContent() {
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    duration: "",
    videoFile: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      alert("Video uploaded successfully!")
      setIsUploading(false)
      setFormData({
        title: "",
        description: "",
        course: "",
        duration: "",
        videoFile: null,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PathshalaX Admin</span>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-6 w-6 text-primary" />
              <CardTitle>Upload Video Lecture</CardTitle>
            </div>
            <CardDescription>Add a new video lecture to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Indian Polity - Fundamental Rights"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the content of this lecture..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course/Batch</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upsc-foundation">UPSC Foundation 2025</SelectItem>
                      <SelectItem value="history-advanced">History Advanced</SelectItem>
                      <SelectItem value="polity-basics">Polity Basics</SelectItem>
                      <SelectItem value="geography-complete">Geography Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Video File</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFormData({ ...formData, videoFile: e.target.files?.[0] || null })}
                    className="hidden"
                  />
                  <Label htmlFor="video" className="cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-2">
                      {formData.videoFile ? formData.videoFile.name : "Click to upload or drag and drop"}
                    </div>
                    <div className="text-xs text-muted-foreground">MP4, MOV, AVI (max 2GB)</div>
                  </Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isUploading} className="flex-1">
                  {isUploading ? "Uploading..." : "Upload Video"}
                </Button>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VideoUploadPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <VideoUploadContent />
    </ProtectedRoute>
  )
}
