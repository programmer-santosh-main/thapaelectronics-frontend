import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Shield,
  ArrowRight,
  Key,
} from "lucide-react";
import useSEO from "../../hooks/useSEO";

export default function LoginRegister() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    fullname: false,
    contact: false,
    email: false,
    password: false,
  });
  const seo = useSEO("login");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${backendUrl}/api/auth/login`
        : `${backendUrl}/api/auth/register`;

      const payload = isLogin
        ? {
            identifier: formData.email || formData.contact,
            password: formData.password,
          }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => (window.location.href = "/home"), 1200);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setMessage("⚠️ Server not reachable. Check backend.");
      setLoading(false);
    }
  };

  // ✅ Social login handlers (NO CSS CHANGES, just opens backend OAuth routes)
  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${backendUrl}/api/auth/facebook`;
  };

  return (
    <>
      {seo}
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 p-4 md:p-6 flex justify-center items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "vw",
                y: Math.random() * 100 + "vh",
              }}
              animate={{
                x: Math.random() * 100 + "vw",
                y: Math.random() * 100 + "vh",
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Subtle Grid */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 w-full max-w-md p-8 md:p-10 border border-emerald-800/30"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </motion.h2>
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-emerald-200/70 text-sm mt-2"
            >
              {isLogin
                ? "Sign in to continue to your account"
                : "Join our secure community"}
            </motion.p>
          </div>

          {/* ✅ Social Buttons (Responsive) */}
<div className="mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {/* Google Button with Enhanced Animation */}
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: "0 10px 25px -5px rgba(66, 133, 244, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={handleGoogleLogin}
      className="relative w-full group overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-emerald-800/30 hover:border-blue-500 rounded-xl p-3 text-white transition-all duration-300"
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.816 32.654 29.268 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 16.108 19.01 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4c-7.682 0-14.356 4.328-17.694 10.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.191 35.091 26.715 36 24 36c-5.246 0-9.78-3.321-11.288-7.946l-6.52 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.09 12.09 0 0 1-4.086 5.565l.003-.002 6.19 5.238C36.971 39.201 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-md group-hover:blur-lg transition-all duration-300 rounded-full" />
        </motion.div>
        <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-100 transition-all duration-300">
          Sign in with Google
        </span>
      </span>
      
      {/* Floating Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{ 
            x: -10, 
            y: Math.random() * 40,
            opacity: 0 
          }}
          animate={{ 
            x: "100%", 
            y: Math.random() * 40,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </motion.button>

    {/* Facebook Button with Enhanced Animation */}
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: "0 10px 25px -5px rgba(24, 119, 242, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={handleFacebookLogin}
      className="relative w-full group overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-teal-800/30 hover:border-blue-600 rounded-xl p-3 text-white transition-all duration-300"
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/0 via-blue-600/10 to-blue-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="relative"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              fill="#1877F2"
              d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06C2 17.08 5.657 21.22 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.776-1.63 1.57v1.88h2.773l-.443 2.91h-2.33V22C18.343 21.22 22 17.08 22 12.06Z"
            />
            <path
              fill="#fff"
              d="M15.893 14.97l.443-2.91h-2.773v-1.88c0-.794.387-1.57 1.63-1.57h1.26v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.384-3.777 3.89v2.215h-2.54v2.91h2.54V22a10.08 10.08 0 0 0 3.125 0v-7.03h2.33Z"
            />
          </svg>
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-blue-600/20 blur-md group-hover:blur-lg transition-all duration-300 rounded-full" />
        </motion.div>
        <span className="bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-100 transition-all duration-300">
          Sign in with Facebook
        </span>
      </span>
      
      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-500/30 rounded-xl"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{ 
            x: -10, 
            y: Math.random() * 40,
            opacity: 0 
          }}
          animate={{ 
            x: "100%", 
            y: Math.random() * 40,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3 + 0.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </motion.button>
  </div>

  {/* Enhanced Divider */}
  <motion.div 
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="flex items-center gap-3 my-5"
  >
    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    <motion.span 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity 
      }}
      className="text-xs text-emerald-300 whitespace-nowrap px-3 py-1 rounded-full bg-emerald-900/20"
    >
      OR CONTINUE WITH
    </motion.span>
    <div className="h-px w-full bg-gradient-to-l from-transparent via-teal-500/30 to-transparent" />
  </motion.div>
