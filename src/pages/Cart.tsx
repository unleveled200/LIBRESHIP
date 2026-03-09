import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-zinc-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-12 h-12 text-zinc-400" />
        </div>
        <h2 className="font-display text-4xl font-bold text-zinc-900 mb-4">Your cart is empty</h2>
        <p className="text-zinc-500 mb-10 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Start shopping to find great deals from MercadoLibre.</p>
        <Link to="/shop" className="inline-block px-10 py-4 bg-yellow-400 text-zinc-900 rounded-2xl font-bold hover:bg-yellow-300 transition-all shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-zinc-900 mb-12">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-zinc-50 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${item.id}`} className="font-display font-bold text-xl hover:text-yellow-600 transition-colors">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-zinc-500 text-sm line-clamp-1 mb-4">{item.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-zinc-50 p-1 rounded-xl border border-zinc-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xl font-bold text-zinc-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm sticky top-24">
            <h3 className="font-display font-bold text-2xl mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Reshipping Fee</span>
                <span className="font-bold text-zinc-900">$25.00</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>COD Surcharge</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-zinc-100 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-display font-bold text-3xl text-zinc-900">
                  ${(totalPrice + 25).toFixed(2)}
                </span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full py-5 bg-yellow-400 text-zinc-900 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all shadow-lg group"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-center text-zinc-400 text-xs mt-6">
              By proceeding, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
