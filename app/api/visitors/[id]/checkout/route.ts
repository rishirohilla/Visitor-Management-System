import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"
import { authOptions } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    if (visitor.status !== "approved") {
      return NextResponse.json({ message: "Only approved visitors can be checked out" }, { status: 400 })
    }

    if (visitor.status === "checked-out") {
      return NextResponse.json({ message: "Visitor has already been checked out" }, { status: 400 })
    }

    // Update visitor status
    visitor.status = "checked-out"
    visitor.checkOutTime = new Date()
    await visitor.save()

    return NextResponse.json({
      message: "Visitor checked out successfully",
      visitor,
    })
  } catch (error) {
    console.error("Error checking out visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
