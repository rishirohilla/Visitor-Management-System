// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { connectToDatabase } from "./mongodb"
// import User from "./models/User"

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
//           return null
//         }

//         try {
//           await connectToDatabase()

//           const user = await User.findOne({
//             email: credentials.email.toLowerCase(),
//             isActive: true,
//           })

//           if (!user) {
//             return null
//           }

//           const isPasswordValid = await user.comparePassword(credentials.password)

//           if (!isPasswordValid) {
//             return null
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             department: user.department,
//             role: user.role,
//           }
//         } catch (error) {
//           console.error("Auth error:", error)
//           return null
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
//         token.department = user.department
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub!
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
          return null
        }

        try {
          await connectToDatabase()

          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
            isActive: true,
          })

          if (!user) {
            return null
          }

          const isPasswordValid = await user.comparePassword(credentials.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            department: user.department,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
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
        token.department = user.department
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
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

// ✅ Add this to allow getting the current user's ID from session
export async function getCurrentUserId(): Promise<string> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  return session.user.id
}
