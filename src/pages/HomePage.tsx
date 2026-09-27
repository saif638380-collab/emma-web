import React, { useRef } from 'react';
import { PHOTOS } from '../data/photos';
import { PRODUCTS } from '../data/products';
import { Image } from '../components/Image';
import { AdSlot } from '../components/AdSlot';
import { SeoHead } from '../components/SeoHead';
import { Link, useRouter } from '../context/RouterContext';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Featured portrait photos for hero
  const featuredPhotos = PHOTOS.filter((p) => p.featured).slice(0, 8);
  const recommendedProducts = PRODUCTS.slice(0, 5);

  const scrollRecommend = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const distance = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SeoHead
        title="Obscura — Exclusive Portrait Archive & Field Essays"
        description="Exclusive unposted lifestyle and editorial portraits not shared on Instagram. Behind-the-scenes stories, style breakdowns, and tested gear."
      />

      {/* Top Ad at the very first of the page (no text) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-1">
        <AdSlot
          id="ad-slot-home-top"
          format="banner"
          minHeight="100px"
          className="!my-0"
        />
      </section>

      {/* Photos Stream with Ads after every single photo (1 photo -> ad -> 2 photo -> ad) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="space-y-6">
          {featuredPhotos.map((photo, index) => (
            <React.Fragment key={photo.id}>
              {/* Individual Photo Card */}
              <div
                onClick={() => {
                  navigate(`/photo/${photo.id}`);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group relative overflow-hidden rounded-2xl bg-stone-100 cursor-pointer border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.alt}
                    fill
                    priority={index < 2}
                    className="group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Scrim & story hint overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[11px] font-mono tracking-wider text-rose-300 uppercase">
                      Romantic Story
                    </span>
                    <h3 className="text-lg font-semibold tracking-wide text-white mt-0.5">
                      {photo.title}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/90 font-medium bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit">
                      <BookOpen className="w-3 h-3" />
                      <span>Read Story →</span>
                    </div>
                  </div>
                </div>

                {/* Photo caption footer with explicit action button */}
                <div className="p-4 sm:p-5 bg-white border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                      {photo.title.replace('Emma — ', '')}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-mono mt-0.5 block">
                      Written by Emma · Tap to read
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                    <span>Read Story</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Ad Slot directly after THIS photo */}
              <AdSlot
                id={`ad-slot-home-${index + 1}`}
                format="responsive"
                minHeight="100px"
                className="!my-6"
              />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Ad slot in place of blog section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
        <AdSlot id="ad-slot-home-mid" format="banner" minHeight="110px" />
      </section>

      {/* Recommended Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between pb-6 border-b border-stone-100 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold block">
              Emma's Recommendations
            </span>
            <h2 className="text-2xl font-serif font-medium text-stone-900 mt-1">
              Featured Romance & Gear
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRecommend('left')}
              aria-label="Scroll left"
              className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollRecommend('right')}
              aria-label="Scroll right"
              className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/recommends"
              className="ml-3 text-xs font-medium text-stone-600 hover:text-stone-950 flex items-center gap-1 group"
            >
              <span>All Recommends</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth"
        >
          {recommendedProducts.map((product) => {
            const isInternal = product.affiliateUrl.startsWith('/');
            const CardContent = (
              <>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 mb-3 border border-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-rose-500 font-semibold mb-1">
                  <span>{product.category}</span>
                  <span className="font-mono text-stone-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                    {product.price}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-stone-900 group-hover:text-rose-600 transition-colors leading-snug line-clamp-1">
                  {product.name}
                </h4>

                <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed flex-1">
                  {product.shortBlurb}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-rose-600 font-medium">
                    {isInternal ? 'Read Story & Get Bundle' : 'Instant Access'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 group-hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs">
                    <span>{isInternal ? 'Read & Get' : 'Get It Now'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </>
            );

            return isInternal ? (
              <Link
                key={product.id}
                href={product.affiliateUrl}
                className="shrink-0 w-72 snap-start flex flex-col bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:border-rose-400 transition-all cursor-pointer group no-underline"
              >
                {CardContent}
              </Link>
            ) : (
              <a
                key={product.id}
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="shrink-0 w-72 snap-start flex flex-col bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:border-rose-400 transition-all cursor-pointer group no-underline"
              >
                {CardContent}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
