// // "use client"

// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu"
// // import { Badge } from "@/components/ui/badge"
// // import { useToast } from "@/components/ui/use-toast"
// // import { Search, MoreHorizontal, Plus, FileDown } from "lucide-react"
// // import { DashboardHeader } from "@/components/dashboard/header"

// // interface Visitor {
// //   _id: string
// //   fullName: string
// //   email: string
// //   company: string
// //   purpose: string
// //   hostName: string
// //   hostEmail: string
// //   status: "pending" | "approved" | "rejected" | "checked-out"
// //   checkInTime: string
// //   checkOutTime?: string
// // }

// // export default function VisitorsPage() {
// //   const [visitors, setVisitors] = useState<Visitor[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     const fetchVisitors = async () => {
// //       try {
// //         const response = await fetch("/api/visitors")
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch visitors")
// //         }
// //         const data = await response.json()
// //         setVisitors(data)
// //       } catch (error) {
// //         toast({
// //           title: "Error",
// //           description: "Failed to load visitors data",
// //           variant: "destructive",
// //         })
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchVisitors()
// //   }, [toast])

// //   const filteredVisitors = visitors.filter(
// //     (visitor) =>
// //       visitor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
// //   )

// //   const handleCheckout = async (visitorId: string) => {
// //     try {
// //       const response = await fetch(`/api/visitors/${visitorId}/checkout`, {
// //         method: "PUT",
// //       })

// //       if (!response.ok) {
// //         throw new Error("Failed to check out visitor")
// //       }

// //       // Update the visitor in the list
// //       setVisitors((prevVisitors) =>
// //         prevVisitors.map((visitor) =>
// //           visitor._id === visitorId
// //             ? { ...visitor, status: "checked-out", checkOutTime: new Date().toISOString() }
// //             : visitor,
// //         ),
// //       )

// //       toast({
// //         title: "Success",
// //         description: "Visitor has been checked out",
// //       })
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to check out visitor",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const getStatusBadge = (status: string) => {
// //     switch (status) {
// //       case "pending":
// //         return (
// //           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
// //             Pending
// //           </Badge>
// //         )
// //       case "approved":
// //         return (
// //           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
// //             Approved
// //           </Badge>
// //         )
// //       case "rejected":
// //         return (
// //           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
// //             Rejected
// //           </Badge>
// //         )
// //       case "checked-out":
// //         return (
// //           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
// //             Checked Out
// //           </Badge>
// //         )
// //       default:
// //         return <Badge variant="outline">{status}</Badge>
// //     }
// //   }

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleString()
// //   }

// //   return (
// //     <div className="flex-1 space-y-4 p-4 md:p-8">
// //       <DashboardHeader heading="Visitors" text="Manage and view all visitor records" />

// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-2 w-full max-w-sm">
// //           <Search className="h-4 w-4 text-slate-500" />
// //           <Input
// //             placeholder="Search visitors..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="h-9"
// //           />
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <Button variant="outline" size="sm" className="h-9">
// //             <FileDown className="h-4 w-4 mr-2" />
// //             Export
// //           </Button>
// //           <Button size="sm" className="h-9">
// //             <Plus className="h-4 w-4 mr-2" />
// //             Pre-register Visitor
// //           </Button>
// //         </div>
// //       </div>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>All Visitors</CardTitle>
// //           <CardDescription>A list of all visitors who have checked in to your organization</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           {loading ? (
// //             <div className="flex items-center justify-center h-64">
// //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //             </div>
// //           ) : (
// //             <div className="rounded-md border">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>Name</TableHead>
// //                     <TableHead>Company</TableHead>
// //                     <TableHead>Host</TableHead>
// //                     <TableHead>Check-in Time</TableHead>
// //                     <TableHead>Status</TableHead>
// //                     <TableHead className="w-[80px]"></TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {filteredVisitors.length === 0 ? (
// //                     <TableRow>
// //                       <TableCell colSpan={6} className="h-24 text-center">
// //                         No visitors found
// //                       </TableCell>
// //                     </TableRow>
// //                   ) : (
// //                     filteredVisitors.map((visitor) => (
// //                       <TableRow key={visitor._id}>
// //                         <TableCell>
// //                           <div>
// //                             <p className="font-medium">{visitor.fullName}</p>
// //                             <p className="text-sm text-slate-500">{visitor.email}</p>
// //                           </div>
// //                         </TableCell>
// //                         <TableCell>{visitor.company || "—"}</TableCell>
// //                         <TableCell>
// //                           <div>
// //                             <p>{visitor.hostName || "—"}</p>
// //                             <p className="text-sm text-slate-500">{visitor.hostEmail}</p>
// //                           </div>
// //                         </TableCell>
// //                         <TableCell>{formatDate(visitor.checkInTime)}</TableCell>
// //                         <TableCell>{getStatusBadge(visitor.status)}</TableCell>
// //                         <TableCell>
// //                           <DropdownMenu>
// //                             <DropdownMenuTrigger asChild>
// //                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
// //                                 <MoreHorizontal className="h-4 w-4" />
// //                                 <span className="sr-only">Open menu</span>
// //                               </Button>
// //                             </DropdownMenuTrigger>
// //                             <DropdownMenuContent align="end">
// //                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
// //                               <DropdownMenuSeparator />
// //                               <DropdownMenuItem onClick={() => {}}>View details</DropdownMenuItem>
// //                               {visitor.status === "approved" && (
// //                                 <DropdownMenuItem onClick={() => handleCheckout(visitor._id)}>
// //                                   Check out
// //                                 </DropdownMenuItem>
// //                               )}
// //                               <DropdownMenuItem onClick={() => {}}>Print badge</DropdownMenuItem>
// //                             </DropdownMenuContent>
// //                           </DropdownMenu>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))
// //                   )}
// //                 </TableBody>
// //               </Table>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useRouter } from "next/navigation"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/components/ui/use-toast"
// import { Search, MoreHorizontal, Plus, FileDown } from "lucide-react"
// import { DashboardHeader } from "@/components/dashboard/header"

// interface Visitor {
//   _id: string
//   fullName: string
//   email: string
//   company: string
//   purpose: string
//   hostName: string
//   hostEmail: string
//   status: "pending" | "approved" | "rejected" | "checked-out"
//   checkInTime: string
//   checkOutTime?: string
// }

// interface VisitorsAPIResponse {
//   visitors: Visitor[]
//   pagination: {
//     total: number
//     page: number
//     limit: number
//     pages: number
//   }
// }

// export default function VisitorsPage() {
//   const [visitors, setVisitors] = useState<Visitor[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchVisitors = async () => {
//       try {
//         const response = await fetch("/api/visitors")
//         if (!response.ok) {
//           throw new Error("Failed to fetch visitors")
//         }
//         const data: VisitorsAPIResponse = await response.json()
//         setVisitors(data.visitors) // ✅ Corrected: Use data.visitors
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load visitors data",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchVisitors()
//   }, [toast])

//   const filteredVisitors = visitors.filter(
//     (visitor) =>
//       visitor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const handleCheckout = async (visitorId: string) => {
//     try {
//       const response = await fetch(`/api/visitors/${visitorId}/checkout`, {
//         method: "PUT",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to check out visitor")
//       }

//       setVisitors((prevVisitors) =>
//         prevVisitors.map((visitor) =>
//           visitor._id === visitorId
//             ? { ...visitor, status: "checked-out", checkOutTime: new Date().toISOString() }
//             : visitor,
//         ),
//       )

//       toast({
//         title: "Success",
//         description: "Visitor has been checked out",
//       })
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to check out visitor",
//         variant: "destructive",
//       })
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "pending":
//         return (
//           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
//             Pending
//           </Badge>
//         )
//       case "approved":
//         return (
//           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//             Approved
//           </Badge>
//         )
//       case "rejected":
//         return (
//           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//             Rejected
//           </Badge>
//         )
//       case "checked-out":
//         return (
//           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
//             Checked Out
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString()
//   }

//   const router = useRouter()


//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8">
//       <DashboardHeader heading="Visitors" text="Manage and view all visitor records" />

