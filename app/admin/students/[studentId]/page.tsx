"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, Clock, TrendingUp } from "lucide-react"
import { getStudentData, type StudentData } from "@/lib/student-data"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function StudentDetailContent({ params }: { params: Promise<{ studentId: string }> }) {
  const resolvedParams = use(params)
  const [student, setStudent] = useState<StudentData | null>(null)

  useEffect(() => {
    const data = getStudentData(resolvedParams.studentId)
    setStudent(data)
  }, [resolvedParams.studentId])

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Student not found</p>
      </div>
    )
  }

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    datasets: [
      {
        label: "Performance Score",
        data: student.performance.thisMonth,
        borderColor: "hsl(221, 83%, 53%)",
        backgroundColor: "hsla(221, 83%, 53%, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
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
          <Link href="/admin/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Student Profile */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">{student.name}</CardTitle>
                <CardDescription className="text-base mt-2">{student.email}</CardDescription>
              </div>
              <Badge className="text-base px-4 py-2">Student</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Enrollment Date</p>
                <p className="text-lg font-semibold mt-1">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-lg font-semibold mt-1">{student.progressPercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
                <p className="text-lg font-semibold mt-1">{student.coursesCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-lg font-semibold mt-1">{student.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trend
              </CardTitle>
              <CardDescription>Weekly performance over the last 7 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Real-time activity log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-3 pb-4 border-b last:border-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "video"
                          ? "bg-blue-500"
                          : activity.type === "quiz"
                            ? "bg-green-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                      {activity.score !== undefined && (
                        <Badge variant="outline" className="mt-2">
                          Score: {activity.score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Assignments */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
            <CardDescription>Track student assignment progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.currentAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Course: {assignment.course} • {assignment.duration}
                    </p>
                  </div>
                  <Badge
                    variant={
                      assignment.status === "done"
                        ? "default"
                        : assignment.status === "overdue"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {assignment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function StudentDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <StudentDetailContent params={params} />
    </ProtectedRoute>
  )
}
