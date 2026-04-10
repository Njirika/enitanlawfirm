import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import NotFound from "@/pages/not-found";

// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import PracticeAreas from "@/pages/PracticeAreas";
import OurTeam from "@/pages/OurTeam";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Messages from "@/pages/admin/Messages";
import Applications from "@/pages/admin/Applications";
import BlogManagement from "@/pages/admin/BlogManagement";
import BlogPostForm from "@/pages/admin/BlogPostForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/practice-areas" component={PracticeAreas} />
      <Route path="/our-team" component={OurTeam} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />

      <Route path="/admin/login" component={AdminLogin} />
      
      {/* Nested Admin Routes inside AdminLayout */}
      <Route path="/admin" nest>
        <AdminLayout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/messages" component={Messages} />
            <Route path="/applications" component={Applications} />
            <Route path="/blog" component={BlogManagement} />
            <Route path="/blog/new" component={BlogPostForm} />
            <Route path="/blog/edit/:slug" component={BlogPostForm} />
          </Switch>
        </AdminLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
