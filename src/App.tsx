import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderWrapper } from "@/components/auth/AuthProvider";
import { SessionManager } from "@/components/auth/SessionManager";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { PublicOnlyGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import JobsList from "./pages/jobs/JobsList";
import JobDetail from "./pages/jobs/JobDetail";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import AdminPanel from "./pages/admin/AdminPanel";

const App = () => (
  <BrowserRouter>
    <AuthProviderWrapper>
      <TooltipProvider>
        <SessionManager>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<PublicOnlyGuard><Login /></PublicOnlyGuard>} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredPermission={{ resource: 'dashboard', action: 'R' }}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRoles={['hr_admin', 'super_admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employees" 
              element={
                <ProtectedRoute requiredRoles={['hr_admin', 'super_admin']}>
                  <EmployeeDirectory />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionManager>
      </TooltipProvider>
    </AuthProviderWrapper>
  </BrowserRouter>
);

export default App;
