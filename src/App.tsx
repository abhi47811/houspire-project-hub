import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalSearch } from "@/components/GlobalSearch";
import { PageLoader } from "@/components/ui/loading-spinner";
import { FlowTracker } from "@/components/debug/FlowTracker";
import { MutationMonitorProvider } from "@/components/debug/MutationMonitorProvider";
import { RouteErrorBoundary } from "@/components/debug/RouteErrorBoundary";
import { ApiSetupBanner } from "@/components/setup/ApiSetupBanner";

// Lazy load pages for code splitting
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const RoomDetail = lazy(() => import("./pages/RoomDetail"));
const Budget = lazy(() => import("./pages/Budget"));
const Vendors = lazy(() => import("./pages/Vendors"));
const Team = lazy(() => import("./pages/Team"));
const Admin = lazy(() => import("./pages/Admin"));
const Library = lazy(() => import("./pages/Library"));
const LibraryAnalyzer = lazy(() => import("./pages/LibraryAnalyzer"));
const ApprovalDashboard = lazy(() => import("./pages/admin/ApprovalDashboard"));
const ApiTestPage = lazy(() => import("./pages/ApiTestPage"));
const DiagnosticPage = lazy(() => import("./pages/DiagnosticPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RoomRedirect = lazy(() => import("./pages/RoomRedirect"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MutationMonitorProvider />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <FlowTracker />
          <ApiSetupBanner />
          <BrowserRouter>
          <AuthProvider>
            <GlobalSearch />
            <Suspense fallback={<PageLoader text="Loading..." />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                  <RouteErrorBoundary routeName="Login">
                    <Login />
                  </RouteErrorBoundary>
                } />
                
                <Route path="/diagnostic" element={
                  <RouteErrorBoundary routeName="Diagnostic">
                    <DiagnosticPage />
                  </RouteErrorBoundary>
                } />
                
                {/* Old URL pattern redirect */}
                <Route path="/room/:roomId" element={
                  <RouteErrorBoundary routeName="RoomRedirect">
                    <RoomRedirect />
                  </RouteErrorBoundary>
                } />

                {/* Protected Routes with App Layout */}
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={
                    <RouteErrorBoundary routeName="Dashboard">
                      <Dashboard />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/projects" element={
                    <RouteErrorBoundary routeName="Projects">
                      <Projects />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/projects/:id" element={
                    <RouteErrorBoundary routeName="ProjectDetail">
                      <ProjectDetail />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/projects/:projectId/rooms/:roomId" element={
                    <RouteErrorBoundary routeName="RoomDetail">
                      <RoomDetail />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/projects/:projectId/budget" element={
                    <RouteErrorBoundary routeName="Budget">
                      <Budget />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/projects/:projectId/vendors" element={
                    <RouteErrorBoundary routeName="Vendors">
                      <Vendors />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/library" element={
                    <RouteErrorBoundary routeName="Library">
                      <Library />
                    </RouteErrorBoundary>
                  } />
                  <Route path="/team" element={
                    <RouteErrorBoundary routeName="Team">
                      <Team />
                    </RouteErrorBoundary>
                  } />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <RouteErrorBoundary routeName="Admin">
                          <Admin />
                        </RouteErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/approval"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <RouteErrorBoundary routeName="ApprovalDashboard">
                          <ApprovalDashboard />
                        </RouteErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/library-analyzer"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <RouteErrorBoundary routeName="LibraryAnalyzer">
                          <LibraryAnalyzer />
                        </RouteErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/api-test"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <RouteErrorBoundary routeName="ApiTest">
                          <ApiTestPage />
                        </RouteErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
