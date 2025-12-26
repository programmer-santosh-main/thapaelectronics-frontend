import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sliders,
  Tag,
  Sparkles,
  AlertCircle,
  Smartphone,
  Battery,
  Camera,
  Cpu,
  Shield,
  Zap,
  Clock,
  Star,
  Flame,
  TrendingUp,
  Activity,
  ChevronRight,
  Wifi,
  Bluetooth,
  SmartphoneCharging,
} from "lucide-react";
import useSEO from "../hooks/useSEO";

export default function Mobile() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const seo = useSEO("mobile");

  // Mobile categories
  const mobileCategories = [
    { value: "all", label: "All Mobiles", icon: <Smartphone className="w-4 h-4" /> },
    { value: "flagship", label: "Flagship", icon: <Zap className="w-4 h-4" /> },
    { value: "midrange", label: "Mid-Range", icon: <Cpu className="w-4 h-4" /> },
    { value: "budget", label: "Budget", icon: <SmartphoneCharging className="w-4 h-4" /> },
    { value: "gaming", label: "Gaming", icon: <Flame className="w-4 h-4" /> },
    { value: "camera", label: "Camera", icon: <Camera className="w-4 h-4" /> },
    { value: "foldable", label: "Foldable", icon: <Activity className="w-4 h-4" /> },
    { value: "5g", label: "5G Phones", icon: <Wifi className="w-4 h-4" /> },
  ];

  // Product categories
  const categories = [
    { value: "all", label: "All Products", icon: <Tag className="w-4 h-4" /> },
    { value: "smartphone", label: "Smartphones", icon: <Smartphone className="w-4 h-4" /> },
    { value: "tablet", label: "Tablets", icon: <Activity className="w-4 h-4" /> },
    { value: "wearable", label: "Wearables", icon: <Shield className="w-4 h-4" /> },
    { value: "accessories", label: "Accessories", icon: <Bluetooth className="w-4 h-4" /> },
    { value: "cases", label: "Cases & Covers", icon: <Shield className="w-4 h-4" /> },
    { value: "chargers", label: "Chargers", icon: <Battery className="w-4 h-4" /> },
    { value: "audio", label: "Audio", icon: <Activity className="w-4 h-4" /> },
  ];

  // Mobile brands
  const brands = [
    { value: "all", label: "All Brands" },
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "xiaomi", label: "Xiaomi" },
    { value: "oneplus", label: "OnePlus" },
    { value: "google", label: "Google" },
    { value: "oppo", label: "Oppo" },
    { value: "vivo", label: "Vivo" },
    { value: "realme", label: "Realme" },
    { value: "nothing", label: "Nothing" },
    { value: "motorola", label: "Motorola" },
    { value: "nokia", label: "Nokia" },
  ];

  // Price ranges for mobiles
  const priceRanges = [
    { min: 0, max: 10000, label: "Under रू 10,000" },
    { min: 10000, max: 25000, label: "रू 10,000 - 25,000" },
    { min: 25000, max: 50000, label: "रू 25,000 - 50,000" },
    { min: 50000, max: 100000, label: "रू 50,000 - 1,00,000" },
    { min: 100000, max: 300000, label: "Over रू 1,00,000" },
  ];

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchMobileProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        if (res.ok) {
          const productsArray = data.products || data;

          // Filter mobile & smartphone products
          const mobileProducts = productsArray.filter((product) => {
            const category = product.category?.toLowerCase();
            const name = product.name?.toLowerCase();
            const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];

            const mobileKeywords = [
              "mobile",
              "smartphone",
              "phone",
              "android",
              "ios",
              "iphone",
              "samsung",
              "xiaomi",
              "oneplus",
              "google pixel",
              "oppo",
              "vivo",
              "realme",
              "tablet",
              "ipad",
              "smartwatch",
              "wearable",
              "earbuds",
              "headphones",
              "charger",
              "case",
              "cover",
              "screen protector",
              "cable",
              "power bank",
              "5g",
              "dual sim",
              "camera phone",
              "gaming phone",
              "foldable",
              "flagship",
              "mid-range",
              "budget phone",
            ];

            return mobileKeywords.some(
              (keyword) =>
                category?.includes(keyword) ||
                name?.includes(keyword) ||
                tags.includes(keyword)
            );
          });

          setProducts(mobileProducts);
          setFilteredProducts(mobileProducts);
        } else {
          setMessage(data.message || "Failed to load mobile products.");
        }
      } catch (err) {
        setMessage("Error loading mobile products.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileProducts();
  }, [backendUrl]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Mobile category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => {
        const category = product.category?.toLowerCase() || "";
        const subCategory = product.subcategory?.toLowerCase() || "";
        const tags = product.tags?.map((tag) => tag.toLowerCase()) || [];
        const name = product.name?.toLowerCase() || "";

        if (selectedCategory === "flagship") {
          const flagshipKeywords = [
            "flagship",
            "premium",
            "pro",
            "ultra",
            "max",
            "pro max",
          ];
          return flagshipKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "midrange") {
          const midrangeKeywords = ["mid", "mid-range", "lite", "fe"];
          return midrangeKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "budget") {
          const budgetKeywords = ["budget", "entry", "a series", "m series"];
          return budgetKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "gaming") {
          const gamingKeywords = ["gaming", "rog", "redmagic", "nubia"];
          return gamingKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "camera") {
          const cameraKeywords = ["camera", "photography", "zoom", "108mp"];
          return cameraKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "foldable") {
          const foldableKeywords = ["fold", "flip", "foldable", "z flip"];
          return foldableKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        } else if (selectedCategory === "5g") {
          const fiveGKeywords = ["5g"];
          return fiveGKeywords.some(
            (keyword) =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword)
          );
        }

        return (
          category.includes(selectedCategory) ||
          subCategory.includes(selectedCategory) ||
          tags.includes(selectedCategory)
        );
      });
    }

    // Brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) =>
        product.brand?.toLowerCase().includes(selectedBrand)
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = product.price || product.finalPrice || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popular":
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case "discount":
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange({ min: 0, max: 300000 });
    setSortBy("newest");
    setShowFilters(false);
  };

  const refreshProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/products`);
      const data = await res.json();
      if (res.ok) {
        const productsArray = data.products || data;
        const mobileProducts = productsArray.filter((product) => {
          const category = product.category?.toLowerCase();
          const keywords = ["mobile", "smartphone", "phone", "tablet", "ipad"];
          return keywords.some((keyword) => category?.includes(keyword));
        });
        setProducts(mobileProducts);
        setFilteredProducts(mobileProducts);
        setMessage("");
      } else {
        setMessage(data.message || "Failed to refresh products.");
      }
    } catch (err) {
      setMessage("Error refreshing products.");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceRangeSelect = (range) => {
    setPriceRange({ min: range.min, max: range.max });
  };

  if (loading) {
    return (
      <>
        {seo}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 flex justify-center items-center px-4">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
            <p className="text-blue-600 font-semibold text-base md:text-lg">
              Loading mobile collection...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-3 md:mb-4" />
          <p className="text-red-500 font-semibold text-base md:text-lg mb-3 md:mb-4">
            {message}
          </p>
          <button
            onClick={refreshProducts}
            className="px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all shadow-lg text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {seo}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 py-6 px-4 md:py-8 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600 font-medium">
                Latest Mobile & Smartphone Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Mobile Store
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
              Discover the latest smartphones, tablets, and mobile accessories from top brands
            </p>
          </motion.div>

          {/* Mobile Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              {
                label: "Total Models",
                value: products.length,
                icon: <Smartphone className="w-5 h-5" />,
                color: "from-blue-100 to-blue-100",
                iconColor: "text-blue-500",
              },
              {
                label: "On Sale",
                value: products.filter((p) => p.discount > 0).length,
                icon: <Tag className="w-5 h-5" />,
                color: "from-purple-100 to-purple-100",
                iconColor: "text-purple-500",
              },
              {
                label: "Top Rated",
                value:
                  products.filter((p) => p.rating >= 4).length ||
                  Math.floor(products.length * 0.3),
                icon: <Star className="w-5 h-5" />,
                color: "from-blue-100 to-purple-100",
                iconColor: "text-blue-500",
              },
              {
                label: "New Arrivals",
                value:
                  products.filter((p) => p.isNew).length ||
                  Math.floor(products.length * 0.2),
                icon: <Zap className="w-5 h-5" />,
                color: "from-purple-100 to-blue-100",
                iconColor: "text-purple-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${stat.color} border border-gray-200`}
                  >
                    <div className={stat.iconColor}>{stat.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile Header & Search */}
          {isMobile && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Mobile Phones
                  </h2>
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length} models available
                  </p>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search smartphones, brands, features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-500 text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Search and Filters Bar */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search by brand, model, or feature..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-500"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl flex items-center gap-2 text-gray-700 transition-colors text-sm"
                    >
                      <Sliders className="w-5 h-5" />
                      Filters
                      {showFilters ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl border border-gray-300 p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2.5 rounded-lg transition-all ${
                          viewMode === "grid"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2.5 rounded-lg transition-all ${
                          viewMode === "list"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Expanded Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-4 border-t border-gray-300/30">
                        {/* Mobile & Category Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          {/* Mobile Category Filter */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Phone Type
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {mobileCategories.map((category) => (
                                <button
                                  key={category.value}
                                  onClick={() => setSelectedCategory(category.value)}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    selectedCategory === category.value
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {category.icon}
                                  {category.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Product Type Filter */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Product Type
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {categories.map((category) => (
                                <button
                                  key={category.value}
                                  onClick={() => setSelectedCategory(category.value)}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    selectedCategory === category.value
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {category.icon}
                                  {category.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Brand Filter */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Brand
                            </label>
                            <select
                              value={selectedBrand}
                              onChange={(e) => setSelectedBrand(e.target.value)}
                              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                            >
                              {brands.map((brand) => (
                                <option key={brand.value} value={brand.value}>
                                  {brand.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Price Range Filters */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Price Range
                          </label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {priceRanges.map((range, index) => (
                              <button
                                key={index}
                                onClick={() => handlePriceRangeSelect(range)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                  priceRange.min === range.min &&
                                  priceRange.max === range.max
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <input
                                type="range"
                                min="0"
                                max="300000"
                                value={priceRange.min}
                                onChange={(e) =>
                                  setPriceRange((prev) => ({
                                    ...prev,
                                    min: parseInt(e.target.value),
                                  }))
                                }
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            <div className="text-sm text-gray-600">
                              रू {priceRange.min.toLocaleString()} - रू{" "}
                              {priceRange.max.toLocaleString()}
                            </div>
                            <div className="flex-1">
                              <input
                                type="range"
                                min="0"
                                max="300000"
                                value={priceRange.max}
                                onChange={(e) =>
                                  setPriceRange((prev) => ({
                                    ...prev,
                                    max: parseInt(e.target.value),
                                  }))
                                }
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sort and Reset */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Sort By
                            </label>
                            <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                            >
                              <option value="newest">Newest First</option>
                              <option value="price-low">
                                Price: Low to High
                              </option>
                              <option value="price-high">
                                Price: High to Low
                              </option>
                              <option value="rating">Top Rated</option>
                              <option value="popular">Most Popular</option>
                              <option value="discount">Highest Discount</option>
                            </select>
                          </div>

                          <div className="flex items-end">
                            <button
                              onClick={resetFilters}
                              className="px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 hover:bg-gray-100 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                              Reset All Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Mobile Filter Modal */}
          <AnimatePresence>
            {isMobile && showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-end"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Mobile Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* Phone Type Filter */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Phone Type
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {mobileCategories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm transition-all ${
                              selectedCategory === category.value
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {category.icon}
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Type Filter */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Product Type
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm transition-all ${
                              selectedCategory === category.value
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {category.icon}
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.slice(0, 8).map((brand) => (
                          <button
                            key={brand.value}
                            onClick={() => setSelectedBrand(brand.value)}
                            className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                              selectedBrand === brand.value
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {brand.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Price Range
                      </h4>
                      <div className="space-y-2">
                        {priceRanges.map((range, index) => (
                          <button
                            key={index}
                            onClick={() => handlePriceRangeSelect(range)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                              priceRange.min === range.min &&
                              priceRange.max === range.max
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{range.label}</span>
                              {priceRange.min === range.min &&
                                priceRange.max === range.max && (
                                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  </div>
                                )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Sort By
                      </h4>
                      <div className="space-y-2">
                        {[
                          "newest",
                          "price-low",
                          "price-high",
                          "rating",
                          "popular",
                          "discount",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                              sortBy === option
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>
                                {option === "newest" && "Newest First"}
                                {option === "price-low" && "Price: Low to High"}
                                {option === "price-high" &&
                                  "Price: High to Low"}
                                {option === "rating" && "Top Rated"}
                                {option === "popular" && "Most Popular"}
                                {option === "discount" && "Highest Discount"}
                              </span>
                              {sortBy === option && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={resetFilters}
                          className="py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedBrand !== "all" ||
            priceRange.min > 0 ||
            priceRange.max < 300000) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>

                {searchTerm && (
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-1">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "all" && (
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-1">
                    {
                      [...mobileCategories, ...categories].find(
                        (c) => c.value === selectedCategory
                      )?.label
                    }
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedBrand !== "all" && (
                  <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm flex items-center gap-1">
                    {brands.find((b) => b.value === selectedBrand)?.label}
                    <button
                      onClick={() => setSelectedBrand("all")}
                      className="hover:text-purple-900 p-1 rounded-full hover:bg-purple-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {(priceRange.min > 0 || priceRange.max < 300000) && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-lg text-sm flex items-center gap-1">
                    Price: रू{priceRange.min.toLocaleString()} - रू
                    {priceRange.max.toLocaleString()}
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 300000 })}
                      className="hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 hover:bg-gray-100 rounded-lg px-2 py-1"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              </div>
            </motion.div>
          )}

          {/* Products Count */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm md:text-base">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-900">{products.length}</span>{" "}
              mobile products
              {searchTerm && (
                <span className="text-blue-600"> for "{searchTerm}"</span>
              )}
            </p>
          </div>

          {/* View Mode Toggle (Mobile) */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Mobile Products Found
              </h3>
              <p className="text-gray-600 mb-6 px-4">
                {searchTerm || selectedCategory !== "all" || selectedBrand !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No mobile products available at the moment."}
              </p>
              {(searchTerm || selectedCategory !== "all" || selectedBrand !== "all") && (
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all shadow-lg"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                viewMode === "grid"
                  ? "grid gap-4 grid-cols-1 sm:grid-cols cell-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={
                    viewMode === "list" && !isMobile ? "max-w-3xl mx-auto" : ""
                  }
                >
                  <ProductCard
                    product={product}
                    viewMode={viewMode}
                    isMobile={isMobile}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mobile Tips Section */}
          {filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 border border-blue-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Mobile Buying Guide
                    </h3>
                    <p className="text-gray-700">
                      Get expert advice on choosing the right smartphone, comparing specs, and understanding features.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/blog/mobile-guide")}
                      className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-all border border-blue-200"
                    >
                      Buying Guide
                    </button>
                    <button
                      onClick={() => navigate("/specs-comparison")}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      Compare Specs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile Refresh Button */}
          {isMobile && (
            <button
              onClick={refreshProducts}
              className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}