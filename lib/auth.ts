// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { connectToDatabase } from "./mongodb"
// import User from "./models/User"
// import { getServerSession } from "next-auth"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required.")
//         }
      
//         try {
//           await connectToDatabase()
      
//           const user = await User.findOne({
//             email: credentials.email.toLowerCase(),
//             isActive: true,
//           })
      
//           if (!user) {
//             throw new Error("User not found.")
//           }
      
//           const isPasswordValid = await user.comparePassword(credentials.password)
      
//           if (!isPasswordValid) {
//             throw new Error("Invalid password.")
//           }
      
//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             department: user.department,
//             role: user.role,
//           }
//         } catch (error: any) {
//           // Return error message to frontend
//           throw new Error(error.message || "Internal server error")
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.department = user.department
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string
//         session.user.department = token.department as string
//         session.user.role = token.role as string
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// }

// // ✅ Utility to fetch current user ID
// export async function getCurrentUserId(): Promise<string> {
//   const session = await getServerSession(authOptions)

//   if (!session?.user?.id) {
//     throw new Error("User not authenticated")
//   }

//   return session.user.id
// }

import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./mongodb"
import User from "./models/User"
import { getServerSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("missing_credentials") // 🔧 Custom error code
        }

        try {
          await connectToDatabase()

          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
            isActive: true,
          })

          if (!user) {
            throw new Error("user_not_found") // 🔧 Custom error code
          }

          const isPasswordValid = await user.comparePassword(credentials.password)

          if (!isPasswordValid) {
            throw new Error("invalid_password") // 🔧 Custom error code
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            department: user.department,
            role: user.role,
          }
        } catch (error: any) {
          // Custom error codes returned to frontend
          throw new Error(error.message || "server_error")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.department = user.department
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.department = token.department as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

export async function getCurrentUserId(): Promise<string> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  return session.user.id
}
