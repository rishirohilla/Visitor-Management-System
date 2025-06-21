
// import { Button } from "@/components/ui/button"
// import Image from 'next/image';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import {
//   Shield,
//   UserCheck,
//   CalendarCheck,
//   Clock,
//   ArrowRight,
//   CheckCircle,
//   Users,
//   Building,
//   Globe,
//   Github,
//   Linkedin,
//   Mail,
//   ExternalLink,
//   Code,
//   Briefcase,
// } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">

//       <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             {/* Logo & Title */}
//             <div className="flex items-center space-x-3">
//               <div className="bg-primary rounded-lg p-2">
//                 <Shield className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-800">Visitor Management System</h1>
//                 <p className="text-xs text-slate-500">Secure • Efficient • Professional</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
//               <Button variant="ghost" asChild className="w-full sm:w-auto">
//                 <Link href="/login" className="w-full text-left sm:text-center">Employee Login</Link>
//               </Button>
//               <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90">
//                 <Link href="/visitor-registration" className="flex items-center justify-center w-full sm:w-auto">
//                   Visitor Check-in
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>


//       {/* Hero Section */}
//       <section className="relative py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5"></div>
//         <div className="container mx-auto px-4 relative">
//           <div className="max-w-4xl mx-auto text-center">
//             <Badge variant="outline" className="mb-6 bg-white/50 backdrop-blur-sm">
//               🚀 Next-Generation Visitor Management
//             </Badge>
//             <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
//               Secure Your Workplace with
//               <span className="text-primary block">Smart Visitor Management</span>
//             </h1>
//             <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//               Transform your visitor experience with our comprehensive management solution. Streamline check-ins,
//               enhance security, and maintain compliance effortlessly.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
//                 <Link href="/visitor-registration">
//                   Start Visitor Check-in
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>
//               </Button>
//               <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-white/50 backdrop-blur-sm">
//                 <Link href="/login">Employee Dashboard</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white/50 backdrop-blur-sm">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
//               Key Features
//             </Badge>
//             <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything You Need for Visitor Management</h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Our comprehensive solution covers every aspect of visitor management, from check-in to checkout and
//               everything in between.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
//               <CardHeader className="text-center pb-4">
//                 <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
//                   <Shield className="h-8 w-8 text-green-600" />
//                 </div>
//                 <CardTitle className="text-xl mt-4">Enhanced Security</CardTitle>
//                 <CardDescription>Advanced protection protocols</CardDescription>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-slate-600 mb-4">
//                   Multi-layer security with photo verification, approval workflows, and real-time monitoring.
//                 </p>
//                 <div className="flex items-center justify-center text-green-600 text-sm font-medium">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Photo Verification
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
//               <CardHeader className="text-center pb-4">
//                 <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//                   <UserCheck className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <CardTitle className="text-xl mt-4">Smart Approvals</CardTitle>
//                 <CardDescription>Instant notification system</CardDescription>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-slate-600 mb-4">
//                   Real-time notifications and one-click approval system for seamless visitor management.
//                 </p>
//                 <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Real-time Alerts
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
//               <CardHeader className="text-center pb-4">
//                 <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
//                   <CalendarCheck className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <CardTitle className="text-xl mt-4">Pre-Registration</CardTitle>
//                 <CardDescription>Schedule visits in advance</CardDescription>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-slate-600 mb-4">
//                   Pre-approve visitors with time-based access and automated QR code generation.
//                 </p>
//                 <div className="flex items-center justify-center text-purple-600 text-sm font-medium">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   QR Code Access
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
//               <CardHeader className="text-center pb-4">
//                 <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
//                   <Clock className="h-8 w-8 text-orange-600" />
//                 </div>
//                 <CardTitle className="text-xl mt-4">Auto Tracking</CardTitle>
//                 <CardDescription>Comprehensive logging</CardDescription>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-slate-600 mb-4">
//                   Automatic entry/exit logging with detailed analytics and compliance reporting.
//                 </p>
//                 <div className="flex items-center justify-center text-orange-600 text-sm font-medium">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Analytics Dashboard
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>


