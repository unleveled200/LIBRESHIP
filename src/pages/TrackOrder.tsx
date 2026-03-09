import { useState, FormEvent } from 'react';
import { Truck, Search, ExternalLink, Package } from 'lucide-react';
import { motion } from 'motion/react';

const CARRIERS = [
  {
    id: 'andreani',
    name: 'Andreani',
    logo: 'https://www.andreani.com/favicon.ico',
    trackingUrl: (num: string) => `https://www.andreani.com/#!/informacionEnvio/${num}`,
    description: 'One of Argentina\'s leading logistics providers.'
  },
  {
    id: 'correo-argentino',
    name: 'Correo Argentino',
    logo: 'https://www.correoargentino.com.ar/favicon.ico',
    trackingUrl: (num: string) => `https://www.correoargentino.com.ar/seguimiento-de-envios`,
    description: 'The national postal service of Argentina.'
  }
];

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState(CARRIERS[0].id);

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    const carrier = CARRIERS.find(c => c.id === selectedCarrier);
    if (carrier) {
      window.open(carrier.trackingUrl(trackingNumber), '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-6">
          <Truck className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Track Your Order</h1>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Enter your tracking number below to see the status of your shipment with our partner carriers.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 shadow-xl mb-12">
        <form onSubmit={handleTrack} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARRIERS.map((carrier) => (
              <button
                key={carrier.id}
                type="button"
                onClick={() => setSelectedCarrier(carrier.id)}
                className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedCarrier === carrier.id
                    ? 'border-yellow-400 bg-yellow-50/50 ring-4 ring-yellow-400/10'
                    : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedCarrier === carrier.id ? 'bg-yellow-400 text-zinc-900' : 'bg-white text-zinc-400'
                }`}>
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-900">{carrier.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{carrier.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-zinc-700 mb-2">Tracking Number</label>
            <div className="relative">
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.envio-123456789"
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-yellow-400 text-zinc-900 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all shadow-lg group"
          >
            Track on {CARRIERS.find(c => c.id === selectedCarrier)?.name}
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            Real-time Updates
          </h4>
          <p className="text-sm text-zinc-500">Get the latest status directly from the carrier's official portal.</p>
        </div>
        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            Secure Shipping
          </h4>
          <p className="text-sm text-zinc-500">All shipments are insured and handled with professional care.</p>
        </div>
        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            Support Available
          </h4>
          <p className="text-sm text-zinc-500">Need help? Contact our support team for assistance with your shipment.</p>
        </div>
      </div>
    </div>
  );
}
