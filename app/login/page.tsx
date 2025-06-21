

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
  
      if (result?.error) {
        switch (result.error) {
          case "user_not_found":
            setError("No account found with this email.")
            break
          case "invalid_password":
            setError("Incorrect password. Please try again.")
            break
          case "missing_credentials":
            setError("Please enter both email and password.")
            break
          default:
            setError("Authentication failed. Please try again.")
            break
        }
  
        toast({
          title: "Login Failed",
          description: result.error.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
          variant: "destructive",
        })
      } else if (result?.ok) {
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        })
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Employee Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

