import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Laptop,
  Camera,
  Headphones,
  Wifi,
  Package,
  Car,
  Home,
  Cpu,
  Gamepad2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { 
    name: "Accessories", 
    icon: <Package className="w-6 h-6" />, 
    color: "from-amber-400 to-yellow-400", 
    href: "/accessories" 
  },
  { 
    name: "Mobile", 
    icon: <Smartphone className="w-6 h-6" />, 
    color: "from-blue-400 to-cyan-400", 
    href: "/mobile" 
  },
  { 
    name: "Computer", 
    icon: <Laptop className="w-6 h-6" />, 
    color: "from-gray-500 to-gray-700", 
    href: "/computer" 
  },
  { 
    name: "Camera", 
    icon: <Camera className="w-6 h-6" />, 
    color: "from-purple-400 to-violet-400", 
    href: "/security" 
  },
  { 
    name: "Audio", 
    icon: <Headphones className="w-6 h-6" />, 
    color: "from-red-400 to-pink-400", 
    href: "/audio" 
  },
  { 
    name: "Networking", 
    icon: <Wifi className="w-6 h-6" />, 
    color: "from-green-400 to-emerald-400", 
    href: "/tools" 
  },
  { 
    name: "Toys", 
    icon: <Gamepad2 className="w-6 h-6" />, 
    color: "from-pink-400 to-rose-400", 
    href: "/toys" 
  },
  { 
    name: "Automotive", 
    icon: <Car className="w-6 h-6" />, 
    color: "from-orange-400 to-amber-400", 
    href: "/automotive" 
  },
  { 
    name: "Home Devices", 
    icon: <Home className="w-6 h-6" />, 
    color: "from-indigo-400 to-blue-400", 
    href: "/smarthome" 
  },
];

export default function SwipeCategory() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Accessories");

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCategories = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    if (category.href) {
      navigate(category.href);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => scrollCategories("right"),
    onSwipedRight: () => scrollCategories("left"),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <Package className="w-6 h-6 text-blue-500" />
            <span className="text-blue-600 font-semibold">Browse Categories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our wide range of tech products and gadgets
          </p>
        </div>

        {/* Swipe hint (mobile only) */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-sm text-gray-500">
          <span>Swipe to explore →</span>
        </div>

        {/* Category Carousel */}
        <div className="relative">
          {/* Desktop arrows */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scrollCategories("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-xl hidden md:flex"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scrollCategories("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-xl hidden md:flex"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile swipeable container */}
          <div className="md:hidden" {...swipeHandlers}>
            <div
              ref={containerRef}
              className="flex space-x-3 sm:space-x-4 pb-3 sm:pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-1"
            >
              {categories.map((category) => (
                <div key={category.name} className="flex-shrink-0 snap-start">
                  <CategoryCard
                    category={category}
                    isSelected={selectedCategory === category.name}
                    onClick={() => handleCategoryClick(category)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop scroll container */}
          <div className="hidden md:block">
            <div
              ref={containerRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0"
                >
                  <CategoryCard
                    category={category}
                    isSelected={selectedCategory === category.name}
                    onClick={() => handleCategoryClick(category)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected category info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 shadow-sm">
              <span className="text-sm sm:text-base text-blue-700">
                Selected: <strong>{selectedCategory}</strong>
              </span>
              <button
                onClick={() => {
                  const selectedCat = categories.find(
                    (c) => c.name === selectedCategory
                  );
                  if (selectedCat?.href) navigate(selectedCat.href);
                }}
                className="text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center gap-1 shadow-sm"
              >
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-start { scroll-snap-align: start; }
        .scroll-smooth { scroll-behavior: smooth; }

        @media (max-width: 768px) {
          .mobile-category-card {
            width: 7rem;
            height: 7rem;
            padding: 0.75rem;
          }
          .mobile-category-card .category-icon {
            width: 3rem;
            height: 3rem;
          }
          .mobile-category-card .category-icon svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

// Category Card Component
function CategoryCard({ category, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-5 bg-white rounded-2xl border-2 transition-all duration-300 flex flex-col items-center shadow-sm hover:shadow-md 
        md:w-36 md:h-36 mobile-category-card
        ${
          isSelected
            ? "border-blue-400 shadow-lg shadow-blue-100 scale-105"
            : "border-gray-200 hover:border-blue-300"
        }`}
    >
      {isSelected && (
        <motion.div
          layoutId="selectedCategory"
          className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </motion.div>
      )}

      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md category-icon`}
      >
        <div className="text-white">{category.icon}</div>
      </div>

      <span
        className={`font-medium text-center transition-colors text-xs sm:text-sm md:text-base ${
          isSelected
            ? "text-blue-600 font-semibold"
            : "text-gray-900 group-hover:text-blue-600"
        }`}
      >
        {category.name}
      </span>

      <div
        className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${
          isSelected ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}