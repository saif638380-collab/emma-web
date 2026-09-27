import React from 'react';
import { Link } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { Image } from '../components/Image';
import { SeoHead } from '../components/SeoHead';
import { ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RecommendsPage: React.FC = () => {
  const filteredProducts = PRODUCTS;

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      <SeoHead
        title="Recommended Romance & Curations — Obscura"
        description="Exclusive 50 Romance eBooks + Audiobooks bundle, intimate stories, handcrafted leather straps, and notes curated by Emma."
      />

      {/* Header Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="border-b border-stone-100 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold block">
            Emma's Curations
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900 mt-1">
            Exclusive Recommendations
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            A hand-picked selection of Emma's favorite romance collections, exclusive audiobooks, and personal field accessories.
          </p>
        </div>

        {/* Clear Affiliate Disclosure Banner at top of page */}
        <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3.5 text-xs text-stone-600">
          <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-stone-900 block mb-0.5">
              Instant Access & Transparency
            </span>
            Explore Emma's exclusive hot romance collection and recommended accessories. Every link gives you instant direct access with 100% secure checkout.
          </div>
        </div>

      {/* Category Filter Tabs */}
      </section>

      {/* Product Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isInternal = product.affiliateUrl.startsWith('/');
            const CardBody = (
              <>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 mb-4 border border-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Category & Status */}
                <div className="flex items-center justify-between text-xs text-rose-500 font-semibold mb-1.5 font-mono">
                  <span>{product.category}</span>
                  <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {product.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-stone-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {product.name}
                </h3>

                {/* Short Blurb */}
                <p className="mt-2 text-xs text-stone-600 leading-relaxed font-medium">
                  {product.shortBlurb}
                </p>

                {/* Field Review Note */}
                <div className="mt-4 pt-3.5 border-t border-stone-100 flex-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                    Emma's Review
                  </span>
                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    "{product.review}"
                  </p>
                </div>

                {/* Card Footer: Clickable Action Button */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isInternal ? 'Exclusive Story' : 'Instant Access'}</span>
                  </div>

                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 group-hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs">
                    <span>{isInternal ? 'Read Story' : 'Get It Now'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </>
            );

            return isInternal ? (
              <Link
                key={product.id}
                id={product.id}
                href={product.affiliateUrl}
                className="flex flex-col bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-xl hover:border-rose-400 transition-all group cursor-pointer no-underline text-inherit"
              >
                {CardBody}
              </Link>
            ) : (
              <a
                key={product.id}
                id={product.id}
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex flex-col bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-xl hover:border-rose-400 transition-all group cursor-pointer no-underline text-inherit"
              >
                {CardBody}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
