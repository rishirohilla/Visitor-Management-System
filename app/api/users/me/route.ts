import { getCurrentUserId } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()

    const userId = await getCurrentUserId()
    const user = await User.findById(userId).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
