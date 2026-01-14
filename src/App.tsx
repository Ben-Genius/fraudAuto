import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/home/Home"));
const VinDecoder = lazy(() => import("./pages/vin-decoder/VinDecoder"));
const LicensePlate = lazy(() => import("./pages/license-plate/LicensePlate"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage").then(module => ({ default: module.CheckoutPage })));
const MaintenanceHistory = lazy(() => import("./pages/maintenanceHistory/MaintenanceHistory").then(module => ({ default: module.MaintenanceHistory })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vin-decoder" element={<VinDecoder />} />
            <Route path="/license-plate" element={<LicensePlate />} />
            <Route path="/maintenance-history" element={<MaintenanceHistory />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
