import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Package2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-yellow-400 p-1.5 rounded-lg">
                <Package2 className="w-6 h-6 text-zinc-900" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">LibreShip</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-yellow-600 transition-colors">Home</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-yellow-600 transition-colors">Shop</Link>
            <a href="/shop#custom-order" className="text-sm font-medium hover:text-yellow-600 transition-colors">Custom Order</a>
            <a href="/#how-it-works" className="text-sm font-medium hover:text-yellow-600 transition-colors">How it Works</a>
            <Link to="/track" className="text-sm font-medium hover:text-yellow-600 transition-colors">Track Order</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-yellow-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-zinc-600" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-zinc-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-zinc-900 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Shop</Link>
              <a href="/shop#custom-order" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Custom Order</a>
              <a href="/#how-it-works" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">How it Works</a>
              <Link to="/track" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Track Order</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