//       <section className="relative z-50 py-20 min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
//         <div className="w-full max-w-4xl px-4">
//           <div className="text-center mb-12">
//             <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
//               About the Developer
//             </Badge>
//             <h2 className="text-4xl font-bold mb-4">Built with Passion & Expertise</h2>
//             <p className="text-xl text-slate-300">
//               Crafted by a dedicated full-stack developer with a passion for creating secure, scalable solutions.
//             </p>
//           </div>

//           <div className="flex flex-col md:flex-row items-center justify-center gap-12">
//             {/* Developer Info */}
//             <div className="text-center">
//               <div className="mb-6">
//                 <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
//                   <img
//                     src="https://media.licdn.com/dms/image/v2/D5603AQFOu20VPwdbAg/profile-displayphoto-shrink_200_200/B56ZUpmKexHsAY-/0/1740159630445?e=2147483647&v=beta&t=RfromorK6pM4HMLeEEZ0y6YvGv6tEc1H9oWwtOLyOqE"
//                     alt="Developer Photo"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">Rishi Rohilla</h3>
//                 <p className="text-primary text-lg mb-4">Full-Stack Developer & Competitive Programmer</p>
//               </div>

//               <div className="flex flex-wrap gap-2 justify-center mb-6">
//                 {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Competetive Programming', 'C++', 'Java'].map((tech) => (
//                   <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
//                     {tech}
//                   </Badge>
//                 ))}
//               </div>

//               <div className="flex flex-wrap gap-4 justify-center">
//                 <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   <a href="https://rishi-rohilla-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">
//                     <Globe className="h-4 w-4 mr-2" />
//                     Portfolio
//                     <ExternalLink className="h-3 w-3 ml-1" />
//                   </a>
//                 </Button>
//                 <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   <a href="https://github.com/rishirohilla" target="_blank" rel="noopener noreferrer">
//                     <Github className="h-4 w-4 mr-2" />
//                     GitHub
//                     <ExternalLink className="h-3 w-3 ml-1" />
//                   </a>
//                 </Button>
//                 <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   <a href="https://linkedin.com/in/rishirohilla88" target="_blank" rel="noopener noreferrer">
//                     <Linkedin className="h-4 w-4 mr-2" />
//                     LinkedIn
//                     <ExternalLink className="h-3 w-3 ml-1" />
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* CTA Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-4xl font-bold text-slate-800 mb-6">Ready to Transform Your Visitor Experience?</h2>
//             <p className="text-xl text-slate-600 mb-8">
//               Join hundreds of organizations that trust our visitor management system for their security and compliance
//               needs.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
//                 <Link href="/visitor-registration">
//                   <Users className="mr-2 h-5 w-5" />
//                   Start Visitor Check-in
//                 </Link>
//               </Button>
//               <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
//                 <Link href="/register">
//                   <Building className="mr-2 h-5 w-5" />
//                   Register Your Organization
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-slate-300 py-12">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between gap-8">

//             {/* Left: Branding and Description */}
//             <div className="md:w-2/3">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="bg-primary rounded-lg p-2">
//                   <Shield className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Visitor Management System</h3>
//                   <p className="text-sm text-slate-400">Secure • Efficient • Professional</p>
//                 </div>
//               </div>
//               <p className="text-slate-400 max-w-lg">
//                 The most comprehensive visitor management solution for modern workplaces. Built with security,
//                 efficiency, and user experience in mind.
//               </p>
//             </div>

//             {/* Right: Quick Links */}
//             <div className="md:w-1/3">
//               <h4 className="text-white font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/visitor-registration" className="hover:text-white transition-colors">
//                     Visitor Check-in
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/login" className="hover:text-white transition-colors">
//                     Employee Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/register" className="hover:text-white transition-colors">
//                     Register
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="border-t border-slate-800 mt-8 pt-8 text-center">
//             <p className="text-slate-400">
//               &copy; {new Date().getFullYear()} Visitor Management System. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>

