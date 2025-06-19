// app/dashboard/visitors/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function VisitorDetailsPage() {
  const { id } = useParams()
  const [visitor, setVisitor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const res = await fetch(`/api/visitors/${id}`)
        const data = await res.json()
        setVisitor(data.visitor)
      } catch (err) {
        console.error("Failed to fetch visitor details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitor()
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!visitor) return <p className="p-4">Visitor not found</p>

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{visitor.fullName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {visitor.email}</p>
          <p><strong>Phone:</strong> {visitor.phone}</p>
          <p><strong>Company:</strong> {visitor.company}</p>
          <p><strong>Purpose:</strong> {visitor.purpose}</p>
          <p><strong>Host:</strong> {visitor.hostName} ({visitor.hostEmail})</p>
          <p><strong>Check-in:</strong> {new Date(visitor.checkInTime).toLocaleString()}</p>
          {visitor.checkOutTime && (
            <p><strong>Check-out:</strong> {new Date(visitor.checkOutTime).toLocaleString()}</p>
          )}
          <p><strong>Status:</strong> <Badge>{visitor.status}</Badge></p>
        </CardContent>
      </Card>
    </div>
  )
}
