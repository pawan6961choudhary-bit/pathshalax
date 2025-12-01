"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Video, FileText, MessageSquare, Home, Bell } from "lucide-react"
import { getAllStudents, type StudentData } from "@/lib/student-data"
import { clearCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

function AdminDashboardContent() {
  const [students, setStudents] = useState<StudentData[]>([])
  const router = useRouter()

  useEffect(() => {
    setStudents(getAllStudents())
  }, [])

  const handleLogout = () => {
    clearCurrentUser()
    router.push("/login")
  }

  const stats = {
    totalStudents: students.length,
    totalCourses: 12,
    activeLectures: 45,
    pendingQueries: 8,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PathshalaX Admin</span>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Active learners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">Available courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Lectures</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeLectures}</div>
              <p className="text-xs text-muted-foreground mt-1">Video content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingQueries}</div>
              <p className="text-xs text-muted-foreground mt-1">Student messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Management Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>View and manage all registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${student.progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{student.progressPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/students/${student.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Content Management Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Upload and manage course content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/content/videos" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Video className="h-4 w-4" />
                  Upload Video Lecture
                </Button>
              </Link>
              <Link href="/admin/content/assignments" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <FileText className="h-4 w-4" />
                  Create Assignment
                </Button>
              </Link>
              <Link href="/admin/content/quizzes" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <FileText className="h-4 w-4" />
                  Add Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Hub</CardTitle>
              <CardDescription>Manage student queries and announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/queries" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  View Student Queries ({stats.pendingQueries})
                </Button>
              </Link>
              <Link href="/admin/announcements" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Bell className="h-4 w-4" />
                  Send Announcement
                </Button>
              </Link>
              <Link href="/admin/queries" className="block">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  Broadcast Message
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
