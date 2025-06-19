import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Visitor from "@/lib/models/Visitor"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const thisWeekStart = new Date(today)
    thisWeekStart.setDate(today.getDate() - today.getDay())

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    let baseQuery = {}

    // If user is not admin or security, only show their visitors
    if (session.user.role !== "admin" && session.user.role !== "security") {
      baseQuery = { hostEmail: session.user.email }
    }

    // Get various statistics
    const [
      totalVisitors,
      todayVisitors,
      thisWeekVisitors,
      thisMonthVisitors,
      pendingApprovals,
      approvedVisitors,
      rejectedVisitors,
      checkedOutVisitors,
    ] = await Promise.all([
      Visitor.countDocuments(baseQuery),
      Visitor.countDocuments({
        ...baseQuery,
        checkInTime: { $gte: today, $lt: tomorrow },
      }),
      Visitor.countDocuments({
        ...baseQuery,
        checkInTime: { $gte: thisWeekStart },
      }),
      Visitor.countDocuments({
        ...baseQuery,
        checkInTime: { $gte: thisMonthStart },
      }),
      Visitor.countDocuments({
        ...baseQuery,
        status: "pending",
      }),
      Visitor.countDocuments({
        ...baseQuery,
        status: "approved",
      }),
      Visitor.countDocuments({
        ...baseQuery,
        status: "rejected",
      }),
      Visitor.countDocuments({
        ...baseQuery,
        status: "checked-out",
      }),
    ])

    // Get daily visitor counts for the last 7 days
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const nextDate = new Date(date)
      nextDate.setDate(date.getDate() + 1)

      const count = await Visitor.countDocuments({
        ...baseQuery,
        checkInTime: { $gte: date, $lt: nextDate },
      })

      last7Days.push({
        date: date.toISOString().split("T")[0],
        count,
      })
    }

    return NextResponse.json({
      totalVisitors,
      todayVisitors,
      thisWeekVisitors,
      thisMonthVisitors,
      pendingApprovals,
      approvedVisitors,
      rejectedVisitors,
      checkedOutVisitors,
      dailyStats: last7Days,
    })
  } catch (error) {
    console.error("Error fetching visitor stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
