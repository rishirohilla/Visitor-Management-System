import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, UserCheck, CalendarCheck, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Visitor Management System</h1>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/login">Employee Login</Link>
            </Button>
            <Button asChild>
              <Link href="/visitor-registration">Visitor Check-in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to our Visitor Management System</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Streamlining workplace security, regulatory compliance, and visitor experience with our comprehensive
              management solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Enhanced Security</CardTitle>
                <CardDescription>Secure visitor tracking and management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Our system ensures that only authorized visitors can enter your premises with mandatory photo capture
                  and approval workflows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Streamlined Approvals</CardTitle>
                <CardDescription>Quick and efficient approval process</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Real-time notifications allow employees to approve or reject visitor requests instantly from any
                  device.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CalendarCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Pre-Approval System</CardTitle>
                <CardDescription>Schedule visitors in advance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Employees can pre-approve visitors for specific time windows, streamlining the check-in process.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Efficient Check-in/out</CardTitle>
                <CardDescription>Automated tracking system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Automatically log entry and exit times for comprehensive security tracking and reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Get Started Now</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/visitor-registration">Visitor Check-in</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Employee Login</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-slate-200 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Visitor Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
