import { useState, FormEvent } from 'react';
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'Argentina'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          mlUrl: item.mlUrl || ''
        })),
        total: totalPrice + 25, // Including reshipping fee
        status: 'pending',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      
      // Simulate gateway processing delay
      setTimeout(() => {
        setStep('success');
        clearCart();
      }, 1500);
    } catch (error) {
      console.error("Error saving order:", error);
      handleFirestoreError(error, OperationType.CREATE, 'orders');
      setStep('form');
    }
  };

  if (step === 'processing') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-zinc-100 max-w-md w-full"
        >
          <Loader2 className="w-16 h-16 text-yellow-500 animate-spin mx-auto mb-8" />
          <h2 className="font-display text-3xl font-bold mb-4">Processing Order</h2>
          <p className="text-zinc-500 mb-8">
            Please wait while we secure your Cash on Delivery request through our gateway...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-medium uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            Secure Encrypted Transaction
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-zinc-100"
        >
          <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="font-display text-4xl font-bold text-zinc-900 mb-4">Order Confirmed!</h1>
          <p className="text-zinc-500 text-lg mb-10">
            Thank you for your order. We've received your request for reshipping. 
            Our team will contact you shortly to confirm the COD delivery details.
          </p>
          <div className="bg-zinc-50 rounded-2xl p-6 mb-10 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Order Number:</span>
              <span className="font-bold">#{orderId?.slice(-8).toUpperCase() || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Payment Method:</span>
              <span className="font-bold text-yellow-600 uppercase">Cash on Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Delivery Address:</span>
              <span className="font-bold text-right">{formData.address}, {formData.city}, {formData.country}</span>
            </div>
          </div>
          <Link to="/" className="inline-block px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-yellow-600 font-bold">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-display text-4xl font-bold text-zinc-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-zinc-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <h2 className="text-2xl font-bold">Shipping Information</h2>
            </div>
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-zinc-700 mb-2">Delivery Address</label>
                <input 
                  required
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Country</label>
                <select 
                  required
                  value={formData.country}
                  onChange={e => setFormData({...formData, country: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                >
                  <option value="Argentina">Argentina 🇦🇷</option>
                  <option value="Chile">Chile 🇨🇱</option>
                  <option value="Uruguay">Uruguay 🇺🇾</option>
                  <option value="Paraguay">Paraguay 🇵🇾</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">City</label>
                <input 
                  required
                  type="text" 
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="Miami"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">ZIP Code</label>
                <input 
                  required
                  type="text" 
                  value={formData.zip}
                  onChange={e => setFormData({...formData, zip: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="33101"
                />
              </div>
            </form>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-zinc-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <h2 className="text-2xl font-bold">Payment Gateway</h2>
            </div>
            <div className="p-8 bg-white border-2 border-yellow-400 rounded-[2rem] shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-yellow-400 p-4 rounded-2xl shadow-lg">
                  <Truck className="w-8 h-8 text-zinc-900" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl font-bold text-zinc-900 mb-1">Cash on Delivery (COD)</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Pay securely in cash when your order arrives. No credit card required. 
                    Reshipping verified by LibreShip.
                  </p>
                </div>
                <div className="sm:ml-auto">
                  <div className="w-8 h-8 rounded-full border-4 border-yellow-400 bg-zinc-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 py-1.5 bg-zinc-50 rounded-lg">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Verified Gateway
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 py-1.5 bg-zinc-50 rounded-lg">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  SSL Secured
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
            </div>
          </section>
        </div>

        {/* Order Review */}
        <div>
          <div className="bg-zinc-900 text-white rounded-[2.5rem] p-10 sticky top-24 shadow-2xl">
            <h3 className="font-display text-2xl font-bold mb-8">Order Review</h3>
            
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                    <div className="font-bold mt-1 text-yellow-400">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-800 mb-8">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Reshipping Fee</span>
                <span className="text-white font-bold">$25.00</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-display font-bold text-yellow-400">
                  ${(totalPrice + 25).toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              className="w-full py-5 bg-yellow-400 text-zinc-900 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              Confirm Order via COD
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              Secure Gateway Transaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
