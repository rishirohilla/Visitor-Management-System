"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import QRCode from "react-qr-code"

interface VisitorData {
  _id: string
  fullName: string
  email: string
  company: string
  hostName: string
  hostEmail: string
  purpose: string
  status: "pending" | "approved" | "rejected"
  checkInTime: string
}

export default function VisitorConfirmationPage({ params }: { params: { id: string } }) {
  const [visitor, setVisitor] = useState<VisitorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await fetch(`/api/visitors/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch visitor data")
        }

        const data = await response.json()
        setVisitor(data)
      } catch (err) {
        setError("Could not load visitor information. Please contact the reception.")
        toast({
          title: "Error",
          description: "Failed to load visitor information",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorData()
  }, [params.id, toast])

  // Poll for status updates every 10 seconds
  useEffect(() => {
    if (!visitor || visitor.status !== "pending") return

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/visitors/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setVisitor(data)

          // If status changed from pending, show notification
          if (data.status !== "pending") {
            toast({
              title: data.status === "approved" ? "Approved!" : "Rejected",
              description:
                data.status === "approved"
                  ? "Your visit has been approved. Please proceed to reception."
                  : "Your visit request has been rejected.",
              variant: data.status === "approved" ? "default" : "destructive",
            })
            clearInterval(intervalId)
          }
        }
      } catch (error) {
        console.error("Error polling for status updates:", error)
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [visitor, params.id, toast])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading visitor information...</p>
        </div>
      </div>
    )
  }

  if (error || !visitor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Error</CardTitle>
            <CardDescription className="text-center">{error || "Visitor information not found"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/visitor-registration">Return to Check-in</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              {visitor.status === "pending" && <Clock className="h-12 w-12 text-amber-500" />}
              {visitor.status === "approved" && <CheckCircle className="h-12 w-12 text-green-500" />}
              {visitor.status === "rejected" && <AlertCircle className="h-12 w-12 text-red-500" />}
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {visitor.status === "pending" && "Awaiting Approval"}
              {visitor.status === "approved" && "Visit Approved"}
              {visitor.status === "rejected" && "Visit Rejected"}
            </CardTitle>
            <CardDescription className="text-center">
              {visitor.status === "pending" && "Your host has been notified of your arrival"}
              {visitor.status === "approved" && "You can now proceed to the reception desk"}
              {visitor.status === "rejected" && "Please contact your host for more information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-md p-4 space-y-3">
              <div>
                <p className="text-sm text-slate-500">Visitor</p>
                <p className="font-medium">{visitor.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Company</p>
                <p className="font-medium">{visitor.company || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Host</p>
                <p className="font-medium">{visitor.hostName || visitor.hostEmail}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Purpose</p>
                <p className="font-medium">{visitor.purpose}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Check-in Time</p>
                <p className="font-medium">{new Date(visitor.checkInTime).toLocaleString()}</p>
              </div>
            </div>

            {visitor.status === "approved" && (
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-slate-500 text-center">Your visitor pass</p>
                <div className="bg-white p-4 rounded-md">
                  <QRCode value={visitor._id} size={180} />
                </div>
                <p className="text-xs text-slate-400">Show this QR code at security checkpoints</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {visitor.status === "pending" && (
              <div className="text-center text-sm text-slate-500 mb-4">
                <p>Please wait while your host approves your visit.</p>
                <p>This page will update automatically.</p>
              </div>
            )}
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
