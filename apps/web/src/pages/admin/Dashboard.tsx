import { useGetAdminStats } from "@workspace/api-client-react";
import { MessageSquare, FileText, FileEdit, Users, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Messages",
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      description: "All time contact form submissions",
      color: "text-blue-600",
    },
    {
      title: "New Messages",
      value: stats?.newMessages || 0,
      icon: Bell,
      description: "Unread inquiries requiring attention",
      color: "text-amber-600",
    },
    {
      title: "Total Applications",
      value: stats?.totalApplications || 0,
      icon: Users,
      description: "All time career applications",
      color: "text-green-600",
    },
    {
      title: "New Applications",
      value: stats?.newApplications || 0,
      icon: FileText,
      description: "Applications pending review",
      color: "text-amber-600",
    },
    {
      title: "Total Blog Posts",
      value: stats?.totalBlogPosts || 0,
      icon: FileEdit,
      description: "Published and draft articles",
      color: "text-purple-600",
    },
    {
      title: "Published Posts",
      value: stats?.publishedBlogPosts || 0,
      icon: FileEdit,
      description: "Live articles on the website",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Here is an overview of your firm's website activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