</div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="register-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Full Name
                    </label>
                    <div
                      className={`relative transition-all ${
                        isFocused.fullname
                          ? "ring-2 ring-emerald-500/30 rounded-lg"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="fullname"
                        placeholder="Enter your full name"
                        value={formData.fullname}
                        onChange={handleChange}
                        onFocus={() => handleFocus("fullname")}
                        onBlur={() => handleBlur("fullname")}
                        className="w-full bg-gray-800/50 border border-emerald-800/30 rounded-xl p-3 pl-11 text-white placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500 transition-all"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Contact Number
                    </label>
                    <div
                      className={`relative transition-all ${
                        isFocused.contact
                          ? "ring-2 ring-teal-500/30 rounded-lg"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="contact"
                        placeholder="Enter contact number"
                        value={formData.contact}
                        onChange={handleChange}
                        onFocus={() => handleFocus("contact")}
                        onBlur={() => handleBlur("contact")}
                        className="w-full bg-gray-800/50 border border-teal-800/30 rounded-xl p-3 pl-11 text-white placeholder-teal-500/50 focus:outline-none focus:border-teal-500 transition-all"
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Email Address
                    </label>
                    <div
                      className={`relative transition-all ${
                        isFocused.email
                          ? "ring-2 ring-emerald-500/30 rounded-lg"
                          : ""
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        className="w-full bg-gray-800/50 border border-emerald-800/30 rounded-xl p-3 pl-11 text-white placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500 transition-all"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {isLogin && (
                <motion.div
                  key="login-email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Email or Contact
                  </label>
                  <div
                    className={`relative transition-all ${
                      isFocused.email
                        ? "ring-2 ring-emerald-500/30 rounded-lg"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email or contact"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full bg-gray-800/50 border border-emerald-800/30 rounded-xl p-3 pl-11 text-white placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500 transition-all"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-2">
                Password
              </label>
              <div
                className={`relative transition-all ${
                  isFocused.password ? "ring-2 ring-teal-500/30 rounded-lg" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full bg-gray-800/50 border border-teal-800/30 rounded-xl p-3 pr-11 pl-11 text-white placeholder-teal-500/50 focus:outline-none focus:border-teal-500 transition-all"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 ml-auto w-fit"
                >
                  <Key className="w-3 h-3" />
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full relative overflow-hidden rounded-xl p-3.5 font-semibold shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-emerald-800/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className="w-5 h-5" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
              {!loading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          </form>

          {/* Toggle Between Login/Register */}
          <div className="mt-8 pt-6 border-t border-emerald-800/30">
            <p className="text-center text-emerald-200/70 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
                className="text-emerald-300 hover:text-emerald-200 font-bold text-2xl transition-colors inline-flex items-center gap-1"
              >
                {isLogin ? "Register now" : "Sign in"}
                <ArrowRight className="w-3 h-3" />
              </button>
            </p>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-6 p-3 rounded-xl border backdrop-blur-sm ${
                  message.includes("✅")
                    ? "bg-emerald-900/30 border-emerald-800 text-emerald-300"
                    : message.includes("⚠️")
                    ? "bg-yellow-900/30 border-yellow-800 text-yellow-300"
                    : "bg-red-900/30 border-red-800 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      message.includes("✅")
                        ? "bg-emerald-500 animate-pulse"
                        : message.includes("⚠️")
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm font-medium">{message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400/60">
              <Shield className="w-3 h-3" />
              <span>Your data is protected with end-to-end encryption</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
