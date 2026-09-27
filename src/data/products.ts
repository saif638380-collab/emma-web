import { ASSETS } from './assets';

export interface Product {
  id: string;
  name: string;
  category: 'Romance Bundle' | 'Straps & Carry' | 'Field Notes & EDC' | 'Optics & Film';
  shortBlurb: string;
  review: string;
  price: string;
  affiliateUrl: string;
  image: string;
  rating: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'romance-ebooks-audiobooks',
    name: '50 Romance eBooks + Audiobooks',
    category: 'Romance Bundle',
    shortBlurb: 'Get hard in seconds with 50 intense, passionate romance eBooks and narrated audiobooks that turn you on instantly.',
    review: 'If you want to feel real passion and get turned on within seconds, this exclusive collection has every hot story you need.',
    price: 'Instant Download',
    affiliateUrl: '/articles/50-romance-ebooks-audiobooks',
    image: ASSETS.romanceBundleBox,
    rating: '5.0/5',
    badge: 'Exclusive Hot Bundle',
  },
];
