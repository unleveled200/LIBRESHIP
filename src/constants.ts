import { Product, Category, Review } from './types';

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', image: 'https://picsum.photos/seed/electronics/400/300' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', image: 'https://picsum.photos/seed/fashion/400/300' },
  { id: 'home', name: 'Home & Garden', icon: 'Home', image: 'https://picsum.photos/seed/home/400/300' },
  { id: 'sports', name: 'Sports', icon: 'Trophy', image: 'https://picsum.photos/seed/sports/400/300' },
  { id: 'toys', name: 'Toys', icon: 'Gamepad2', image: 'https://picsum.photos/seed/toys/400/300' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'aiwa-bt301',
    name: 'Auriculares Inalámbricos Aiwa AW-BT301 Negro',
    description: 'Disfruta de tu música con la mejor calidad de sonido. Estos auriculares Aiwa cuentan con conexión Bluetooth, vincha plegable para fácil transporte, función manos libres y hasta 8 horas de autonomía. Almohadillas soft para máximo confort durante horas.',
    price: 38.19,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 156,
    mlUrl: 'https://www.mercadolibre.com.ar/auriculares-inalambricos-aiwa-aw-bt301-negro/p/MLA19149264'
  },
  {
    id: 'aiwa-bt301-detail',
    name: 'Aiwa AW-BT301 - Edición Especial',
    description: 'Auriculares Bluetooth con control de canciones y volumen integrado. Diseño ergonómico y plegable. Incluye entrada auxiliar y micrófono incorporado para llamadas claras.',
    price: 40.50,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 42,
    mlUrl: 'https://www.mercadolibre.com.ar/auriculares-inalambricos-aiwa-aw-bt301-negro/p/MLA19149264'
  },
  {
    id: 'aiwa-bt301-lifestyle',
    name: 'Aiwa AW-BT301 - Confort Premium',
    description: 'La combinación perfecta de estilo y funcionalidad. Almohadillas extra suaves y vincha ajustable. Ideal para uso diario y viajes.',
    price: 38.19,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 88,
    mlUrl: 'https://www.mercadolibre.com.ar/auriculares-inalambricos-aiwa-aw-bt301-negro/p/MLA19149264'
  },
  {
    id: 'nespresso-essenza-mini',
    name: 'Cafetera Nespresso Essenza Mini White',
    description: 'La máquina más pequeña de Nespresso. Essenza Mini combina facilidad de uso, belleza minimalista y calidad incomparable para crear la taza de café perfecta en todo momento. Presión de 19 bares y calentamiento rápido en 25 segundos.',
    price: 185.00,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 245,
    mlUrl: 'https://www.mercadolibre.com.ar/cafetera-nespresso-essenza-mini-white/up/MLAU3201384689'
  }
];

export const REVIEWS: Review[] = [
  { id: 'r1', user: 'Carlos M.', rating: 5, comment: 'Excellent service! My MercadoLibre order arrived perfectly packaged and on time.', date: '2024-03-01' },
  { id: 'r2', user: 'Elena R.', rating: 4, comment: 'Very reliable reshipping. The COD option is a lifesaver.', date: '2024-02-25' },
  { id: 'r3', user: 'Juan P.', rating: 5, comment: 'The best way to get items from ML. Highly recommended!', date: '2024-02-20' },
  { id: 'r4', user: 'Sofia G.', rating: 5, comment: 'Fast shipping and great customer support. Will use again.', date: '2024-02-15' },
];
