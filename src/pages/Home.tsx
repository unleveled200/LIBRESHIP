import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import ReviewSlider from '../components/ReviewSlider';
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard, ShoppingBag, MessageSquare, PackageCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-zinc-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Official Reshipping Partner
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              MercadoLibre <br />
              <span className="text-yellow-400">Delivered to You.</span>
            </h1>
            <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
              Shop directly from our curated store or send us any MercadoLibre link. We handle the purchase and reship it to your doorstep with Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-yellow-400 text-zinc-900 rounded-xl font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 group">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="px-8 py-4 bg-white/10 text-white backdrop-blur rounded-xl font-bold hover:bg-white/20 transition-all">
                How it Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: 'Fast Reshipping', desc: 'Global logistics network' },
            { icon: CreditCard, title: 'COD Available', desc: 'Pay when you receive' },
            { icon: ShieldCheck, title: 'Secure Handling', desc: 'Safe packaging always' },
            { icon: Clock, title: '24/7 Support', desc: 'We are here to help' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <f.icon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">{f.title}</h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Getting your favorite products from MercadoLibre has never been easier. Follow our simple 4-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />
          
          {[
            { 
              icon: ShoppingBag, 
              title: '1. Browse & Choose', 
              desc: 'Select products from our shop or send us any MercadoLibre link you want.' 
            },
            { 
              icon: MessageSquare, 
              title: '2. Order via WhatsApp', 
              desc: 'Click "Buy Now" to chat with us. We confirm price, stock, and shipping.' 
            },
            { 
              icon: PackageCheck, 
              title: '3. We Handle Logistics', 
              desc: 'We purchase the item, inspect it, and package it securely for reshipping.' 
            },
            { 
              icon: Truck, 
              title: '4. Fast Delivery', 
              desc: 'Your package is delivered to your door. Pay via COD or preferred method.' 
            },
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-400/20">
                <step.icon className="w-8 h-8 text-zinc-900" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-zinc-500">Find exactly what you are looking for.</p>
          </div>
          <Link to="/shop" className="text-yellow-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/shop?category=${cat.id}`}
              className="group relative h-64 rounded-2xl overflow-hidden"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-display font-bold text-xl">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Handpicked best-sellers from MercadoLibre, ready for immediate reshipping.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Link Order Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Custom Link Reshipping
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Found something else <br />
                on MercadoLibre?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                You are not limited to our store. Send us any product link from MercadoLibre, and we will handle the purchase, inspection, and reshipping for you.
              </p>
              <Link to="/shop#custom-order" className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-zinc-900 rounded-xl font-bold hover:bg-yellow-300 transition-all group">
                Order by Link
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Packaging" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      {/* Review Slider */}
      <ReviewSlider />

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-yellow-400 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-900 mb-8">
              Ready to start shopping?
            </h2>
            <p className="text-zinc-800 text-lg mb-12 max-w-2xl mx-auto font-medium">
              Join over 10,000 satisfied customers who trust LibreShip for their MercadoLibre needs.
            </p>
            <Link to="/shop" className="inline-block px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl">
              Go to Shop
            </Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
