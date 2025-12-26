import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Heart,
  MapPin,
  Phone,
  Mail,
  Info,
  CheckCircle,
  AlertCircle,
  Tag,
  Package,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import useSEO from "../hooks/useSEO";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const seo = useSEO("cart");
  // Delivery Address State
  const [deliveryAddress, setDeliveryAddress] = useState({
    country: "Nepal",
    city: "",
    streetAddress: "",
    phone: "",
    email: "",
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    freeDelivery: false,
    deliveryCharges: 0,
    taxApplicable: false,
    taxAmount: 0,
    taxMessage: "",
    deliveryMessage: "",
  });

  // Nepal cities for dropdown
  const nepalCities = [
    "Kathmandu",
    "Bhaktapur",
    "Lalitpur",
    "Pokhara",
    "Other",
  ];

  // Countries list
  const countries = ["Nepal", "Other"];

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      navigate("/login", {
        state: {
          message: "Please login to view your cart",
          returnUrl: "/cart",
        },
      });
      return;
    }

    // Load saved address from localStorage if exists
    const savedAddress =
      JSON.parse(localStorage.getItem("deliveryAddress")) || null;
    if (savedAddress) {
      setDeliveryAddress(savedAddress);
      setAddressSubmitted(true);
      calculateDeliveryInfo(savedAddress);
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setLoading(false);
    
    // Handle window resize for mobile
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  // Calculate delivery info based on address
  const calculateDeliveryInfo = (address) => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0
    );
    const isNepal = address.country === "Nepal";
    const isKathmandu =
      address.city === "Kathmandu" ||
      address.city === "Lalitpur" ||
      address.city === "Bhaktapur";

    const freeDelivery = isNepal && isKathmandu;

    let deliveryCharges = 0;
    let deliveryMessage = "";

    if (isNepal) {
      if (isKathmandu) {
        deliveryMessage = "🎉 FREE Delivery inside Kathmandu Valley!";
      } else if (address.city) {
        deliveryCharges = 500;
        deliveryMessage = `🚚 Delivery charges will apply for ${address.city}. We'll contact you with exact amount.`;
      } else {
        deliveryMessage =
          "📍 Please select your city to calculate delivery charges.";
      }
    } else {
      deliveryMessage =
        "🌍 International delivery charges will be calculated based on your location.";
    }

    // Tax calculation
    const taxApplicable = !isNepal;
    const taxAmount = taxApplicable ? subtotal * 0.18 : 0;
    const taxMessage = taxApplicable
      ? "International orders may have additional taxes/customs fees. We'll inform you via email/phone."
      : "";

    setDeliveryInfo({
      freeDelivery,
      deliveryCharges,
      taxApplicable,
      taxAmount,
      taxMessage,
      deliveryMessage,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!deliveryAddress.country) {
      alert("Please select your country");
      return;
    }
    if (!deliveryAddress.city) {
      alert("Please enter your city");
      return;
    }
    if (!deliveryAddress.streetAddress.trim()) {
      alert("Please enter your street address");
      return;
    }
    if (!deliveryAddress.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!deliveryAddress.email.trim()) {
      alert("Please enter your email address");
      return;
    }

    // Save address to localStorage
    localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));

    // Calculate delivery info
    calculateDeliveryInfo(deliveryAddress);

    setAddressSubmitted(true);
    setShowAddressForm(false);
    
    // Close mobile menu if open
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Recalculate if we have enough info
    if (name === "country" || name === "city") {
      const updatedAddress = { ...deliveryAddress, [name]: value };
      if (updatedAddress.country && updatedAddress.city) {
        calculateDeliveryInfo(updatedAddress);
      }
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );
  const shipping = deliveryInfo.freeDelivery ? 0 : deliveryInfo.deliveryCharges;
  const tax = deliveryInfo.taxApplicable ? deliveryInfo.taxAmount : 0;
  const total = subtotal + shipping + tax;

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, change) => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        const newQuantity = Math.max(
          1,
          Math.min(item.maxStock, item.quantity + change)
        );
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const moveToWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.some((w) => w._id === item._id);

    if (!isAlreadyInWishlist) {
      const wishlistItem = {
        _id: item._id,
        name: item.name,
        price: item.price,
        finalPrice: item.finalPrice,
        discount: item.discount,
        image: item.image,
        brand: item.brand,
      };
      localStorage.setItem(
        "wishlist",
        JSON.stringify([...wishlist, wishlistItem])
      );
      window.dispatchEvent(new Event("wishlistUpdated"));
    }

    removeItem(item._id);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!addressSubmitted) {
      alert("Please provide your delivery address first!");
      setShowAddressForm(true);
      return;
    }

    // Save cart and address info for checkout
    const checkoutData = {
      cart,
      deliveryAddress,
      total,
      subtotal,
      shipping,
      tax,
      deliveryInfo,
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/checkout", { state: checkoutData });
  };

  if (loading) {
    return (
      <>
        {seo}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/20 flex justify-center items-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold">Loading your cart...</p>
          </div>
        </div>
      </>
    );
  }

  if (!cart.length)
    return (
      <>
        {seo}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/20 flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Add some products to your cart and they'll appear here.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => navigate("/products")}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg text-sm md:text-base"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 border-2 border-gray-300 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm md:text-base"
              >
                Go Home
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );

  return (
    <>
      {seo}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/20 py-4 md:py-8 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Back</span>
              </button>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-center flex-1 mx-2">
                Cart ({cart.length})
              </h1>
              <div className="text-xs md:text-sm text-gray-500">
                रू{total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6 md:mb-8">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </button>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Shopping Cart ({cart.length} items)
            </h1>
            <div className="text-sm md:text-base text-gray-500">
              Total: रू{total.toFixed(2)}
            </div>
          </div>

          {/* Delivery Info Banner */}
          {deliveryAddress.country === "Nepal" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 md:mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg gap-2"
            >
              <div className="flex items-start sm:items-center gap-2 md:gap-3">
                <Truck className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <p className="font-bold text-sm md:text-base">
                    🎉 FREE Delivery inside Kathmandu Valley!
                  </p>
                  <p className="text-xs md:text-sm opacity-90">
                    Enter your address to check delivery options
                  </p>
                </div>
              </div>
              {!addressSubmitted && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="bg-white text-green-700 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base self-end sm:self-center"
                >
                  Add Address
                </button>
              )}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        {/* Image */}
                        <div className="relative self-center sm:self-start">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-xl md:rounded-2xl"
                          />
                          {item.discount > 0 && (
                            <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                              -{item.discount}%
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-xs md:text-sm">
                                {item.brand}
                              </p>
                              {item.quantity >= item.maxStock && (
                                <p className="text-xs md:text-sm text-amber-600 mt-1">
                                  ⚠️ Max stock reached ({item.maxStock} units)
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg md:text-2xl font-bold text-green-600">
                                रू{(item.finalPrice * item.quantity).toFixed(2)}
                              </p>
                              {item.discount > 0 && (
                                <p className="text-xs md:text-sm text-gray-400 line-through">
                                  रू{(item.price * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 md:mt-6">
                            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                              <div className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-lg md:rounded-xl p-1">
                                <button
                                  onClick={() => updateQuantity(item._id, -1)}
                                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <span className="w-6 md:w-8 text-center font-bold text-sm md:text-base">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, 1)}
                                  disabled={item.quantity >= item.maxStock}
                                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                              </div>
                              <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                                {item.quantity} × रू{item.finalPrice}
                              </span>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => moveToWishlist(item)}
                                className="flex-1 sm:flex-none px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg md:rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                              >
                                <Heart className="w-3 h-3 md:w-4 md:h-4" />
                                <span>Save</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeItem(item._id)}
                                className="flex-1 sm:flex-none px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-lg md:rounded-xl hover:from-red-200 hover:to-red-300 transition-all flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                              >
                                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                <span>Remove</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar - Order Summary & Address */}
            <div className="lg:col-span-1 space-y-4 md:space-y-6">
              {/* Mobile Sticky Checkout Button */}
              {!showAddressForm && (
                <div className="lg:hidden sticky bottom-0 z-10 bg-white border-t border-gray-200 p-4 -mx-3 sm:-mx-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={!addressSubmitted}
                    className={`w-full py-3 rounded-xl font-bold text-base shadow-lg transition-all ${
                      addressSubmitted
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {addressSubmitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Checkout • रू{total.toFixed(2)}
                      </span>
                    ) : (
                      "Add Address First"
                    )}
                  </motion.button>
                </div>
              )}

              {/* Delivery Address Section */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-3xl shadow-lg p-4 md:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-1 md:gap-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    Delivery Address
                  </h2>
                  {addressSubmitted && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="text-xs md:text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {addressSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 md:space-y-3"
                  >
                    <div className="p-2 md:p-3 bg-green-50 rounded-lg md:rounded-xl border border-green-200">
                      <div className="flex items-center gap-1 md:gap-2 text-green-700 mb-1 md:mb-2">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-semibold text-sm md:text-base">
                          Address Saved
                        </span>
                      </div>
                      <p className="text-gray-700 text-xs md:text-sm truncate">
                        {deliveryAddress.streetAddress}, {deliveryAddress.city},{" "}
                        {deliveryAddress.country}
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm mt-1 truncate">
                        📞 {deliveryAddress.phone} | ✉️ {deliveryAddress.email}
                      </p>
                    </div>

                    {/* Delivery Info */}
                    {deliveryInfo.deliveryMessage && (
                      <div
                        className={`p-2 md:p-3 rounded-lg md:rounded-xl border ${
                          deliveryInfo.freeDelivery
                            ? "bg-green-50 border-green-200"
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-1 md:gap-2">
                          <Info
                            className={`w-3 h-3 md:w-4 md:h-4 mt-0.5 ${
                              deliveryInfo.freeDelivery
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          />
                          <p className="text-xs md:text-sm">
                            {deliveryInfo.deliveryMessage}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-center py-3 md:py-4">
                    <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3">
                      Please add your delivery address to proceed
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 md:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all text-sm md:text-base"
                    >
                      Add Delivery Address
                    </button>
                  </div>
                )}

                {/* Address Form (Modal/Expanded) */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200"
                    >
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-3 md:mb-4">
                        Enter Delivery Details
                      </h3>
                      <form
                        onSubmit={handleAddressSubmit}
                        className="space-y-3 md:space-y-4"
                      >
                        {/* Country */}
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Country *
                          </label>
                          <select
                            name="country"
                            value={deliveryAddress.country}
                            onChange={handleAddressChange}
                            className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                            required
                          >
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          {deliveryAddress.country === "Nepal" ? (
                            <select
                              name="city"
                              value={deliveryAddress.city}
                              onChange={handleAddressChange}
                              className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                              required
                            >
                              <option value="">Select City</option>
                              {nepalCities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name="city"
                              value={deliveryAddress.city}
                              onChange={handleAddressChange}
                              placeholder="Enter your city"
                              className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                              required
                            />
                          )}
                        </div>

                        {/* Street Address */}
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Street Address *
                          </label>
                          <textarea
                            name="streetAddress"
                            value={deliveryAddress.streetAddress}
                            onChange={handleAddressChange}
                            placeholder="Full address with house number, street, area"
                            rows="2"
                            className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm md:text-base"
                            required
                          />
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                              <Phone className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                              Phone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={deliveryAddress.phone}
                              onChange={handleAddressChange}
                              placeholder="98XXXXXXXX"
                              className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                              <Mail className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={deliveryAddress.email}
                              onChange={handleAddressChange}
                              placeholder="your@email.com"
                              className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                              required
                            />
                          </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-2 md:gap-3 pt-2">
                          <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 md:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all text-sm md:text-base"
                          >
                            Save Address
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            className="px-3 md:px-6 border-2 border-gray-300 text-gray-700 py-2 md:py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm md:text-base"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary - Desktop only when address form is open on mobile */}
              {(!showAddressForm || window.innerWidth >= 1024) && (
                <div className="hidden lg:block bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600" />
                    Order Summary
                  </h2>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        रू{subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <div className="text-right">
                        {addressSubmitted ? (
                          <>
                            <span
                              className={
                                deliveryInfo.freeDelivery
                                  ? "text-green-600 font-semibold"
                                  : "font-semibold"
                              }
                            >
                              {deliveryInfo.freeDelivery
                                ? "FREE"
                                : deliveryInfo.deliveryCharges > 0
                                ? `रू${deliveryInfo.deliveryCharges}`
                                : "Calculated"}
                            </span>
                            {!deliveryInfo.freeDelivery &&
                              deliveryInfo.deliveryCharges === 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Will contact you
                                </p>
                              )}
                          </>
                        ) : (
                          <span className="text-gray-400">Add address</span>
                        )}
                      </div>
                    </div>

                    {/* Tax */}
                    {deliveryInfo.taxApplicable && addressSubmitted && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax & Customs</span>
                        <div className="text-right">
                          <span className="text-amber-600 font-semibold">
                            रू{deliveryInfo.taxAmount.toFixed(2)}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Will inform via email/phone
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tax Message for International */}
                    {deliveryInfo.taxMessage && addressSubmitted && (
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <p className="text-sm text-amber-700">
                            {deliveryInfo.taxMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          रू{addressSubmitted ? total.toFixed(2) : "--"}
                        </span>
                      </div>
                      {!addressSubmitted && (
                        <p className="text-sm text-gray-500 mt-2">
                          Complete address to see total
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Checkout Button - Desktop */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={!addressSubmitted}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                      addressSubmitted
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {addressSubmitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        Proceed to Checkout • रू{total.toFixed(2)}
                      </span>
                    ) : (
                      "Add Address First"
                    )}
                  </motion.button>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-6 border-t border-gray-200 mt-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span>Secure SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="w-5 h-5 text-blue-500" />
                      <span>Free shipping in Kathmandu Valley</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CreditCard className="w-5 h-5 text-purple-500" />
                      <span>Cash on Delivery Available</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue Shopping */}
              <div className="text-center hidden lg:block">
                <button
                  onClick={() => navigate("/products")}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}