import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, department, currentPassword, newPassword } = body

    // Validate required fields
    if (!name || !email || !department) {
      return NextResponse.json({ message: "Name, email, and department are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if email is already taken by another user
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: user._id },
      })

      if (existingUser) {
        return NextResponse.json({ message: "Email is already taken by another user" }, { status: 409 })
      }
    }

    // Handle password change if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ message: "Current password is required to change password" }, { status: 400 })
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword)
      if (!isCurrentPasswordValid) {
        return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 })
      }

      // Validate new password
      if (newPassword.length < 6) {
        return NextResponse.json({ message: "New password must be at least 6 characters long" }, { status: 400 })
      }

      // Hash new password
      const salt = await bcrypt.genSalt(12)
      user.password = await bcrypt.hash(newPassword, salt)
    }

    // Update user fields
    user.name = name.trim()
    user.email = email.toLowerCase().trim()
    user.department = department
    user.updatedAt = new Date()

    await user.save()

    // Return user without password
    const updatedUser = await User.findById(user._id).select("-password")

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
