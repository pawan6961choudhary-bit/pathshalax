"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ArrowLeft, FileText, Calendar, Clock, Upload } from "lucide-react"
import Link from "next/link"

function AssignmentsContent() {
  const [assignments] = useState({
    pending: [
      {
        id: "assign-1",
        title: "Indian Polity - Essay Writing",
        course: "Polity",
        description: "Write a comprehensive essay on Fundamental Rights and their importance",
        dueDate: "2024-12-12",
        totalMarks: 100,
        status: "in-progress",
      },
      {
        id: "assign-3",
        title: "Geography - Map Marking",
        course: "Geography",
        description: "Mark important geographical features on the provided India map",
        dueDate: "2024-12-15",
        totalMarks: 50,
        status: "not-started",
      },
    ],
    completed: [
      {
        id: "assign-2",
        title: "Modern History - MCQ Practice",
        course: "History",
        description: "Complete 50 MCQs on Freedom Struggle and Colonial Era",
        completedDate: "2024-12-08",
        totalMarks: 100,
        obtainedMarks: 85,
        status: "completed",
      },
    ],
    overdue: [
      {
        id: "assign-4",
        title: "Economics - Case Study",
        course: "Economics",
        description: "Analyze the given economic case study and provide solutions",
        dueDate: "2024-12-05",
        totalMarks: 100,
        status: "overdue",
      },
    ],
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PathshalaX</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Assignments
          </h1>
          <p className="text-muted-foreground mt-2">Track and submit your course assignments</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">
                {assignments.pending.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              <Badge variant="secondary" className="ml-2">
                {assignments.completed.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              <Badge variant="destructive" className="ml-2">
                {assignments.overdue.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {assignments.pending.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">{assignment.course}</CardDescription>
                    </div>
                    <Badge variant={assignment.status === "in-progress" ? "secondary" : "outline"}>
                      {assignment.status === "in-progress" ? "In Progress" : "Not Started"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.totalMarks} marks</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Submit Assignment
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {assignments.completed.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">{assignment.course}</CardDescription>
                    </div>
                    <Badge variant="default">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Submitted: {new Date(assignment.completedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      Score: {assignment.obtainedMarks}/{assignment.totalMarks}
                    </div>
                  </div>
                  <Button variant="outline">View Submission</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            {assignments.overdue.map((assignment) => (
              <Card key={assignment.id} className="border-red-200 dark:border-red-900">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">{assignment.course}</CardDescription>
                    </div>
                    <Badge variant="destructive">Overdue</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <Calendar className="h-4 w-4" />
                      <span>Was due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.totalMarks} marks</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="destructive" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Submit Now
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AssignmentsPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <AssignmentsContent />
    </ProtectedRoute>
  )
}
