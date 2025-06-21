import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { VisitorStats } from "@/components/dashboard/visitor-stats"
import { RecentVisitors } from "@/components/dashboard/recent-visitors"
import { PendingApprovals } from "@/components/dashboard/pending-approvals"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <VisitorStats />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Visitors</CardTitle>
                <CardDescription>List of visitors who recently checked in</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentVisitors />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Visitors waiting for your approval</CardDescription>
              </CardHeader>
              <CardContent>
                <PendingApprovals />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Analytics</CardTitle>
              <CardDescription>Detailed analytics about visitor traffic</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-slate-500">Analytics charts will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download visitor reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-slate-500">Report generation tools will appear here</p>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
