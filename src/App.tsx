
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import History from "./pages/History";
import MyBlogs from "./pages/MyBlogs";
import Recent from "./pages/Recent";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BlogProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/*" element={
                <SidebarProvider>
                  <div className="min-h-screen flex w-full">
                    <AppSidebar />
                    <div className="flex-1">
                      <div className="md:hidden p-2">
                        <SidebarTrigger />
                      </div>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/post/:id" element={<BlogPost />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/my-blogs" element={<MyBlogs />} />
                        <Route path="/recent" element={<Recent />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </SidebarProvider>
              } />
            </Routes>
          </BrowserRouter>
        </BlogProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
