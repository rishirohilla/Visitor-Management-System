"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Phone, Building, FileText, Calendar, Clock, UserCheck, UserX, Printer } from "lucide-react"

interface VisitorDetailsModalProps {
  visitorId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface VisitorDetails {
  _id: string
  fullName: string
  email: string
  phone: string
  company?: string
  purpose: string
  hostName?: string
  hostEmail: string
  hostDepartment: string
  photoData?: string
  status: "pending" | "approved" | "rejected" | "checked-out"
  checkInTime: string
  checkOutTime?: string
  approvedBy?: {
    name: string
    email: string
  }
  rejectedBy?: {
    name: string
    email: string
  }
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
  qrCode?: string
  isPreRegistered: boolean
  visitDate?: string
  visitStartTime?: string
  visitEndTime?: string
}

export function VisitorDetailsModal({ visitorId, open, onOpenChange }: VisitorDetailsModalProps) {
  const [visitor, setVisitor] = useState<VisitorDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (visitorId && open) {
      fetchVisitorDetails()
    }
  }, [visitorId, open])

  const fetchVisitorDetails = async () => {
    if (!visitorId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/visitors/${visitorId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch visitor details")
      }
      const data = await response.json()
      setVisitor(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load visitor details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handlePrintBadge = () => {
    if (!visitor) return

    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const badgeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Visitor Badge - ${visitor.fullName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              text-align: center;
            }
            .badge {
              border: 2px solid #333;
              padding: 20px;
              max-width: 300px;
              margin: 0 auto;
              border-radius: 10px;
            }
            .photo {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              object-fit: cover;
              margin: 10px 0;
            }
            .qr-code {
              width: 120px;
              height: 120px;
              margin: 10px 0;
            }
            h2 { margin: 10px 0; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="badge">
            <h2>VISITOR</h2>
            ${visitor.photoData ? `<img src="${visitor.photoData}" alt="Visitor Photo" class="photo" />` : ""}
            <h3>${visitor.fullName}</h3>
            <p><strong>Company:</strong> ${visitor.company || "N/A"}</p>
            <p><strong>Host:</strong> ${visitor.hostName || visitor.hostEmail}</p>
            <p><strong>Date:</strong> ${formatDateTime(visitor.checkInTime)}</p>
            ${visitor.qrCode ? `<img src="${visitor.qrCode}" alt="QR Code" class="qr-code" />` : ""}
          </div>
        </body>
      </html>
    `

    printWindow.document.write(badgeHtml)
    printWindow.document.close()
    printWindow.print()
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!visitor) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Visitor details not found</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Visitor Details
          </DialogTitle>
          <DialogDescription>Complete information for {visitor.fullName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with photo and basic info */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {visitor.photoData ? (
                <img
                  src={visitor.photoData || "/placeholder.svg"}
                  alt={visitor.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-lg">
                    {visitor.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{visitor.fullName}</h3>
                {getStatusBadge(visitor.status)}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{visitor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{visitor.phone}</span>
              </div>
              {visitor.company && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{visitor.company}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Visit Information */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Visit Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Purpose of Visit</label>
                <p className="mt-1">{visitor.purpose}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Host</label>
                <p className="mt-1">{visitor.hostName || visitor.hostEmail}</p>
                <p className="text-sm text-muted-foreground">{visitor.hostDepartment}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Check-in Time</label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateTime(visitor.checkInTime)}
                </p>
              </div>
              {visitor.checkOutTime && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check-out Time</label>
                  <p className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatDateTime(visitor.checkOutTime)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pre-registration info */}
          {visitor.isPreRegistered && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Pre-registration Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visitor.visitDate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Scheduled Date</label>
                      <p className="mt-1">{formatDateTime(visitor.visitDate)}</p>
                    </div>
                  )}
                  {visitor.visitStartTime && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Start Time</label>
                      <p className="mt-1">{visitor.visitStartTime}</p>
                    </div>
                  )}
                  {visitor.visitEndTime && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">End Time</label>
                      <p className="mt-1">{visitor.visitEndTime}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Approval/Rejection Information */}
          {(visitor.approvedBy || visitor.rejectedBy) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Status Information</h4>
                {visitor.approvedBy && visitor.approvedAt && (
                  <div className="flex items-start gap-2">
                    <UserCheck className="h-4 w-4 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Approved by:</span> {visitor.approvedBy.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDateTime(visitor.approvedAt)}</p>
                    </div>
                  </div>
                )}
                {visitor.rejectedBy && visitor.rejectedAt && (
                  <div className="flex items-start gap-2">
                    <UserX className="h-4 w-4 text-red-600 mt-1" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Rejected by:</span> {visitor.rejectedBy.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDateTime(visitor.rejectedAt)}</p>
                      {visitor.rejectionReason && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Reason:</span> {visitor.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* QR Code */}
          {visitor.qrCode && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">QR Code</h4>
                <div className="flex justify-center">
                  <img
                    src={visitor.qrCode || "/placeholder.svg"}
                    alt="Visitor QR Code"
                    className="w-32 h-32 border rounded-md"
                  />
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handlePrintBadge}>
              <Printer className="h-4 w-4 mr-2" />
              Print Badge
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
