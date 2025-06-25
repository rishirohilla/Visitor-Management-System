// import { type NextRequest, NextResponse } from "next/server"
// import { connectToDatabase } from "@/lib/mongodb"
// import User from "@/lib/models/User"

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, password, department, role = "employee" } = await request.json()

//     // Validate required fields
//     if (!name || !email || !password || !department) {
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 })
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
//     }

//     // Validate password length
//     if (password.length < 6) {
//       return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
//     }

//     await connectToDatabase()

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: email.toLowerCase() })
//     if (existingUser) {
//       return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
//     }

//     // Create new user
//     const user = new User({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       password,
//       department,
//       role,
//     })

//     await user.save()

//     // Remove password from response
//     const userResponse = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       department: user.department,
//       role: user.role,
//     }

//     return NextResponse.json({ message: "User created successfully", user: userResponse }, { status: 201 })
//   } catch (error) {
//     console.error("Registration error:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function POST(request: NextRequest) {
  console.log("=== REGISTRATION API CALLED ===")

  try {
    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("Request body received:", { ...body, password: "[HIDDEN]" })
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const { name, email, password, department, role = "employee" } = body

    // Validate required fields
    const missingFields = []
    if (!name?.trim()) missingFields.push("name")
    if (!email?.trim()) missingFields.push("email")
    if (!password) missingFields.push("password")
    if (!department) missingFields.push("department")

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields)
      return NextResponse.json({ message: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email)
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      console.log("Password too short")
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Validate department
    const validDepartments = ["hr", "it", "finance", "marketing", "operations", "sales", "security"]
    if (!validDepartments.includes(department)) {
      console.log("Invalid department:", department)
      return NextResponse.json({ message: "Invalid department selected" }, { status: 400 })
    }

    console.log("All validations passed, connecting to database...")

    // Connect to database
    await connectToDatabase()
    console.log("Database connected successfully")

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    })

    if (existingUser) {
      console.log("User already exists with email:", email)
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    console.log("Creating new user...")

    // Create new user
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      department: department,
      role: role,
    }

    const user = new User(userData)
    const savedUser = await user.save()

    console.log("User created successfully with ID:", savedUser._id)

    // Prepare response (exclude password)
    const userResponse = {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      department: savedUser.department,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    }

    console.log("Sending success response")

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error: unknown) {
    console.error("Registration API error:", error)

    // Narrow error type safely
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    ) {
      console.log("Duplicate key error - email already exists")
      return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as any).name === "ValidationError"
    ) {
      console.log("Mongoose validation error:", (error as any).message)
      return NextResponse.json({ message: (error as any).message }, { status: 400 })
    }

    // Generic error response
    return NextResponse.json(
      {
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : "Registration failed",
      },
      { status: 500 },
    )
  }
}