//     </div>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  Shield,
  UserCheck,
  CalendarCheck,
  Clock,
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  LogOut,
  User,
  Settings,
} from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Visitor Management System</h1>
                <p className="text-xs text-slate-500">Secure • Efficient • Professional</p>
              </div>
            </div>

            {/* Action Buttons - Different based on auth status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {status === "loading" ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm text-slate-500">Loading...</span>
                </div>
              ) : session ? (
                // Logged in user - show user menu
                <div className="flex items-center gap-3">
                  <Button variant="ghost" asChild className="w-full sm:w-auto">
                    <Link href="/visitor-registration" className="w-full text-left sm:text-center">
                      Visitor Check-in
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 px-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-sm">
                            {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline text-sm font-medium">{session.user?.name || "User"}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{session.user?.name}</p>
                          <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                // Not logged in - show login buttons
                <>
                  <Button variant="ghost" asChild className="w-full sm:w-auto">
                    <Link href="/login" className="w-full text-left sm:text-center">
                      Employee Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    <Link href="/visitor-registration" className="flex items-center justify-center w-full sm:w-auto">
                      Visitor Check-in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 bg-white/50 backdrop-blur-sm">
              🚀 Next-Generation Visitor Management
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Secure Your Workplace with
              <span className="text-primary block">Smart Visitor Management</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your visitor experience with our comprehensive management solution. Streamline check-ins,
              enhance security, and maintain compliance effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link href="/visitor-registration">
                  Start Visitor Check-in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!session && (
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-white/50 backdrop-blur-sm">
                  <Link href="/login">Employee Dashboard</Link>
                </Button>
              )}
              {session && (
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-white/50 backdrop-blur-sm">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Key Features
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything You Need for Visitor Management</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive solution covers every aspect of visitor management, from check-in to checkout and
              everything in between.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mt-4">Enhanced Security</CardTitle>
                <CardDescription>Advanced protection protocols</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Multi-layer security with photo verification, approval workflows, and real-time monitoring.
                </p>
                <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Photo Verification
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mt-4">Smart Approvals</CardTitle>
                <CardDescription>Instant notification system</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Real-time notifications and one-click approval system for seamless visitor management.
                </p>
                <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Real-time Alerts
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <CalendarCheck className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl mt-4">Pre-Registration</CardTitle>
                <CardDescription>Schedule visits in advance</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Pre-approve visitors with time-based access and automated QR code generation.
                </p>
                <div className="flex items-center justify-center text-purple-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  QR Code Access
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl mt-4">Auto Tracking</CardTitle>
                <CardDescription>Comprehensive logging</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Automatic entry/exit logging with detailed analytics and compliance reporting.
                </p>
                <div className="flex items-center justify-center text-orange-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Analytics Dashboard
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="relative z-50 py-20 min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full max-w-4xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
              About the Developer
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Built with Passion & Expertise</h2>
            <p className="text-xl text-slate-300">
              Crafted by a dedicated full-stack developer with a passion for creating secure, scalable solutions.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Developer Info */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFOu20VPwdbAg/profile-displayphoto-shrink_200_200/B56ZUpmKexHsAY-/0/1740159630445?e=2147483647&v=beta&t=RfromorK6pM4HMLeEEZ0y6YvGv6tEc1H9oWwtOLyOqE"
                    alt="Developer Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Rishi Rohilla</h3>
                <p className="text-primary text-lg mb-4">Full-Stack Developer & Competitive Programmer</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Competitive Programming", "C++", "Java"].map(
                  (tech) => (
                    <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
                      {tech}
                    </Badge>
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <a href="https://rishi-rohilla-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Portfolio
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <a href="https://github.com/rishirohilla" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <a href="https://linkedin.com/in/rishirohilla88" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Ready to Transform Your Visitor Experience?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Join hundreds of organizations that trust our visitor management system for their security and compliance
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link href="/visitor-registration">
                  <Users className="mr-2 h-5 w-5" />
                  Start Visitor Check-in
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/register">
                  <Building className="mr-2 h-5 w-5" />
                  Register Your Organization
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left: Branding and Description */}
            <div className="md:w-2/3">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Visitor Management System</h3>
                  <p className="text-sm text-slate-400">Secure • Efficient • Professional</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-lg">
                The most comprehensive visitor management solution for modern workplaces. Built with security,
                efficiency, and user experience in mind.
              </p>
            </div>

            {/* Right: Quick Links */}
            <div className="md:w-1/3">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/visitor-registration" className="hover:text-white transition-colors">
                    Visitor Check-in
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Employee Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} Visitor Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
