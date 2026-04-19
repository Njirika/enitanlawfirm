import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { setBaseUrl } from "@workspace/api-client-react";
import { validateEnv, config } from "./config";
import NotFound from "@/pages/not-found";

// Ensure all required environment variables are present
const env = validateEnv();

// Configure API client
setBaseUrl(config.apiUrl);

// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import PracticeAreas from "@/pages/PracticeAreas";
import OurTeam from "@/pages/OurTeam";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";

// Industry Pages
import OilGas from "@/pages/industries/OilGas";
import Maritime from "@/pages/industries/Maritime";
import BankingInsurance from "@/pages/industries/BankingInsurance";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Messages from "@/pages/admin/Messages";
import Applications from "@/pages/admin/Applications";
import BlogManagement from "@/pages/admin/BlogManagement";
import BlogPostForm from "@/pages/admin/BlogPostForm";
import AdminProfile from "@/pages/admin/Profile";

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
      <Route path="/industries/oil-gas" component={OilGas} />
      <Route path="/industries/maritime" component={Maritime} />
      <Route path="/industries/banking-insurance" component={BankingInsurance} />

      
      {/* Nested Admin Routes inside AdminLayout */}
      <Route path="/admin" nest>
        <AdminLayout>
          <Switch>
            <Route path="/login" component={AdminLogin} />
            <Route path="/" component={Dashboard} />
            <Route path="/messages" component={Messages} />
            <Route path="/applications" component={Applications} />
            <Route path="/blog" component={BlogManagement} />
            <Route path="/blog/new" component={BlogPostForm} />
            <Route path="/blog/edit/:slug" component={BlogPostForm} />
            <Route path="/profile" component={AdminProfile} />
          </Switch>
        </AdminLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  if (!env.isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration Error</h1>
          <p className="text-gray-600 mb-6">
            Some required environment variables are missing. Please check your Vercel deployment settings.
          </p>
          <div className="bg-red-50 p-4 rounded-lg text-left overflow-auto max-h-48 mb-6">
            <p className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-2">Missing Keys:</p>
            <ul className="text-sm font-mono text-red-700">
              {env.missing.map((key) => <li key={key}>• {key}</li>)}
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Once you add these variables to Vercel, redeploy the project to apply the changes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={config.basePath.replace(/\/$/, "")}>
            <ScrollToTop />
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
