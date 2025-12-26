import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Sparkle, ChevronRight, Heart, Star, Gamepad2, Car, Brain, Music, Activity, BookOpen, Cpu, Atom, Zap, Baby, Smile, Users } from "lucide-react";
import { colors } from "../theme/colors"; // ✅ Import your central color theme

export default function ToysComponent() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchToysProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        if (res.ok) {
          const productsArray = data.products || data;
          const toysKeywords = [
            'toy', 'toys', 'kids toy', 'children toy', 'baby toy', 'educational toy',
            'learning toy', 'play toy', 'baby', 'toddler', 'kids', 'children',
            'preschool', 'school kids', 'educational', 'learning', 'montessori',
            'puzzle', 'jigsaw puzzle', 'alphabet toy', 'number toy', 'math toy',
            'science toy', 'stem toy', 'game', 'board game', 'card game',
            'indoor game', 'outdoor game', 'family game', 'toy car', 'remote car',
            'rc car', 'toy bike', 'toy truck', 'toy train', 'toy bus', 'toy plane',
            'toy helicopter', 'action figure', 'superhero toy', 'doll', 'barbie',
            'fashion doll', 'soft doll', 'soft toy', 'teddy bear', 'plush toy',
            'stuffed toy', 'blocks', 'building blocks', 'lego', 'construction toy',
            'craft toy', 'art toy', 'drawing toy', 'electronic toy', 'battery toy',
            'musical toy', 'sound toy', 'light toy', 'sports toy', 'football',
            'cricket bat', 'badminton', 'basketball', 'cycle', 'scooter',
            'kitchen set', 'doctor set', 'tool set', 'pretend play', 'role play',
            'rattle', 'teether', 'activity toy', 'walker', 'ride on toy',
            'animal toy', 'dinosaur toy', 'zoo toy', 'farm toy', 'gift toy',
            'birthday gift', 'kids gift', 'toy set', 'play set', 'robotic',
            'robot', 'drone', 'remote control', 'rc', 'video game', 'console',
            'playset', 'educational kit', 'science kit', 'experiment kit',
            'music instrument', 'drum', 'piano', 'guitar', 'xylophone',
            'outdoor play', 'swing', 'slide', 'sandbox', 'trampoline',
            'water toy', 'bath toy', 'pool toy', 'electronic learning',
            'interactive toy', 'smart toy', 'coding toy', 'programming',
            'construction set', 'magnetic tiles', 'puzzle game', 'brain teaser',
            'logic game', 'strategy game', 'family board game', 'collectible',
            'transformers', 'vehicles', 'trainset', 'railway', 'diecast',
            'model kit', 'craft kit', 'art set', 'painting set', 'clay',
            'playdough', 'slime', 'kinetic sand', 'fidget toy', 'spinner',
            'pop it', 'sensory toy', 'developmental toy', 'motor skills',
            'fine motor', 'gross motor', 'balance bike', 'tricycle', 'skateboard',
            'roller skates', 'scooter board', 'playhouse', 'tent', 'tunnel',
            'ball pit', 'bouncer', 'rocking horse', 'see saw', 'climber'
          ];

          const toysProducts = productsArray.filter(product => {
            const category = product.category?.toLowerCase() || '';
            const name = product.name?.toLowerCase() || '';
            const tags = product.tags?.map(tag => tag.toLowerCase()) || [];
            const description = product.description?.toLowerCase() || '';
            
            return toysKeywords.some(keyword =>
              category.includes(keyword) ||
              name.includes(keyword) ||
              tags.includes(keyword) ||
              description.includes(keyword)
            );
          });

          const sortedProducts = toysProducts
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);

          setProducts(sortedProducts);
        } else {
          setError(data.message || "Failed to load toys products.");
        }
      } catch (err) {
        setError("Error loading toys products.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchToysProducts();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 rounded-2xl p-6 text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-blue-600 font-medium">Loading fun toys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <div className="text-red-500 font-bold">!</div>
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 rounded-2xl p-6 text-center">
          <Sparkle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No toys available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkle className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600 font-medium text-sm">Fun & Learning</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Toys & Games
              </h2>
              <p className="text-gray-600">
                Discover educational, fun, and creative toys for all age groups
              </p>
            </div>

            <button
              onClick={() => navigate("/toys")}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-400 hover:to-purple-400 transition-all shadow-lg hover:shadow-xl"
            >
              View All Toys
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Category Quick Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => navigate("/toys?category=educational")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.blue[50],
                color: colors.blue[600],
                border: `1px solid ${colors.blue[200]}`
              }}
            >
              <BookOpen className="w-4 h-4" />
              Educational
            </button>
            <button
              onClick={() => navigate("/toys?category=robotic")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.purple[50],
                color: colors.purple[600],
                border: `1px solid ${colors.purple[200]}`
              }}
            >
              <Cpu className="w-4 h-4" />
              Robotic
            </button>
            <button
              onClick={() => navigate("/toys?category=stem")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.blue[50]}, ${colors.purple[50]})`,
                color: colors.purple[700],
                border: `1px solid ${colors.purple[200]}`
              }}
            >
              <Atom className="w-4 h-4" />
              STEM
            </button>
            <button
              onClick={() => navigate("/toys?category=outdoor")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.purple[50]}, ${colors.blue[50]})`,
                color: colors.blue[700],
                border: `1px solid ${colors.blue[200]}`
              }}
            >
              <Activity className="w-4 h-4" />
              Outdoor
            </button>
            <button
              onClick={() => navigate("/toys?category=musical")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.pink[50],
                color: colors.pink[600],
                border: `1px solid ${colors.pink[200]}`
              }}
            >
              <Music className="w-4 h-4" />
              Musical
            </button>
            <button
              onClick={() => navigate("/toys?category=rc")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.red[50],
                color: colors.red[600],
                border: `1px solid ${colors.red[200]}`
              }}
            >
              <Car className="w-4 h-4" />
              RC Toys
            </button>
          </div>

          {/* Age Group Quick Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="text-sm font-medium text-gray-700 mr-2">Age Groups:</div>
            <button
              onClick={() => navigate("/toys?concern=toddlers")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.yellow[50],
                color: colors.yellow[600],
                border: `1px solid ${colors.yellow[200]}`
              }}
            >
              <Baby className="w-4 h-4" />
              Toddlers (1-3)
            </button>
            <button
              onClick={() => navigate("/toys?concern=kids")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.green[50],
                color: colors.green[600],
                border: `1px solid ${colors.green[200]}`
              }}
            >
              <Smile className="w-4 h-4" />
              Kids (4-7)
            </button>
            <button
              onClick={() => navigate("/toys?concern=preteens")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.orange[50],
                color: colors.orange[600],
                border: `1px solid ${colors.orange[200]}`
              }}
            >
              <Users className="w-4 h-4" />
              Pre-Teens (8-12)
            </button>
            <button
              onClick={() => navigate("/toys?concern=teens")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: colors.red[50],
                color: colors.red[600],
                border: `1px solid ${colors.red[200]}`
              }}
            >
              <Zap className="w-4 h-4" />
              Teens (13+)
            </button>
          </div>
        </div>

        {/* Products Section */}
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
                {product.tags?.includes('educational') && (
                  <div
                    className="absolute -top-2 -left-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: colors.accent.emerald }}
                  >
                    Educational
                  </div>
                )}

                {product.tags?.includes('new') && (
                  <div
                    className="absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue[500]}, ${colors.purple[500]})`
                    }}
                  >
                    New
                  </div>
                )}

                {product.discount > 0 && (
                  <div
                    className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.red[500]}, ${colors.orange[500]})`
                    }}
                  >
                    {product.discount}% OFF
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
              onClick={() => navigate("/toys")}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-400 hover:to-purple-400 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View All Toys
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Toys Tips Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Toy Tip of the Day
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {products.length > 0
                      ? `Educational toys like "${products[0].name}" help develop critical thinking and problem-solving skills in children. Always choose age-appropriate toys for optimal learning.`
                      : "Choose age-appropriate educational toys that challenge children just enough to keep them engaged but not frustrated."}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/blog/toy-tips")}
                    className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all text-sm"
                  >
                    Toy Tips
                  </button>
                  <button
                    onClick={() => navigate("/toys")}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-400 hover:to-purple-400 transition-all text-sm"
                  >
                    Shop All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Border Effect */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${colors.blue[500]}, ${colors.purple[500]}, ${colors.blue[500]})`,
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite"
          }}
        />
        <style >{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  );
}