"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Check, X } from "lucide-react"

interface PendingVisitor {
  _id: string
  fullName: string
  email: string
  company?: string
  purpose: string
  checkInTime: string
}

export function PendingApprovals() {
  const [pendingVisitors, setPendingVisitors] = useState<PendingVisitor[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    const fetchPendingVisitors = async () => {
      try {
        const response = await fetch("/api/visitors?status=pending&limit=5")
        if (response.ok) {
          const data = await response.json()
          setPendingVisitors(data.visitors || [])
        }
      } catch (error) {
        console.error("Error fetching pending visitors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPendingVisitors()
  }, [])

  const handleApproval = async (visitorId: string, action: "approve" | "reject") => {
    setProcessingIds((prev) => new Set(prev).add(visitorId))

    try {
      const response = await fetch(`/api/visitors/${visitorId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: action === "reject" ? "Rejected from dashboard" : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} visitor`)
      }

      // Remove the visitor from the pending list
      setPendingVisitors((prev) => prev.filter((v) => v._id !== visitorId))

      toast({
        title: "Success",
        description: `Visitor ${action === "approve" ? "approved" : "rejected"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} visitor`,
        variant: "destructive",
      })
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(visitorId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-32"></div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
              <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (pendingVisitors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No pending approvals</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {pendingVisitors.map((visitor) => (
        <div key={visitor._id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {visitor.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{visitor.fullName}</p>
              <p className="text-xs text-muted-foreground">{visitor.company || visitor.email}</p>
              <p className="text-xs text-muted-foreground">{visitor.purpose}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleApproval(visitor._id, "approve")}
              disabled={processingIds.has(visitor._id)}
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleApproval(visitor._id, "reject")}
              disabled={processingIds.has(visitor._id)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