//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2 w-full max-w-sm">
//           <Search className="h-4 w-4 text-slate-500" />
//           <Input
//             placeholder="Search visitors..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-9"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="h-9">
//             <FileDown className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//           <Button size="sm" className="h-9">
//             <Plus className="h-4 w-4 mr-2" />
//             Pre-register Visitor
//           </Button>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>All Visitors</CardTitle>
//           <CardDescription>A list of all visitors who have checked in to your organization</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : (
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Company</TableHead>
//                     <TableHead>Host</TableHead>
//                     <TableHead>Check-in Time</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="w-[80px]"></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredVisitors.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} className="h-24 text-center">
//                         No visitors found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredVisitors.map((visitor) => (
//                       <TableRow key={visitor._id}>
//                         <TableCell>
//                           <div>
//                             <p className="font-medium">{visitor.fullName}</p>
//                             <p className="text-sm text-slate-500">{visitor.email}</p>
//                           </div>
//                         </TableCell>
//                         <TableCell>{visitor.company || "—"}</TableCell>
//                         <TableCell>
//                           <div>
//                             <p>{visitor.hostName || "—"}</p>
//                             <p className="text-sm text-slate-500">{visitor.hostEmail}</p>
//                           </div>
//                         </TableCell>
//                         <TableCell>{formatDate(visitor.checkInTime)}</TableCell>
//                         <TableCell>{getStatusBadge(visitor.status)}</TableCell>
//                         <TableCell>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                                 <MoreHorizontal className="h-4 w-4" />
//                                 <span className="sr-only">Open menu</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem onClick={() => router.push(`/dashboard/visitors/${visitor._id}`)}>
//                                 View details
//                               </DropdownMenuItem>
//                               {visitor.status === "approved" && (
//                                 <DropdownMenuItem onClick={() => handleCheckout(visitor._id)}>
//                                   Check out
//                                 </DropdownMenuItem>
//                               )}
//                               <DropdownMenuItem onClick={() => {}}>Print badge</DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal, Plus, FileDown, Eye } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"
import { VisitorDetailsModal } from "@/components/dashboard/visitor-details-modal"

interface Visitor {
  _id: string
  fullName: string
  email: string
  company: string
  purpose: string
  hostName: string
  hostEmail: string
  status: "pending" | "approved" | "rejected" | "checked-out"
  checkInTime: string
  checkOutTime?: string
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch("/api/visitors")
        if (!response.ok) {
          throw new Error("Failed to fetch visitors")
        }
        const data = await response.json()
        setVisitors(data.visitors || [])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load visitors data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVisitors()
  }, [toast])

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewDetails = (visitorId: string) => {
    setSelectedVisitorId(visitorId)
    setDetailsModalOpen(true)
  }

  const handleCheckout = async (visitorId: string) => {
    try {
      const response = await fetch(`/api/visitors/${visitorId}/checkout`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error("Failed to check out visitor")
      }

      // Update the visitor in the list
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor._id === visitorId
            ? { ...visitor, status: "checked-out", checkOutTime: new Date().toISOString() }
            : visitor,
        ),
      )

      toast({
        title: "Success",
        description: "Visitor has been checked out",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check out visitor",
        variant: "destructive",
      })
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <DashboardHeader heading="Visitors" text="Manage and view all visitor records" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search visitors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <a href="/api/visitors/export" download>
            <Button variant="outline" size="sm" className="h-9">
              <FileDown className="h-4 w-4 mr-2" />
              Export
            </Button>
          </a>
          <Link href="/dashboard/pre-register">
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Pre-register Visitor
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Visitors</CardTitle>
          <CardDescription>A list of all visitors who have checked in to your organization</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No visitors found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVisitors.map((visitor) => (
                      <TableRow key={visitor._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visitor.fullName}</p>
                            <p className="text-sm text-slate-500">{visitor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{visitor.company || "—"}</TableCell>
                        <TableCell>
                          <div>
                            <p>{visitor.hostName || "—"}</p>
                            <p className="text-sm text-slate-500">{visitor.hostEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(visitor.checkInTime)}</TableCell>
                        <TableCell>{getStatusBadge(visitor.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(visitor._id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View details
                              </DropdownMenuItem>
                              {visitor.status === "approved" && (
                                <DropdownMenuItem onClick={() => handleCheckout(visitor._id)}>
                                  Check out
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => {}}>Print badge</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <VisitorDetailsModal visitorId={selectedVisitorId} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
    </div>
  )
}
