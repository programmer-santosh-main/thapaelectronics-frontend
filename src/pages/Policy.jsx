// src/pages/Policy.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  CreditCard,
  Truck,
  RefreshCw,
  XCircle,
  HelpCircle,
  Mail,
  Phone,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Users,
  ShoppingBag,
  Package,
  Clock,
  Cpu,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Wifi,
  Battery,
} from "lucide-react";
import { colors } from "../theme/colors";
import useSEO from "../hooks/useSEO";

export default function Policy() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const policySections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Lock className="w-5 h-5" />,
      lastUpdated: "December 06, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Information We Collect</h3>
        <p class="mb-3">We collect information to provide better services for our electronics customers. The types of information we collect include:</p>
        
        <h4 class="font-semibold mb-2">Personal Information:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Name, email address, phone number</li>
          <li>Shipping and billing addresses</li>
          <li>Payment information (processed securely through payment gateways)</li>
          <li>Technical specifications of devices you're interested in</li>
        </ul>
        
        <h4 class="font-semibold mb-2">Usage Information:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Browser type and device information</li>
          <li>IP address and location data</li>
          <li>Product specifications you view</li>
          <li>Search queries for electronics and gadgets</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">How We Use Your Information</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Process and fulfill your electronics orders</li>
          <li>Send order confirmations and shipping updates</li>
          <li>Provide technical support for electronic products</li>
          <li>Recommend compatible accessories and gadgets</li>
          <li>Send promotional emails about new tech products (you can opt-out anytime)</li>
          <li>Prevent fraud and unauthorized transactions</li>
        </ul>
      `,
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: "December 05, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Account Registration</h3>
        <p class="mb-3">To purchase electronics from our store, you must register for an account. You agree to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Immediately notify us of any unauthorized use</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Electronics Product Information</h3>
        <p class="mb-3">We provide detailed specifications for all electronics products. However:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Product colors may vary slightly due to monitor settings</li>
          <li>Technical specifications are provided by manufacturers</li>
          <li>Accessories shown in pictures may be sold separately</li>
          <li>Product images are for illustration purposes</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Warranty Information</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Most electronics come with manufacturer's warranty</li>
          <li>Warranty period varies by product and brand</li>
          <li>Warranty cards must be preserved for service claims</li>
          <li>Warranty does not cover physical damage or liquid damage</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Pricing and Payments</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>All prices are in Nepalese Rupees (Rs)</li>
          <li>Prices are subject to change without notice</li>
          <li>We accept major credit cards, debit cards, eSewa, and bank transfers</li>
          <li>Payment is processed at the time of order confirmation</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Prohibited Activities</h3>
        <p class="mb-3">You agree not to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Use the site for any illegal purpose</li>
          <li>Attempt to reverse engineer our electronics</li>
          <li>Interfere with the proper working of the site</li>
          <li>Use automated systems to extract pricing or inventory data</li>
        </ul>
      `,
    },
    {
      id: "shipping",
      title: "Shipping Policy",
      icon: <Truck className="w-5 h-5" />,
      lastUpdated: "December 05, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Shipping Methods & Timeframes</h3>
        <p class="mb-3">All electronics are shipped with protective packaging to prevent damage during transit.</p>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Standard Shipping:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Delivery within 2-3 business days within Kathmandu Valley</li>
            <li>Free shipping on electronics orders above Rs. 5,000</li>
            <li>Careful handling for fragile electronic items</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Express Shipping:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Delivery within 24 hours in Kathmandu Valley</li>
            <li>Additional charge of Rs. 200</li>
            <li>Available for orders placed before 2 PM</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Outside Valley Delivery:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Delivery within 3-7 business days</li>
            <li>Shipping charges based on location and weight</li>
            <li>Extra protective packaging for long-distance shipping</li>
          </ul>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">Shipping Restrictions</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>We ship throughout Nepal</li>
          <li>International shipping available on request for certain products</li>
          <li>High-value electronics require signature on delivery</li>
          <li>Remote locations may have longer delivery times</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Order Tracking</h3>
        <p class="mb-3">Once your electronics order is shipped, you will receive a tracking number via email and SMS. You can track your order:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Through our website's order tracking page</li>
          <li>Using the tracking link in your email</li>
          <li>By contacting our customer support team</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Safe Delivery Process</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>All electronics are tested before shipping</li>
          <li>Protective bubble wrap and anti-static packaging used</li>
          <li>Insurance for high-value electronics shipments</li>
          <li>Signature required for delivery confirmation</li>
        </ul>
      `,
    },
    {
      id: "returns",
      title: "Return & Refund Policy",
      icon: <RefreshCw className="w-5 h-5" />,
      lastUpdated: "December 05, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Return Window for Electronics</h3>
        <p class="mb-3">You may return electronics within specified timeframes:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Smartphones & Tablets:</strong> 7 days from delivery</li>
          <li><strong>Laptops & Computers:</strong> 7 days from delivery</li>
          <li><strong>Audio Devices:</strong> 7 days from delivery</li>
          <li><strong>Cameras & Security Systems:</strong> 7 days from delivery</li>
          <li><strong>Accessories & Gadgets:</strong> 7 days from delivery</li>
          <li><strong>Software & Digital Products:</strong> Non-returnable once activated</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Return Conditions</h3>
        <p class="mb-3">To be eligible for return, your electronic item must be:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>In original, unopened condition with seals intact</li>
          <li>In the original packaging with all accessories included</li>
          <li>Accompanied by the original invoice and warranty card</li>
          <li>Free from any physical damage, scratches, or liquid damage</li>
          <li>Returned with all original cables, chargers, and manuals</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Defective Products</h3>
        <p class="mb-3">For defective electronics discovered within warranty period:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Contact us within 48 hours of delivery</li>
          <li>Provide clear photos/videos of the defect</li>
          <li>We will arrange pickup for inspection</li>
          <li>If confirmed defective, we'll replace or refund</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Refund Process</h3>
        <div class="space-y-3 mb-4">
          <div class="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-medium">1. Return Initiation</p>
              <p class="text-sm text-gray-600">Initiate return within 24 hours of approval</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <Package className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-medium">2. Pickup & Technical Inspection</p>
              <p class="text-sm text-gray-600">Pickup within 2 days, technical inspection within 72 hours</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-medium">3. Refund Processing</p>
              <p class="text-sm text-gray-600">Refund initiated within 5-7 business days after approval</p>
            </div>
          </div>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">Non-Returnable Electronics</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Software and digital licenses after activation</li>
          <li>Customized or personalized electronics</li>
          <li>Opened headphones and earphones for hygiene reasons</li>
          <li>Batteries and consumables once opened</li>
          <li>Clearance sale items (marked as final sale)</li>
        </ul>
      `,
    },
    {
      id: "cancellation",
      title: "Order Cancellation",
      icon: <XCircle className="w-5 h-5" />,
      lastUpdated: "December 05, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Cancellation Timeframe</h3>
        <p class="mb-3">You can cancel your electronics order at different stages:</p>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Before Processing:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>100% refund will be processed</li>
            <li>Refund within 24-48 hours</li>
            <li>No cancellation charges</li>
            <li>Orders cancelled within 1 hour of placement get instant refund</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">During Processing:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Contact customer support immediately</li>
            <li>If not shipped yet, 100% refund</li>
            <li>If shipped, refund after return and inspection</li>
            <li>Shipping charges are non-refundable</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Custom Orders:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Custom-built PCs or configured devices</li>
            <li>Cannot be cancelled once assembly begins</li>
            <li>50% cancellation charge after configuration starts</li>
            <li>Full charge if hardware is opened/installed</li>
          </ul>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">How to Cancel</h3>
        <p class="mb-3">You can cancel your electronics order through:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Website:</strong> Go to "My Orders" and click "Cancel Order"</li>
          <li><strong>Mobile App:</strong> Navigate to order details and cancel</li>
          <li><strong>WhatsApp Support:</strong> Message us on +977 9866573177</li>
          <li><strong>Customer Support:</strong> Call or email with order details</li>
        </ul>
      `,
    },
    {
      id: "security",
      title: "Security & Data Protection",
      icon: <Shield className="w-5 h-5" />,
      lastUpdated: "December 05, 2025",
      content: `
        <h3 class="text-lg font-semibold mb-3">Data Security Measures for Electronics Shop</h3>
        <p class="mb-3">We implement advanced security measures to protect your information and transactions:</p>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Encryption:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>256-bit SSL encryption for all data transmission</li>
            <li>Payment data encrypted using PCI-DSS compliant methods</li>
            <li>Secure storage of customer purchase history</li>
            <li>Encrypted backup of order data</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Access Controls:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Limited employee access to customer data</li>
            <li>Regular security audits and vulnerability scans</li>
            <li>Two-factor authentication for admin access</li>
            <li>Secure logging of all access attempts</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Payment Security:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>PCI-DSS compliant payment processing</li>
            <li>Tokenization for credit card information</li>
            <li>3D Secure authentication for all transactions</li>
            <li>Fraud detection system for unusual activities</li>
          </ul>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">Cookies & Tracking</h3>
        <p class="mb-3">We use cookies and similar technologies to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Remember your electronics preferences and shopping cart</li>
          <li>Analyze site traffic and popular products</li>
          <li>Provide personalized electronics recommendations</li>
          <li>Improve user experience on our tech-focused site</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Third-Party Services</h3>
        <p class="mb-3">We may share information with trusted third parties for:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Payment processing (eSewa, Khalti, Fonepay, etc.)</li>
          <li>Shipping and courier services</li>
          <li>Technical support and warranty services</li>
          <li>Marketing analytics for electronics trends</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Warranty Registration Data</h3>
        <p class="mb-3">When you register product warranty with us:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>We share necessary details with manufacturers for warranty activation</li>
          <li>Your contact information is used for warranty notifications</li>
          <li>Purchase history is maintained for service claims</li>
          <li>You can opt-out of promotional communications anytime</li>
        </ul>
      `,
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      details: ["info@santoshthapa0.com.np"],
      responseTime: "Within 12 hours",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone & WhatsApp",
      details: ["+977 9866573177 (Call)", "+977 9866573177 (WhatsApp)"],
      responseTime: "9 AM - 8 PM, 7 days a week",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Technical Support",
      details: [
        "Product setup assistance",
        "Warranty claims support",
        "Technical troubleshooting",
      ],
      responseTime: "Available during business hours",
    },
  ];
  
  const seo = useSEO("policy");
  
  return (
    <>
      {seo}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                <Cpu
                  className="w-8 h-8"
                  style={{ color: colors.blue[500] }}
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Electronics Shop Policies
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your trusted partner for electronics. Read our comprehensive policies to understand how we ensure secure transactions, safe delivery, and reliable after-sales support for all your tech needs.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    7-Day Return Policy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    Manufacturer Warranty
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Secure Payments</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Last Updated Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Last Updated: December 05, 2025
                    </p>
                    <p className="text-sm text-gray-600">
                      Please review these policies regularly as they may be updated. For technical questions about specific electronics, contact our support team.
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium">
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {policySections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    expandedSections[section.id] ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: colors.blue[50] }}
                      >
                        <div style={{ color: colors.blue[500] }}>
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Updated: {section.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.gray[100] }}
                    >
                      {expandedSections[section.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedSections[section.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 pt-6">
                            <div
                              className="prose max-w-none text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: section.content,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Technical Support & Assistance
                </h2>
                <p className="text-gray-600">
                  Our electronics experts are here to help with technical questions, warranty claims, and product support.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                      style={{ backgroundColor: colors.blue[50] }}
                    >
                      <div style={{ color: colors.blue[500] }}>
                        {contact.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {contact.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {contact.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{contact.responseTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Points Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Electronics Shop Policy Highlights
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "Product Warranty",
                  points: [
                    "Manufacturer warranty",
                    "Easy claim process",
                    "Authorized service",
                  ],
                },
                {
                  icon: <CreditCard className="w-6 h-6" />,
                  title: "Secure Payments",
                  points: [
                    "Multiple payment options",
                    "SSL encrypted",
                    "PCI-DSS compliant",
                  ],
                },
                {
                  icon: <RefreshCw className="w-6 h-6" />,
                  title: "Easy Returns",
                  points: ["7-day window", "Technical inspection", "Quick refunds"],
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Tech Support",
                  points: [
                    "Product setup help",
                    "Warranty assistance",
                    "Quick response",
                  ],
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 mx-auto"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue[100]}, ${colors.purple[100]})`,
                    }}
                  >
                    <div style={{ color: colors.blue[500] }}>{item.icon}</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                By purchasing from our electronics store, you acknowledge that you have read, understood, and agree to be bound by these policies.
              </p>
              <p className="text-sm text-gray-500">
                © 2025 Thapa Electronics Nepal. All rights reserved. Your trusted electronics partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}