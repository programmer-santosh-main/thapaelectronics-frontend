// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import LoginRegister from "./pages/public/LoginRegister";
import Verify from "./pages/public/Verify";
import ForgetPassword from "./pages/public/ForgetPassword";
import ResetPassword from "./pages/public/ResetPassword";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";

import Home from "./pages/Home";
import AdminLogin from "./pages/dashboard/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminUserManagement from "./pages/dashboard/AdminUserManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEditProduct from "./pages/dashboard/AddEditProduct";
import ProductManagement from "./pages/dashboard/ProductManagement";
import Checkout from "./pages/private/Checkout";
import OrderManagement from "./pages/dashboard/OrderManagement";
import MyOrders from "./pages/private/MyOrders";
import Featured from "./pages/Featured";
import AllProducts from "./pages/AllProducts";
import Accessories from "./pages/Accessories";
import SliderManagement from "./pages/dashboard/SliderManagement";

import Policy from "./pages/Policy";
import SiteSetup from "./pages/dashboard/SiteSetup";
import AllTrending from "./pages/AllTrending";
import About from "./pages/About";
import SeoSetup from "./pages/dashboard/SeoSetup";
import Toys from "./pages/Toys";
import Mobile from "./pages/Mobile";
import Automotive from "./pages/Automotive";
import Smarthome from "./pages/Smarthome";
import Audio from "./pages/Audio";
import OAuthSuccess from "./pages/public/OAuthSuccess";

// Theme configuration
const theme = {
  primary: "#7c3aed",
  secondary: "#f59e0b",
  background: "#f8fafc",
  card: "#ffffff",
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
};

// 🧩 Inner component that uses useLocation safely
function AppContent() {
  const location = useLocation();

  // Routes where Navbar & Footer should be hidden
  const hiddenPaths = ["/dashboard", "/login", "/register"];
  const hideLayout = hiddenPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    // Apply theme colors as CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          document.documentElement.style.setProperty(
            `--${key}-${subKey}`,
            subValue
          );
        });
      } else {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });

    // Debug tokens
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20">
      {!hideLayout && <Navbar />}
      <main className={hideLayout ? "pt-0" : "pt-16"}>
        <Routes>
          {/* 🌍 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/smarthome" element={<Smarthome />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/auto" element={<Automotive />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/trending" element={<AllTrending />} />
     
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/about" element={<About />} />
          {/* 👤 USER ROUTES */}
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute type="user">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute type="user">
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute type="user">
                <Checkout />
              </ProtectedRoute>
            }
          />
          {/* 🧑‍💼 ADMIN ROUTES */}
          <Route path="/dashboard/login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute type="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/seo"
            element={
              <ProtectedRoute type="admin">
                <SeoSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manageadmin"
            element={
              <ProtectedRoute type="admin">
                <AdminUserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/sitesetup"
            element={
              <ProtectedRoute type="admin">
                <SiteSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manageslider"
            element={
              <ProtectedRoute type="admin">
                <SliderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute type="admin">
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoute type="admin">
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add-product"
            element={
              <ProtectedRoute type="admin">
                <AddEditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit-product/:id"
            element={
              <ProtectedRoute type="admin">
                <AddEditProduct />
              </ProtectedRoute>
            }
          />
          {/* 🚦 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

// ✅ Wrap AppContent inside <Router> here
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
