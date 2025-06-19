import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"

export async function GET() {
  try {
    await connectToDatabase()

    const visitors = await Visitor.find().lean()

    const csvHeaders = [
      "Full Name",
      "Email",
      "Company",
      "Purpose",
      "Host Name",
      "Host Email",
      "Status",
      "Check-In Time",
      "Check-Out Time",
    ]

    const csvRows = visitors.map((v) =>
      [
        v.fullName,
        v.email,
        v.company || "",
        v.purpose || "",
        v.hostName || "",
        v.hostEmail || "",
        v.status,
        v.checkInTime,
        v.checkOutTime || "",
      ].join(","),
    )

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n")

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="visitor-logs.csv"`,
      },
    })
  } catch (error) {
    console.error("Export Error:", error)
    return NextResponse.json({ message: "Failed to export visitor logs" }, { status: 500 })
  }
}
