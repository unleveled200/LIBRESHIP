import { motion } from 'motion/react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-zinc-400">Trusted by thousands of shoppers across the region.</p>
        </div>

        <div className="relative h-[300px] md:h-[250px]">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: currentIndex === index ? 1 : 0,
                x: currentIndex === index ? 0 : (index < currentIndex ? -100 : 100),
                scale: currentIndex === index ? 1 : 0.9
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute inset-0 flex flex-col items-center text-center px-4 ${currentIndex === index ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <Quote className="w-12 h-12 text-yellow-400 mb-6 opacity-50" />
              <p className="text-xl md:text-2xl font-medium mb-8 max-w-3xl italic">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <div className="font-bold text-lg">{review.user}</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-yellow-400' : 'bg-zinc-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
