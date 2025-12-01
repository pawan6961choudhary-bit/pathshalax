// Announcement system for admin-to-student communication
export interface Announcement {
  id: string
  title: string
  message: string
  createdBy: string
  createdAt: string
  priority: "low" | "medium" | "high"
  readBy: string[] // Array of student IDs who have read the announcement
}

// Simulated announcements database
const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "Important: Class Schedule Change",
    message: "The Polity class scheduled for tomorrow has been rescheduled to 4:00 PM. Please join on time.",
    createdBy: "admin",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    priority: "high",
    readBy: [],
  },
  {
    id: "ann-002",
    title: "New Study Material Available",
    message:
      "New study material for Modern History has been uploaded. Check the resources section for detailed notes and practice questions.",
    createdBy: "admin",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    priority: "medium",
    readBy: ["student-001"],
  },
  {
    id: "ann-003",
    title: "Weekend Mock Test",
    message:
      "A comprehensive mock test covering all subjects will be conducted this weekend. This is mandatory for all students.",
    createdBy: "admin",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    priority: "high",
    readBy: [],
  },
]

export function getAllAnnouncements(): Announcement[] {
  return ANNOUNCEMENTS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getUnreadAnnouncements(studentId: string): Announcement[] {
  return ANNOUNCEMENTS.filter((ann) => !ann.readBy.includes(studentId)).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function markAnnouncementAsRead(announcementId: string, studentId: string): void {
  const announcement = ANNOUNCEMENTS.find((ann) => ann.id === announcementId)
  if (announcement && !announcement.readBy.includes(studentId)) {
    announcement.readBy.push(studentId)
  }
}

export function createAnnouncement(announcement: Omit<Announcement, "id" | "createdAt" | "readBy">): Announcement {
  const newAnnouncement: Announcement = {
    ...announcement,
    id: `ann-${Date.now()}`,
    createdAt: new Date().toISOString(),
    readBy: [],
  }
  ANNOUNCEMENTS.push(newAnnouncement)
  return newAnnouncement
}
