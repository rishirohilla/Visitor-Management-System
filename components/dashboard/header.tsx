import type React from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface DashboardHeaderProps {
  heading?: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading = "Dashboard",
  text = "Welcome to your visitor management dashboard",
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  )
}
