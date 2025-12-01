"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, AlertCircle } from "lucide-react"
import {
  getAllAnnouncements,
  getUnreadAnnouncements,
  markAnnouncementAsRead,
  type Announcement,
} from "@/lib/announcements"
import { getCurrentUser } from "@/lib/auth"

export default function AnnouncementButton() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role !== "admin") {
      setCurrentUserId(user.id)
      loadAnnouncements(user.id)
    }
  }, [])

  const loadAnnouncements = (userId: string) => {
    const allAnnouncements = getAllAnnouncements()
    const unread = getUnreadAnnouncements(userId)
    setAnnouncements(allAnnouncements)
    setUnreadCount(unread.length)
  }

  const handleMarkAsRead = (announcementId: string) => {
    if (currentUserId) {
      markAnnouncementAsRead(announcementId, currentUserId)
      loadAnnouncements(currentUserId)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  const isUnread = (announcement: Announcement) => {
    return currentUserId ? !announcement.readBy.includes(currentUserId) : false
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-20 right-4 z-50 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground h-14 w-14"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 rounded-full bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Announcements
          </SheetTitle>
          <SheetDescription>Messages and updates from administrators</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No announcements yet</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-4 border rounded-lg ${isUnread(announcement) ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" : "bg-card"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={`h-5 w-5 ${getPriorityColor(announcement.priority)}`} />
                    <h4 className="font-semibold text-base">{announcement.title}</h4>
                  </div>
                  {isUnread(announcement) && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{announcement.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {isUnread(announcement) && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
