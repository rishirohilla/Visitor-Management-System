import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/auth"
import { sendPreRegistrationEmail } from "@/lib/email"
import QRCode from "qrcode"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, email, phone, company, purpose, visitDate, startTime, endTime } = body

    // Validate required fields
    if (!fullName || !email || !phone || !purpose || !visitDate) {
      return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 })
    }

    await connectToDatabase()

    // Get the current user (host)
    const hostUser = await User.findOne({ email: session.user.email })

    if (!hostUser) {
      return NextResponse.json({ message: "Host user not found" }, { status: 404 })
    }

    // Generate QR code for the pre-registered visitor
    const visitorId = new Date().getTime().toString()
    const qrCodeData = await QRCode.toDataURL(visitorId)

    // Create new pre-registered visitor
    const visitor = new Visitor({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      company: company?.trim(),
      purpose: purpose.trim(),
      hostEmail: session.user.email,
      hostName: hostUser.name,
      hostDepartment: hostUser.department,
      visitDate: new Date(visitDate),
      visitStartTime: startTime,
      visitEndTime: endTime,
      qrCode: qrCodeData,
      status: "approved", // Pre-registered visitors are automatically approved
      isPreRegistered: true,
      preRegisteredBy: hostUser._id,
      approvedBy: hostUser._id,
      approvedAt: new Date(),
    })

    await visitor.save()

    // Send pre-registration email to visitor
    try {
      await sendPreRegistrationEmail(email, {
        fullName,
        visitDate,
        hostName: hostUser.name,
        qrCode: qrCodeData.split(",")[1], // Remove data:image/png;base64, prefix
      })
    } catch (emailError) {
      console.error("Error sending pre-registration email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        message: "Visitor pre-registered successfully",
        visitorId: visitor._id.toString(),
        visitor: {
          _id: visitor._id,
          fullName: visitor.fullName,
          email: visitor.email,
          company: visitor.company,
          purpose: visitor.purpose,
          visitDate: visitor.visitDate,
          hostName: visitor.hostName,
          status: visitor.status,
          qrCode: visitor.qrCode,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error pre-registering visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
