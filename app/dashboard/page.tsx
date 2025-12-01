"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Home,
  FolderKanban,
  FileText,
  Users,
  SettingsIcon,
  HelpCircle,
  Menu,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getStudentData, type StudentData } from "@/lib/student-data"
import { clearCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import AnnouncementButton from "@/components/AnnouncementButton"
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

function StudentDashboardContent() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [currentDate, setCurrentDate] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setIsGuest(user.isGuest || false)
      const data = getStudentData(user.id)
      setStudentData(data)
    }

    // Set current date on client-side to avoid hydration errors
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [])

  const handleLogout = () => {
    clearCurrentUser()
    router.push("/login")
  }

  if (!studentData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    datasets: [
      {
        label: "This Month",
        data: studentData.performance.thisMonth,
        borderColor: "hsl(221, 83%, 53%)",
        backgroundColor: "hsla(221, 83%, 53%, 0.1)",
        tension: 0.4,
      },
      {
        label: "Last Month",
        data: studentData.performance.lastMonth,
        borderColor: "hsl(240, 5%, 65%)",
        backgroundColor: "hsla(240, 5%, 65%, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
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
    <div className="min-h-screen bg-background flex">
      {!isGuest && <AnnouncementButton />}

      {/* Left Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 flex flex-col`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PathshalaX</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Link href="/dashboard/projects" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FolderKanban className="h-4 w-4" />
              Projects
            </Button>
          </Link>
          <Link href="/dashboard/assignments" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Assignment
            </Button>
          </Link>
          <Link href="/dashboard/groups" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Group
            </Button>
          </Link>
          <Link href="/dashboard/settings" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
            <HelpCircle className="h-4 w-4" />
            Help & information
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Back to Home Page
            </Button>
          </Link>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  Hello, {isGuest ? "Guest User" : "Learners"}
                  {isGuest && (
                    <Badge variant="secondary" className="ml-2">
                      Guest Mode
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">Track own progress here...</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">{currentDate}</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full">
            {/* Stat Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Finished</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studentData.coursesCompleted}</div>
                  <p className="text-xs text-muted-foreground mt-1">Courses completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tracked</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studentData.hoursWatched}h</div>
                  <p className="text-xs text-muted-foreground mt-1">Hours of learning</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studentData.averageScore}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Average score</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Current Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Current Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {studentData.currentAssignments.length > 0 ? (
                  <div className="space-y-4">
                    {studentData.currentAssignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <FileText
                            className={`h-8 w-8 ${
                              assignment.status === "done"
                                ? "text-green-500"
                                : assignment.status === "overdue"
                                  ? "text-red-500"
                                  : "text-orange-500"
                            }`}
                          />
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
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
                          <p className="text-xs text-muted-foreground mt-1">{assignment.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No active assignments. Start learning to see your progress!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden xl:block w-80 bg-card border-l flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">{studentData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Your Profile</h3>
              <p className="text-sm text-muted-foreground">{isGuest ? "Guest" : "Student"}</p>
            </div>
          </div>
          <Button className="w-full gap-2">
            <MessageCircle className="h-4 w-4" />
            Start Live Chat
          </Button>
        </div>

        <div className="flex-1 p-6">
          <h3 className="font-semibold mb-4">Activity Feed</h3>
          <div className="space-y-4">
            {studentData.activityFeed.slice(0, 3).map((activity) => (
              <div key={activity.id} className="text-sm">
                <p className="font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t">
          <Input placeholder="Type your message..." />
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentDashboardContent />
    </ProtectedRoute>
  )
}
