"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, Users, MessageCircle, UserPlus } from "lucide-react"
import Link from "next/link"

function GroupsContent() {
  const [groups] = useState([
    {
      id: "group-1",
      name: "Polity Study Group",
      description: "Collaborative study group focused on Indian Polity and Constitution",
      members: 12,
      activeMembers: 8,
      lastActivity: "2024-12-08T16:30:00Z",
      category: "Subject",
    },
    {
      id: "group-2",
      name: "Current Affairs Discussion",
      description: "Daily discussion on current affairs and their relevance to UPSC",
      members: 25,
      activeMembers: 20,
      lastActivity: "2024-12-09T10:15:00Z",
      category: "Discussion",
    },
    {
      id: "group-3",
      name: "Essay Writing Circle",
      description: "Peer review and feedback on essay writing practice",
      members: 8,
      activeMembers: 6,
      lastActivity: "2024-12-08T14:00:00Z",
      category: "Practice",
    },
    {
      id: "group-4",
      name: "Prelims 2025 Batch",
      description: "Exclusive group for Prelims 2025 aspirants with doubt clearing sessions",
      members: 45,
      activeMembers: 35,
      lastActivity: "2024-12-09T09:00:00Z",
      category: "Batch",
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
              <Users className="h-8 w-8 text-primary" />
              Study Groups
            </h1>
            <p className="text-muted-foreground mt-2">Join study groups and collaborate with fellow aspirants</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Create Group
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{group.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {group.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{group.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-muted-foreground">{group.activeMembers} online</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members > 4 && (
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted border-2 border-background text-sm font-medium">
                        +{group.members - 4}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last activity: {new Date(group.lastActivity).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Join Group
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GroupsPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <GroupsContent />
    </ProtectedRoute>
  )
}
