"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, MessageSquare, Send } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Query {
  id: string
  studentName: string
  studentEmail: string
  subject: string
  message: string
  date: string
  status: "pending" | "resolved"
}

function StudentQueriesContent() {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)
  const [reply, setReply] = useState("")
  const [queries] = useState<Query[]>([
    {
      id: "1",
      studentName: "Rahul Sharma",
      studentEmail: "rahul@example.com",
      subject: "Doubt in Polity Chapter 3",
      message: "I have a question regarding the difference between Fundamental Rights and Directive Principles...",
      date: "2024-12-01",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Priya Singh",
      studentEmail: "priya@example.com",
      subject: "Assignment Submission Issue",
      message: "Unable to submit my history assignment. Getting an error message...",
      date: "2024-11-30",
      status: "pending",
    },
  ])

  const handleReply = () => {
    alert("Reply sent successfully!")
    setReply("")
    setSelectedQuery(null)
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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle>Student Queries</CardTitle>
            </div>
            <CardDescription>View and respond to student questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {queries.map((query) => (
                <Card
                  key={query.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedQuery(query)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar>
                          <AvatarFallback>{query.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{query.studentName}</h4>
                            <Badge variant={query.status === "pending" ? "secondary" : "default"}>{query.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{query.studentEmail}</p>
                          <h5 className="font-medium mb-2">{query.subject}</h5>
                          <p className="text-sm text-muted-foreground line-clamp-2">{query.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(query.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={selectedQuery !== null} onOpenChange={() => setSelectedQuery(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedQuery?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedQuery?.studentName} ({selectedQuery?.studentEmail})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">{selectedQuery?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Reply</label>
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your response here..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedQuery(null)}>
              Cancel
            </Button>
            <Button onClick={handleReply} disabled={!reply.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function StudentQueriesPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <StudentQueriesContent />
    </ProtectedRoute>
  )
}
