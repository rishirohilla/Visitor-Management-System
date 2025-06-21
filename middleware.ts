// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware(req) {
//     // Add any additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Protect dashboard routes
//         if (req.nextUrl.pathname.startsWith("/dashboard")) {
//           return !!token
//         }
//         return true
//       },
//     },
//   },
// )

// export const config = {
//   matcher: ["/dashboard/:path*"],
// }

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If user is authenticated and tries to access login page, redirect to dashboard
    if (req.nextUrl.pathname === "/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
