import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../CartContext';
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, RefreshCcw, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-yellow-600 font-bold">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-zinc-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-zinc-900 text-white px-3 py-1 rounded-lg text-sm font-bold">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {product.rating}
              </div>
              <span className="text-zinc-500 text-sm font-medium">
                {product.reviews} verified reviews
              </span>
            </div>
            <div className="text-3xl font-bold text-zinc-900 mb-8">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed mb-10">
              {product.description}
            </p>
            
            {product.mlUrl && (
              <a 
                href={product.mlUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-bold transition-colors mb-8"
              >
                View on MercadoLibre
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="space-y-6 mb-10">
            <button 
              onClick={handleAddToCart}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${added ? 'bg-emerald-500 text-white' : 'bg-yellow-400 text-zinc-900 hover:bg-yellow-300'}`}
            >
              {added ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </>
              )}
            </button>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center gap-2 text-sm font-medium text-zinc-600">
              <Truck className="w-4 h-4" />
              Free reshipping on orders over $500
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-zinc-500">
                Looking for something else?{' '}
                <Link to="/shop#custom-order" className="text-yellow-600 font-bold hover:underline">
                  Send us any MercadoLibre link
                </Link>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-100">
            <div className="flex flex-col items-center text-center p-4">
              <ShieldCheck className="w-8 h-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-sm mb-1">Secure Reshipping</h4>
              <p className="text-xs text-zinc-500">Insured delivery</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <RefreshCcw className="w-8 h-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-sm mb-1">Easy Returns</h4>
              <p className="text-xs text-zinc-500">30-day window</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="w-8 h-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-sm mb-1">COD Available</h4>
              <p className="text-xs text-zinc-500">Pay at your door</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
