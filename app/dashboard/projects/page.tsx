"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, FolderKanban, Calendar, Users, MoreVertical } from "lucide-react"
import Link from "next/link"

function ProjectsContent() {
  const [projects] = useState([
    {
      id: "proj-1",
      title: "UPSC Prelims 2025 Preparation",
      description: "Comprehensive preparation plan for UPSC Prelims 2025 with study schedules and resources",
      status: "in-progress",
      progress: 68,
      dueDate: "2025-06-15",
      members: 3,
      tasks: 24,
      completedTasks: 16,
    },
    {
      id: "proj-2",
      title: "Current Affairs Analysis",
      description: "Monthly current affairs compilation and analysis for UPSC preparation",
      status: "in-progress",
      progress: 45,
      dueDate: "2024-12-31",
      members: 2,
      tasks: 12,
      completedTasks: 5,
    },
    {
      id: "proj-3",
      title: "Essay Writing Practice",
      description: "Regular essay writing practice on various topics with peer review",
      status: "completed",
      progress: 100,
      dueDate: "2024-11-30",
      members: 4,
      tasks: 10,
      completedTasks: 10,
    },
  ])

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FolderKanban className="h-8 w-8 text-primary" />
              My Projects
            </h1>
            <p className="text-muted-foreground mt-2">Manage your study projects and collaborative tasks</p>
          </div>
          <Button className="gap-2">
            <FolderKanban className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                      {project.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {project.members} members
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {project.completedTasks}/{project.tasks} tasks
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <ProjectsContent />
    </ProtectedRoute>
  )
}
