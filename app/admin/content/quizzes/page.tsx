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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, ArrowLeft, FileText, Plus, X } from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

function CreateQuizContent() {
  const [isCreating, setIsCreating] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    duration: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    setTimeout(() => {
      alert("Quiz created successfully!")
      setIsCreating(false)
      setFormData({
        title: "",
        description: "",
        course: "",
        duration: "",
      })
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }])
    }, 1500)
  }

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions]
    if (field === "question") {
      newQuestions[index].question = value
    } else if (field === "correctAnswer") {
      newQuestions[index].correctAnswer = value
    }
    setQuestions(newQuestions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
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
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle>Create Quiz</CardTitle>
            </div>
            <CardDescription>Create a new quiz for students</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Indian History Quiz - Module 1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the quiz content..."
                  rows={3}
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Questions</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>

                {questions.map((q, qIndex) => (
                  <Card key={qIndex}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                        {questions.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                        placeholder="Enter question"
                        rows={2}
                        required
                      />

                      <div className="space-y-2">
                        <Label>Options</Label>
                        <RadioGroup
                          value={q.correctAnswer.toString()}
                          onValueChange={(value) => updateQuestion(qIndex, "correctAnswer", Number.parseInt(value))}
                        >
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                              <Input
                                value={option}
                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                                required
                                className="flex-1"
                              />
                            </div>
                          ))}
                        </RadioGroup>
                        <p className="text-xs text-muted-foreground">
                          Select the correct answer by clicking the radio button
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isCreating} className="flex-1">
                  {isCreating ? "Creating..." : "Create Quiz"}
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

export default function CreateQuizPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <CreateQuizContent />
    </ProtectedRoute>
  )
}
