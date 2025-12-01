// Simulated student data and activity tracking
export interface StudentData {
  id: string
  name: string
  email: string
  enrollmentDate: string
  progressPercentage: number
  coursesCompleted: number
  hoursWatched: number
  averageScore: number
  currentAssignments: Assignment[]
  activityFeed: Activity[]
  performance: {
    thisMonth: number[]
    lastMonth: number[]
  }
}

export interface Assignment {
  id: string
  title: string
  status: "in-progress" | "done" | "overdue"
  duration: string
  course: string
}

export interface Activity {
  id: string
  type: "video" | "quiz" | "assignment"
  description: string
  timestamp: string
  score?: number
}

// Simulated student database
export const STUDENT_DATABASE: Record<string, StudentData> = {
  "student-001": {
    id: "student-001",
    name: "Rahul Kumar",
    email: "student1@example.com",
    enrollmentDate: "2024-01-15",
    progressPercentage: 68,
    coursesCompleted: 5,
    hoursWatched: 127,
    averageScore: 85,
    currentAssignments: [
      {
        id: "assign-1",
        title: "Indian Polity - Essay Writing",
        status: "in-progress",
        duration: "2 days left",
        course: "Polity",
      },
      {
        id: "assign-2",
        title: "Modern History - MCQ Practice",
        status: "done",
        duration: "Completed",
        course: "History",
      },
      {
        id: "assign-3",
        title: "Geography - Map Marking",
        status: "in-progress",
        duration: "5 days left",
        course: "Geography",
      },
    ],
    activityFeed: [
      {
        id: "act-1",
        type: "video",
        description: "Started video 'Polity-Day 5' at 4:30 PM",
        timestamp: "2024-12-08T16:30:00Z",
      },
      {
        id: "act-2",
        type: "quiz",
        description: "Scored 8/10 on 'History Quiz 2'",
        timestamp: "2024-12-08T14:15:00Z",
        score: 80,
      },
      {
        id: "act-3",
        type: "assignment",
        description: "Submitted 'Geography Assignment 3'",
        timestamp: "2024-12-07T18:45:00Z",
      },
    ],
    performance: {
      thisMonth: [65, 70, 75, 78, 82, 85, 88],
      lastMonth: [55, 60, 62, 68, 70, 72, 75],
    },
  },
  "student-002": {
    id: "student-002",
    name: "Priya Sharma",
    email: "student2@example.com",
    enrollmentDate: "2024-02-20",
    progressPercentage: 52,
    coursesCompleted: 3,
    hoursWatched: 89,
    averageScore: 78,
    currentAssignments: [
      {
        id: "assign-4",
        title: "Economics - Case Study Analysis",
        status: "in-progress",
        duration: "3 days left",
        course: "Economics",
      },
    ],
    activityFeed: [
      {
        id: "act-4",
        type: "video",
        description: "Watched 'Economics Lecture 12'",
        timestamp: "2024-12-08T10:00:00Z",
      },
    ],
    performance: {
      thisMonth: [60, 65, 68, 72, 75, 78, 80],
      lastMonth: [50, 55, 58, 60, 63, 65, 68],
    },
  },
}

export function getStudentData(studentId: string): StudentData | null {
  return STUDENT_DATABASE[studentId] || null
}

export function getAllStudents(): StudentData[] {
  return Object.values(STUDENT_DATABASE)
}
