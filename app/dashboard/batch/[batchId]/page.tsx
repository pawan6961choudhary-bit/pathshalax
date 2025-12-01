"use client"

import { use, useState, useEffect } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookOpen, ArrowLeft, Play, Calendar, Clock, Lock } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

function BatchDetailContent({ params }: { params: Promise<{ batchId: string }> }) {
  const resolvedParams = use(params)
  const [isGuest, setIsGuest] = useState(false)
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setIsGuest(user.isGuest || false)
    }
  }, [])

  const handleWatchVideo = () => {
    if (isGuest) {
      setShowSignupDialog(true)
    } else {
      // Play video logic here
      alert("Video playback will be implemented")
    }
  }

  const handleJoinClass = (classId: string) => {
    if (isGuest) {
      setShowSignupDialog(true)
    } else {
      // Join live class logic
      alert(`Joining live class ${classId}. Live streaming will be implemented.`)
    }
  }

  // Mock batch data
  const batchData = {
    id: resolvedParams.batchId,
    name: "UPSC CSE 2025 - Foundation Batch",
    description: "Complete foundation course for UPSC CSE 2025 preparation",
    instructor: "Dr. Rajesh Kumar",
    totalLectures: 120,
    completedLectures: 45,
    upcomingClasses: [
      {
        id: "1",
        title: "Indian Polity - Fundamental Rights",
        date: "2024-12-10",
        time: "10:00 AM",
        duration: "2 hours",
      },
      {
        id: "2",
        title: "Modern History - Freedom Struggle",
        date: "2024-12-11",
        time: "2:00 PM",
        duration: "2 hours",
      },
    ],
    previousClasses: [
      {
        id: "1",
        title: "Indian Polity - Constitution Basics",
        date: "2024-12-08",
        duration: "2 hours",
        recording: true,
      },
      {
        id: "2",
        title: "Geography - Physical Geography",
        date: "2024-12-07",
        duration: "2 hours",
        recording: true,
      },
    ],
  }

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
        {isGuest && (
          <Card className="mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="flex items-center gap-3 py-4">
              <Lock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <div>
                <p className="font-semibold text-yellow-900 dark:text-yellow-100">Guest Mode - Limited Access</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Sign up to watch videos and access all features
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{batchData.name}</CardTitle>
                <CardDescription className="text-base">{batchData.description}</CardDescription>
              </div>
              <Badge className="text-base px-4 py-2">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="text-lg font-semibold mt-1">{batchData.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-lg font-semibold mt-1">
                  {batchData.completedLectures}/{batchData.totalLectures} Lectures
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(batchData.completedLectures / batchData.totalLectures) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold">
                    {Math.round((batchData.completedLectures / batchData.totalLectures) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="previous">Previous Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Syllabus</CardTitle>
                <CardDescription>Browse all course modules and topics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Course syllabus and module browser will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Live Classes</CardTitle>
                <CardDescription>Join live classes at scheduled time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batchData.upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(cls.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {cls.time}
                            </span>
                            <span>{cls.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleJoinClass(cls.id)}>
                        {isGuest && <Lock className="h-4 w-4 mr-2" />}
                        Join Class
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="previous" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Previous Classes</CardTitle>
                <CardDescription>Watch recordings of past classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batchData.previousClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-lg">
                          <Play className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{new Date(cls.date).toLocaleDateString()}</span>
                            <span>{cls.duration}</span>
                            {cls.recording && (
                              <Badge variant="outline" className="text-xs">
                                Recording Available
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="gap-2 bg-transparent" onClick={handleWatchVideo}>
                        {isGuest && <Lock className="h-4 w-4" />}
                        <Play className="h-4 w-4" />
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up Required</DialogTitle>
            <DialogDescription>
              You need to create an account to watch videos and access all features. Sign up now to continue your
              learning journey!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSignupDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                router.push("/signup")
              }}
            >
              Sign Up Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function BatchDetailPage({ params }: { params: Promise<{ batchId: string }> }) {
  return (
    <ProtectedRoute requiredRole="student">
      <BatchDetailContent params={params} />
    </ProtectedRoute>
  )
}
