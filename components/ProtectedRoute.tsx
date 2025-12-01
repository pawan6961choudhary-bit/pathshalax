"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "student" | "admin"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push("/login")
      return
    }

    if (requiredRole === "student" && (currentUser.role === "student" || currentUser.role === "guest")) {
      setUser(currentUser)
      setIsLoading(false)
      return
    }

    if (requiredRole && currentUser.role !== requiredRole) {
      // Redirect to appropriate dashboard based on role
      if (currentUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
      return
    }

    setUser(currentUser)
    setIsLoading(false)
  }, [router, requiredRole])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
