"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Visitor {
  _id: string
  fullName: string
  email: string
  company?: string
  status: string
  checkInTime: string
}

export function RecentVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentVisitors = async () => {
      try {
        const response = await fetch("/api/visitors?limit=5")
        if (response.ok) {
          const data = await response.json()
          setVisitors(data.visitors || [])
        }
      } catch (error) {
        console.error("Error fetching recent visitors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentVisitors()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "checked-out":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
            Checked Out
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
            <div className="ml-4 space-y-1 flex-1">
              <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
            </div>
            <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (visitors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No recent visitors</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {visitors.map((visitor) => (
        <div key={visitor._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {visitor.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{visitor.fullName}</p>
            <p className="text-sm text-muted-foreground">{visitor.company || visitor.email}</p>
          </div>
          <div className="ml-auto">{getStatusBadge(visitor.status)}</div>
        </div>
      ))}
    </div>
  )
}
