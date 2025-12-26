// Accessories.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { 
  Cpu, 
  Smartphone, 
  Tv, 
  Headphones, 
  Watch, 
  Camera, 
  Gamepad2, 
  Home,
  ChevronRight,
  Zap,
  Sparkles,
  Battery,
  Cable,
  Zap as Power,
  Speaker,
  Monitor,
  Mouse,
  Keyboard,
  Router
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

export default function Accessories() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const seo = useSEO("accessories");

  const accessoriesCategories = [
    { name: "Chargers", icon: <Zap className="w-5 h-5" /> },
    { name: "Cables", icon: <Cable className="w-5 h-5" /> },
    { name: "Power Banks", icon: <Battery className="w-5 h-5" /> },
    { name: "Audio", icon: <Speaker className="w-5 h-5" /> },
    { name: "Monitors", icon: <Monitor className="w-5 h-5" /> },
    { name: "Mice", icon: <Mouse className="w-5 h-5" /> },
    { name: "Keyboards", icon: <Keyboard className="w-5 h-5" /> },
    { name: "Networking", icon: <Router className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        if (res.ok) {
          const productsArray = data.products || data;
          const accessories = productsArray.filter(product =>
            product.category &&
            (product.category.toLowerCase().includes("accessories") ||
            product.category.toLowerCase().includes("gadgets") ||
            ["charger", "cable", "adapter", "power bank", "battery", "headphone", "earphone", "mouse", "keyboard", "monitor", "speaker", "webcam", "router", "switch", "dock", "stand", "mount", "protector", "case", "cover"].some(keyword =>
              product.name?.toLowerCase().includes(keyword) ||
              product.category?.toLowerCase().includes(keyword) ||
              product.description?.toLowerCase().includes(keyword)
            ))
          );

          setAccessoriesProducts(accessories);
          setDisplayProducts(accessories.slice(0, 6));
        } else {
          setMessage(data.message || "Failed to load accessories products.");
        }
      } catch (err) {
        setMessage("Error loading accessories products.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, [backendUrl]);

  useEffect(() => {
    if (showAll) setDisplayProducts(accessoriesProducts);
    else setDisplayProducts(accessoriesProducts.slice(0, 6));
  }, [showAll, accessoriesProducts]);

  const handleShowAll = () => setShowAll(true);
  const handleCategoryClick = (categoryName) =>
    navigate(`/products?category=${categoryName.toLowerCase()}`);

  if (loading) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-green-50/20 to-blue-50/20 p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p className="text-green-600 font-semibold text-base sm:text-lg">
            Loading accessories...
          </p>
        </div>
      </>
    );
  }

  if (message) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-green-50/20 to-blue-50/20">
          <div className="text-center w-full max-w-sm">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-accent-red" />
            </div>
            <p className="text-accent-red font-semibold text-base sm:text-lg mb-4">{message}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-400 hover:to-blue-400 transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-blue-50/20 py-8 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium text-sm sm:text-base">
                Essential Tech
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-clip-text text-transparent mb-3">
              Electrical Accessories & Gadgets
            </h1>
            <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
              Discover essential electrical accessories, cables, chargers, and tech gadgets to enhance your devices.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 text-center">
              Browse Accessories Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {accessoriesCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group flex flex-col items-center p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-blue-100 group-hover:from-green-200 group-hover:to-blue-200 mb-2 sm:mb-3">
                    <div className="text-green-600 group-hover:text-green-700">
                      {category.icon}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-green-600 text-center">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Featured Accessories
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {showAll
                    ? `Showing all ${accessoriesProducts.length} accessories`
                    : `Showing ${displayProducts.length} of ${accessoriesProducts.length} accessories`}
                </p>
              </div>

              {!showAll && accessoriesProducts.length > 6 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowAll}
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-400 hover:to-blue-400 transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Show All</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </div>

            {/* Products Grid */}
            {displayProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cable className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  No Accessories Found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Check back soon for new electrical accessories!
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {displayProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="h-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {showAll && accessoriesProducts.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      onClick={() => setShowAll(false)}
                      className="px-5 py-2.5 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all border border-green-200 hover:border-green-300"
                    >
                      Show Less
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 sm:p-8 text-center text-white shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Need Help Finding the Right Accessory?
            </h3>
            <p className="mb-6 max-w-2xl mx-auto opacity-90 text-sm sm:text-base">
              Our tech experts can help you find the perfect electrical accessories and gadgets for your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-5 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/products")}
                className="px-5 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Browse All Categories
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}