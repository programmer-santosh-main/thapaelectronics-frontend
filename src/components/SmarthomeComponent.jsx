import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Sparkles, ChevronRight, Home, Zap, Wifi, Shield, Camera, Lightbulb, Speaker } from "lucide-react";
import { colors } from "../theme/colors"; // ✅ Use centralized color palette

export default function SmarthomeComponent() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSmartHomeProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        if (res.ok) {
          const productsArray = data.products || data;

          const smartHomeKeywords = [
            // General Smart Home
            "smart",
            "home",
            "iot",
            "internet of things",
            "connected",
            "automation",
            "automated",
            "wi-fi",
            "wifi",
            "bluetooth",
            "zigbee",
            "z-wave",
            "smart home",
            "smart device",
            
            // Voice Assistants & Hubs
            "alexa",
            "google assistant",
            "siri",
            "homekit",
            "smartthings",
            "smart hub",
            "voice control",
            "voice assistant",
            "smart speaker",
            
            // Security & Safety
            "security",
            "camera",
            "doorbell",
            "surveillance",
            "motion sensor",
            "door sensor",
            "window sensor",
            "alarm",
            "smart lock",
            "smart door",
            "safety",
            "detector",
            
            // Lighting
            "smart light",
            "smart bulb",
            "smart switch",
            "smart plug",
            "smart outlet",
            "dimmer",
            "lighting",
            "led",
            "hue",
            "philips hue",
            
            // Climate Control
            "thermostat",
            "temperature",
            "climate",
            "smart thermostat",
            "air purifier",
            "smart fan",
            "smart heater",
            "smart cooler",
            "humidifier",
            "dehumidifier",
            
            // Entertainment
            "smart tv",
            "streaming",
            "media player",
            "chromecast",
            "roku",
            "fire tv",
            "apple tv",
            "soundbar",
            "smart remote",
            
            // Appliances
            "smart refrigerator",
            "smart oven",
            "smart dishwasher",
            "smart washer",
            "smart dryer",
            "smart scale",
            "smart vacuum",
            "robot vacuum",
            "robot cleaner",
            
            // Other Smart Devices
            "smart mirror",
            "smart display",
            "smart irrigation",
            "smart sprinkler",
            "smart garden",
            "smart pet",
            "smart garage",
            "smart blind",
            "smart curtain",
            "energy monitor",
            "power monitor",
            "water monitor",
            "leak detector"
          ];

          const smartHomeProducts = productsArray.filter((product) => {
            const category = product.category?.toLowerCase();
            const name = product.name?.toLowerCase();
            const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
            const description = product.description?.toLowerCase() || '';
            
            return smartHomeKeywords.some(
              (keyword) =>
                category?.includes(keyword) ||
                name?.includes(keyword) ||
                tags.includes(keyword) ||
                description.includes(keyword)
            );
          });

          const sortedProducts = smartHomeProducts
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);

          setProducts(sortedProducts);
        } else {
          setError(data.message || "Failed to load smart home products.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error loading smart home products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSmartHomeProducts();
  }, [backendUrl]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-green-50/20 rounded-2xl p-6 text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-indigo-600 font-medium">Loading smart home devices...</p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-green-50/20 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <div className="text-red-500 font-bold">!</div>
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // --- No Products State ---
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-green-50/20 rounded-2xl p-6 text-center">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No smart home devices available at the moment.</p>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-green-50/20 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-600 font-medium text-sm">Connected Living</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Smart Home Devices
              </h2>
              <p className="text-gray-600">
                Discover intelligent devices for a connected, automated, and secure home
              </p>
            </div>

            <button
              onClick={() => navigate("/smarthome")}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white rounded-xl font-medium hover:from-indigo-400 hover:to-green-400 transition-all shadow-lg hover:shadow-xl"
            >
              View All Devices
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="text-sm font-medium text-gray-700 mr-2">Popular Categories:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate("/smarthome?category=security")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.indigo[50],
                  color: colors.indigo[600],
                  border: `1px solid ${colors.indigo[200]}`
                }}
              >
                <Shield className="w-3 h-3" />
                Security
              </button>
              <button
                onClick={() => navigate("/smarthome?category=lighting")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.green[50],
                  color: colors.green[600],
                  border: `1px solid ${colors.green[200]}`
                }}
              >
                <Lightbulb className="w-3 h-3" />
                Lighting
              </button>
              <button
                onClick={() => navigate("/smarthome?category=entertainment")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.indigo[50]}, ${colors.green[50]})`,
                  color: colors.green[700],
                  border: `1px solid ${colors.green[200]}`
                }}
              >
                <Speaker className="w-3 h-3" />
                Entertainment
              </button>
              <button
                onClick={() => navigate("/smarthome?category=cameras")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.green[50]}, ${colors.indigo[50]})`,
                  color: colors.indigo[700],
                  border: `1px solid ${colors.indigo[200]}`
                }}
              >
                <Camera className="w-3 h-3" />
                Cameras
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 md:px-8 pb-8">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Smart Home Specific Badges */}
                {product.tags?.some(tag => 
                  ['alexa', 'google assistant', 'siri', 'voice control'].includes(tag.toLowerCase())
                ) && (
                  <div
                    className="absolute -top-2 -left-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.indigo[500]}, ${colors.green[500]})`,
                    }}
                  >
                    <Speaker className="w-3 h-3 inline mr-1" />
                    Voice Control
                  </div>
                )}

                {product.tags?.includes('wireless') && (
                  <div
                    className="absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue[500]}, ${colors.cyan[500]})`,
                    }}
                  >
                    <Wifi className="w-3 h-3 inline mr-1" />
                    Wireless
                  </div>
                )}

                {index === 0 && !product.tags?.includes('voice control') && !product.tags?.includes('wireless') && (
                  <div
                    className="absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.indigo[500]}, ${colors.green[500]})`,
                    }}
                  >
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Top Rated
                  </div>
                )}

                <ProductCard
                  product={product}
                  viewMode="grid"
                  isMobile={false}
                  compact={true}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 md:hidden">
            <button
              onClick={() => navigate("/smarthome")}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white rounded-xl font-medium hover:from-indigo-400 hover:to-green-400 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View All Smart Home Devices
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Smart Home Tips */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Smart Home Tip
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {products.length > 0
                      ? `${products[0].name} works best when integrated into a complete smart home ecosystem. Ensure your devices are compatible with each other for seamless automation.`
                      : "Start your smart home journey with a smart speaker and expand with compatible devices for the best experience."}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/blog/smart-home-tips")}
                    className="px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all text-sm"
                  >
                    Setup Guides
                  </button>
                  <button
                    onClick={() => navigate("/smarthome")}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-green-500 text-white rounded-lg font-medium hover:from-indigo-400 hover:to-green-400 transition-all text-sm"
                  >
                    Shop All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Border */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${colors.indigo[500]}, ${colors.green[500]}, ${colors.indigo[500]})`,
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite",
          }}
        />
        <style>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}