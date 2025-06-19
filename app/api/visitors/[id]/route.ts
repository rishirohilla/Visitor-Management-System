import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const visitor = await Visitor.findById(params.id)
      .populate("approvedBy", "name email")
      .populate("rejectedBy", "name email")

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error) {
    console.error("Error fetching visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    await connectToDatabase()

    const visitor = await Visitor.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error) {
    console.error("Error updating visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const visitor = await Visitor.findByIdAndDelete(params.id)

    if (!visitor) {
      return NextResponse.json({ message: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Visitor deleted successfully" })
  } catch (error) {
    console.error("Error deleting visitor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
