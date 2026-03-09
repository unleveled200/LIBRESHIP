import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Contact Us</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">Have questions about reshipping or COD? Our team is here to help you every step of the way.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Us</h3>
            <p className="text-zinc-500 text-sm mb-4">Our support team will respond within 24 hours.</p>
            <a href="mailto:addnice4@gmail.com" className="text-zinc-900 font-bold hover:text-yellow-600 transition-colors">
              addnice4@gmail.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <p className="text-zinc-500 text-sm mb-4">Mon-Fri from 8am to 6pm EST.</p>
            <a href="tel:3874482047" className="text-zinc-900 font-bold hover:text-yellow-600 transition-colors">
              3874482047
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
            <p className="text-zinc-500 text-sm mb-4">Our logistics hub in Salta.</p>
            <p className="text-zinc-900 font-bold">
              Santiago Morales 573, Salta, Argentina 4400
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 shadow-sm">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-zinc-500 mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-yellow-400 text-zinc-900 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all shadow-lg group"
                    >
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
