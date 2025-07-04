import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const visitor = await Visitor.findById(params.id)

    if (!visitor) {
      return NextResponse.redirect(new URL("/visitor-not-found", request.url))
    }

    if (visitor.status !== "pending") {
      return NextResponse.redirect(new URL(`/visitor-confirmation/${params.id}`, request.url))
    }

    // Update visitor status to approved
    visitor.status = "approved"
    visitor.approvedAt = new Date()
    await visitor.save()

    // Redirect to confirmation page
    return NextResponse.redirect(new URL(`/visitor-confirmation/${params.id}`, request.url))
  } catch (error) {
    console.error("Error approving visitor:", error)
    return NextResponse.redirect(new URL("/error", request.url))
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const visitor = await Visitor.findById(params.id)

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    if (visitor.status !== "pending") {
      return NextResponse.json({ message: "Visitor has already been processed" }, { status: 400 })
    }

    // Update visitor status
    visitor.status = "approved"
    visitor.approvedBy = session.user.id
    visitor.approvedAt = new Date()
    await visitor.save()

    return NextResponse.json({
      message: "Visitor approved successfully",
      visitor,
    })
  } catch (error) {
    console.error("Error approving visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
