"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, RefreshCw, AlertCircle } from "lucide-react"
import Webcam from "react-webcam"
import Link from "next/link"

export default function VisitorRegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    hostEmail: "",
    hostDepartment: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [photoData, setPhotoData] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setPhotoData(imageSrc)
        setShowCamera(false)
        console.log("Photo captured successfully, length:", imageSrc.length)
      } else {
        toast({
          title: "Camera Error",
          description: "Failed to capture photo. Please try again.",
          variant: "destructive",
        })
      }
    }
  }, [webcamRef, toast])

  const retakePhoto = () => {
    setPhotoData(null)
    setShowCamera(true)
  }

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    }
    if (step === 2) {
      if (!formData.purpose || !formData.hostEmail || !formData.hostDepartment) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    }
    setStep((prevStep) => prevStep + 1)
  }

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async () => {
    console.log("=== FRONTEND: Form submission started ===")
    setSubmitError(null)

    // Validate all required fields
    const requiredFields = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      purpose: formData.purpose,
      hostEmail: formData.hostEmail,
      hostDepartment: formData.hostDepartment,
      photoData: photoData,
    }

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key)

    if (missingFields.length > 0) {
      console.log("FRONTEND: Missing required fields:", missingFields)
      toast({
        title: "Missing Information",
        description: `Please provide: ${missingFields.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    if (!photoData) {
      console.log("FRONTEND: No photo data available")
      toast({
        title: "Photo Required",
        description: "Please capture your photo before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const requestBody = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        purpose: formData.purpose.trim(),
        hostEmail: formData.hostEmail.trim(),
        hostDepartment: formData.hostDepartment,
        photoData: photoData,
        checkInTime: new Date().toISOString(),
      }

      console.log("FRONTEND: Sending request with data:", {
        ...requestBody,
        photoData: `[Photo data: ${photoData.length} characters]`,
      })

      const response = await fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("FRONTEND: Response received - Status:", response.status, "OK:", response.ok)

      let data
      try {
        data = await response.json()
        console.log("FRONTEND: Response data:", data)
      } catch (parseError) {
        console.error("FRONTEND: Failed to parse response JSON:", parseError)
        throw new Error("Invalid response from server")
      }

      if (!response.ok) {
        console.error("FRONTEND: Request failed with status:", response.status, "Data:", data)
        throw new Error(data.message || `Server error: ${response.status}`)
      }

      if (!data.visitorId) {
        console.error("FRONTEND: No visitor ID in response:", data)
        throw new Error("Invalid response: missing visitor ID")
      }

      console.log("FRONTEND: Registration successful, visitor ID:", data.visitorId)

      toast({
        title: "Check-in Successful",
        description: "Your host has been notified of your arrival.",
      })

      // Navigate to confirmation page
      console.log("FRONTEND: Navigating to confirmation page")
      router.push(`/visitor-confirmation/${data.visitorId}`)
    } catch (error) {
      console.error("FRONTEND: Registration error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to register. Please try again."
      setSubmitError(errorMessage)
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isStep1Valid = formData.fullName && formData.email && formData.phone
  const isStep2Valid = formData.purpose && formData.hostEmail && formData.hostDepartment

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          ← Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Visitor Check-in</CardTitle>
            <CardDescription className="text-center">
              Please provide your information to check in as a visitor (Step {step} of 3)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">Registration Failed</p>
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Visit *</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    placeholder="Meeting with HR team regarding recruitment"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostEmail">Host Email *</Label>
                  <Input
                    id="hostEmail"
                    name="hostEmail"
                    type="email"
                    placeholder="host@example.com"
                    value={formData.hostEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostDepartment">Host Department *</Label>
                  <Select
                    value={formData.hostDepartment}
                    onValueChange={(value) => handleSelectChange("hostDepartment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium">Photo Capture</h3>
                  <p className="text-sm text-slate-500">We need to take your photo for security purposes</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  {!showCamera && !photoData && (
                    <Button type="button" onClick={() => setShowCamera(true)} className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Start Camera
                    </Button>
                  )}

                  {showCamera && !photoData && (
                    <div className="space-y-4 w-full">
                      <div className="border rounded-md overflow-hidden max-w-md mx-auto">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{
                            facingMode: "user",
                            width: 640,
                            height: 480,
                          }}
                          className="w-full h-auto"
                        />
                      </div>
                      <Button type="button" onClick={capturePhoto} className="w-full max-w-md mx-auto">
                        Capture Photo
                      </Button>
                    </div>
                  )}

                  {photoData && (
                    <div className="space-y-4 w-full">
                      <div className="border rounded-md overflow-hidden max-w-md mx-auto">
                        <img src={photoData || "/placeholder.svg"} alt="Captured" className="w-full h-auto" />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={retakePhoto}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Retake Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className={step > 1 ? "" : "ml-auto"}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !photoData}
                className={step > 1 ? "" : "ml-auto"}
              >
                {isLoading ? "Processing..." : "Complete Check-in"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
