import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/auth"
import { sendVisitorNotification } from "@/lib/email"
import QRCode from "qrcode"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const hostEmail = searchParams.get("hostEmail")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const page = Number.parseInt(searchParams.get("page") || "1")

    const query: any = {}

    // Filter by status if provided
    if (status) {
      query.status = status
    }

    // Filter by host email if provided (for employee dashboard)
    if (hostEmail) {
      query.hostEmail = hostEmail
    }

    // If user is not admin, only show their visitors
    if (session.user.role !== "admin" && session.user.role !== "security") {
      query.hostEmail = session.user.email
    }

    const visitors = await Visitor.find(query)
      .sort({ checkInTime: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("approvedBy", "name email")
      .populate("rejectedBy", "name email")
      .populate("preRegisteredBy", "name email")

    const total = await Visitor.countDocuments(query)

    return NextResponse.json({
      visitors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching visitors:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("=== API: POST /api/visitors started ===")

  try {
    // Parse request body
    const body = await request.json()
    console.log("API: Request body received:", {
      ...body,
      photoData: body.photoData ? `[Photo data present: ${body.photoData.length} chars]` : "[No photo data]",
    })

    const { fullName, email, phone, company, purpose, hostEmail, hostDepartment, photoData, checkInTime } = body

    // Validate required fields
    const missingFields = []
    if (!fullName) missingFields.push("fullName")
    if (!email) missingFields.push("email")
    if (!phone) missingFields.push("phone")
    if (!purpose) missingFields.push("purpose")
    if (!hostEmail) missingFields.push("hostEmail")
    if (!hostDepartment) missingFields.push("hostDepartment")
    if (!photoData) missingFields.push("photoData")

    if (missingFields.length > 0) {
      console.log("API: Missing required fields:", missingFields)
      return NextResponse.json(
        {
          message: `Missing required fields: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 },
      )
    }

    // Connect to database
    console.log("API: Connecting to database...")
    await connectToDatabase()
    console.log("API: Database connected successfully")

    // Find host user
    console.log("API: Looking for host user with email:", hostEmail)
    const hostUser = await User.findOne({ email: hostEmail.toLowerCase().trim() })
    console.log("API: Host user found:", hostUser ? { name: hostUser.name, email: hostUser.email } : "Not found")

    // Generate QR code
    console.log("API: Generating QR code...")
    const qrCodeData = await QRCode.toDataURL(`visitor-${Date.now()}`)
    console.log("API: QR code generated successfully")

    // Create visitor object
    const visitorData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      company: company?.trim() || "",
      purpose: purpose.trim(),
      hostEmail: hostEmail.toLowerCase().trim(),
      hostName: hostUser?.name || "",
      hostDepartment,
      photoData,
      checkInTime: checkInTime ? new Date(checkInTime) : new Date(),
      qrCode: qrCodeData,
      status: "pending",
    }

    console.log("API: Creating visitor with data:", {
      ...visitorData,
      photoData: "[Photo data hidden]",
      qrCode: "[QR code hidden]",
    })

    // Save visitor to database
    const visitor = new Visitor(visitorData)
    const savedVisitor = await visitor.save()
    console.log("API: Visitor saved successfully with ID:", savedVisitor._id.toString())

    // Prepare response data
    const responseData = {
      message: "Visitor registered successfully",
      visitorId: savedVisitor._id.toString(),
      visitor: {
        _id: savedVisitor._id,
        fullName: savedVisitor.fullName,
        email: savedVisitor.email,
        company: savedVisitor.company,
        purpose: savedVisitor.purpose,
        hostName: savedVisitor.hostName,
        hostEmail: savedVisitor.hostEmail,
        status: savedVisitor.status,
        checkInTime: savedVisitor.checkInTime,
      },
    }

    // Send notification email asynchronously (don't block the response)
    if (hostUser && process.env.EMAIL_SERVER_HOST) {
      console.log("API: Attempting to send notification email...")
      // Use setTimeout to make it truly async and not block the response
      setTimeout(async () => {
        try {
          await sendVisitorNotification(
            hostEmail,
            hostUser.name || "Host",
            {
              fullName,
              company: company || "",
              purpose,
              checkInTime: savedVisitor.checkInTime.toISOString(),
            },
            savedVisitor._id.toString(),
          )
          console.log("API: Notification email sent successfully")
        } catch (emailError) {
          console.error("API: Error sending notification email:", emailError)
        }
      }, 100)
    } else {
      console.log("API: Skipping email notification - no host user or email config missing")
    }

    console.log("API: Sending success response")
    return NextResponse.json(responseData, { status: 201 })
  } catch (error) {
    console.error("API: Error in POST /api/visitors:", error)

    // Return detailed error information
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : "") : undefined,
      },
      { status: 500 },
    )
  }
}
