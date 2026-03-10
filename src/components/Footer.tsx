import { Package2, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Package2 className="w-6 h-6 text-yellow-400" />
              <span className="font-display font-bold text-xl">LibreShip</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for reshipping products from MercadoLibre. We handle the logistics, you enjoy the products.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-400" />
                addnice4@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a href="https://wa.me/5491121857045" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +54 9 11 2185-7045 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-400" />
                Santiago Morales 573, Salta, Argentina 4400
              </li>
            </ul>
          </div>
        </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© 2024 LibreShip. All rights reserved. Not affiliated with MercadoLibre.</p>
            <Link to="/admin/login" className="text-zinc-600 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest">
              Admin Portal
            </Link>
          </div>
      </div>
    </footer>
  );
}
