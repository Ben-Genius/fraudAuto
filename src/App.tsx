import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/home/Home"));
const VinDecoder = lazy(() => import("./pages/vin-decoder/VinDecoder"));
const LicensePlate = lazy(() => import("./pages/license-plate/LicensePlate"));
// const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage").then(module => ({ default: module.CheckoutPage })));
const MaintenanceHistory = lazy(() => import("./pages/maintenanceHistory/MaintenanceHistory").then(module => ({ default: module.MaintenanceHistory })));
const VehicleHistory = lazy(() => import("./pages/vin-decoder/VehicleHistory"));

// Dashboard — nested layout + sub-pages
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const VinLookup = lazy(() => import("./pages/dashboard/VinLookup"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Authenticated app — nested dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="vin-lookup" element={<VinLookup />} />
            {/* Catch-all inside dashboard → redirect to overview */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Public routes — wrapped in public Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vin-decoder" element={<VinDecoder />} />
                <Route path="/license-plate" element={<LicensePlate />} />
                <Route path="/maintenance-history" element={<MaintenanceHistory />} />
                {/* <Route path="/pricing" element={<Pricing />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/vehicle-history" element={<VehicleHistory />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
