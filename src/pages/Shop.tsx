import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hash } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

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
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left lg:max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Purchase from any link</h2>
            <p className="text-zinc-400 mb-6">Found a product on MercadoLibre or any other site? We'll buy it for you and deliver it to your door in Salta.</p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-zinc-300 text-sm">Copy the product link from MercadoLibre.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-zinc-300 text-sm">Paste it in the box below and click "Get Quote".</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                <p className="text-zinc-300 text-sm">We'll confirm the final price and delivery time via WhatsApp.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Destination Country</label>
                  <select 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    id="country-select"
                  >
                    <option value="AR" className="bg-zinc-900">Argentina 🇦🇷</option>
                    <option value="CL" className="bg-zinc-900">Chile 🇨🇱</option>
                    <option value="UY" className="bg-zinc-900">Uruguay 🇺🇾</option>
                    <option value="PY" className="bg-zinc-900">Paraguay 🇵🇾</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Salta"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    id="city-input"
                  />
                </div>
              </div>

              <label className="block text-white text-sm font-medium mb-2">Paste your product link</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="https://www.mercadolibre.com.ar/..."
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  id="ml-link-input"
                  onChange={(e) => {
                    const status = document.getElementById('link-status');
                    if (e.target.value.includes('mercadolibre')) {
                      if (status) {
                        status.innerText = '✓ MercadoLibre link detected';
                        status.className = 'text-emerald-400 text-xs mt-2 font-medium';
                      }
                    } else if (e.target.value) {
                      if (status) {
                        status.innerText = '✓ Link detected';
                        status.className = 'text-yellow-400 text-xs mt-2 font-medium';
                      }
                    } else {
                      if (status) status.innerText = '';
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('ml-link-input') as HTMLInputElement;
                    const country = (document.getElementById('country-select') as HTMLSelectElement).value;
                    const city = (document.getElementById('city-input') as HTMLInputElement).value;
                    if (input.value) {
                      const message = encodeURIComponent(`Hola AddNice! Me gustaría comprar este producto: ${input.value}\nDestino: ${city}, ${country}`);
                      window.open(`https://wa.me/5491121857045?text=${message}`, '_blank');
                    }
                  }}
                  className="px-8 py-4 bg-yellow-400 text-zinc-900 font-bold rounded-2xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 whitespace-nowrap"
                >
                  Get Quote
                </button>
              </div>
              <div id="link-status" className="h-4"></div>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4 text-zinc-500 text-xs">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-6 h-6 rounded-full border-2 border-zinc-900" alt="User" />
                  ))}
                </div>
                <p>Join 500+ users ordering from MercadoLibre monthly</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
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
