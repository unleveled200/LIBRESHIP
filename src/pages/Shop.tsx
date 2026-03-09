import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const setCategory = (id: string) => {
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-display text-4xl font-bold text-zinc-900 mb-2">Our Shop</h1>
          <p className="text-zinc-500">Explore premium products or order any item from MercadoLibre.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search our store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-all ${showFilters ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}`}
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Custom Link Order Banner */}
      <div id="custom-order" className="mb-12 bg-zinc-900 rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Found something on MercadoLibre?</h2>
            <p className="text-zinc-400 max-w-md">Paste the link below and we'll handle the purchase and reshipping for you.</p>
          </div>
          <div className="flex-1 w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Paste MercadoLibre product link here..."
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                id="ml-link-input"
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('ml-link-input') as HTMLInputElement;
                  if (input.value) {
                    const message = encodeURIComponent(`Hi! I found this product on MercadoLibre and I'd like to order it through LibreShip: ${input.value}`);
                    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
                  }
                }}
                className="px-8 py-4 bg-yellow-400 text-zinc-900 font-bold rounded-2xl hover:bg-yellow-300 transition-all whitespace-nowrap"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Categories</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCategory('all')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  All Products
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === cat.id ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-zinc-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No products found</h3>
          <p className="text-zinc-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
