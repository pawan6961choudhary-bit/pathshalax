// Simple authentication utilities for PathshalaX
export interface User {
  id: string
  username: string
  email: string
  role: "student" | "admin" | "guest"
  name: string
  isGuest?: boolean
}

// Simulated user database
const USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin",
    user: {
      id: "admin-001",
      username: "admin",
      email: "admin@pathshalax.com",
      role: "admin",
      name: "Administrator",
    },
  },
  student1: {
    password: "password123",
    user: {
      id: "student-001",
      username: "student1",
      email: "student1@example.com",
      role: "student",
      name: "Rahul Kumar",
    },
  },
  student2: {
    password: "password123",
    user: {
      id: "student-002",
      username: "student2",
      email: "student2@example.com",
      role: "student",
      name: "Priya Sharma",
    },
  },
}

export function authenticateUser(username: string, password: string): User | null {
  const userData = USERS[username]
  if (userData && userData.password === password) {
    return userData.user
  }
  return null
}

export function createGuestUser(): User {
  const guestId = `guest-${Date.now()}`
  return {
    id: guestId,
    username: "guest",
    email: "guest@pathshalax.com",
    role: "guest",
    name: "Guest User",
    isGuest: true,
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userJson = localStorage.getItem("currentUser")
  if (userJson) {
    return JSON.parse(userJson)
  }
  return null
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("currentUser", JSON.stringify(user))
}

export function clearCurrentUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}
