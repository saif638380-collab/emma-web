import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { PHOTOS } from '../data/photos';
import { ASSETS } from '../data/assets';
import { Image } from '../components/Image';
import { AdSlot } from '../components/AdSlot';
import { MdxContent } from '../components/MdxContent';
import { SeoHead } from '../components/SeoHead';
import { Lightbox } from '../components/Lightbox';
import { ChevronRight } from 'lucide-react';

export const PhotoDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const photoId = params.photoId || params.id;

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentPhoto = PHOTOS.find((p) => p.id === photoId) || PHOTOS[0];
  const morePhotos = PHOTOS.filter((p) => p.id !== currentPhoto.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-24">
      <SeoHead
        title={`${currentPhoto.title} — Exclusive Unposted Photo & Story`}
        description={currentPhoto.storyExcerpt}
        ogType="article"
        ogImage={currentPhoto.imageUrl}
      />

      {/* 1. TOP AD SLOT AT THE FIRST OF THE PAGE (NO TEXT) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3">
        <AdSlot id="ad-slot-photo-top" format="banner" minHeight="100px" className="!my-0" />
      </div>

      {/* 2. THE PHOTO SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative group bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs">
          {/* Main Photo with Click to Lightbox */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative cursor-zoom-in overflow-hidden w-full flex items-center justify-center max-h-[85vh] bg-stone-100"
          >
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.alt}
              className="w-full h-auto max-h-[85vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              loading="eager"
            />
          </div>

          {/* Photo Caption Bar - Romantic & Seductive Headline */}
          <div className="p-5 sm:p-6 bg-white border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                Emma's Story
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
                {currentPhoto.title.replace('Emma — ', '')}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOWN TO THE PHOTO: MID AD SLOT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6">
        <AdSlot id="ad-slot-photo-mid" format="banner" minHeight="110px" />
      </div>

      {/* 4. THE ARTICLE DOWN TO IT - 100% High-Contrast Visible Text */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-6">
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold mb-2">
            <span>Emma's Private Memory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 leading-tight">
            {currentPhoto.storyTitle}
          </h2>
          <p className="mt-3 text-stone-800 text-base sm:text-lg leading-relaxed font-sans font-medium">
            {currentPhoto.storyExcerpt}
          </p>
        </div>

        {/* Story Body - Explicitly high-contrast dark stone-900 text on white */}
        <div className="text-stone-900 font-sans text-base sm:text-lg leading-relaxed">
          <MdxContent content={currentPhoto.storyContent} />
        </div>

        {/* Emma's Exclusive Hot Story Recommendation - Entire card clickable */}
        <a
          href="https://www.checkout-ds24.com/redir/630712/saif219569dafa/"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-stone-900 via-rose-950 to-stone-950 text-white border border-rose-900/50 shadow-xl relative overflow-hidden block group hover:border-rose-400/80 transition-all no-underline"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-lg shrink-0 bg-stone-800 border border-rose-800/40 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={ASSETS.romanceBundleBox}
                alt="50 Romance eBooks + Audiobooks"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 font-semibold block mb-1">
                Emma's Exclusive Hot Story Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white group-hover:text-rose-200 transition-colors leading-snug">
                50 Romance eBooks + Audiobooks
              </h3>
              <p className="mt-2 text-rose-200 font-semibold text-sm sm:text-base leading-relaxed">
                Get hard in seconds — Turn you on instantly
              </p>
              <p className="mt-1 text-stone-300 text-xs sm:text-sm leading-relaxed">
                Hey, if you feel really romantic right now, get the exclusive hot story here that will make you happy and make you feel something right now. All you need is my exclusive book.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-600 group-hover:bg-rose-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md group-hover:shadow-rose-600/40 w-full sm:w-auto">
                  <span>Get 50 Romance eBooks + Audiobooks Now →</span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>

      {/* 5. DOWN TO ARTICLE: AD SLOT (Replacing blog section with ads) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
        <AdSlot id="ad-slot-photo-bottom" format="banner" minHeight="110px" />
      </div>

      {/* 6. AND DOWN TO ADS THERE WILL BE MORE PHOTOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 border-t border-stone-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block">
              Continue Browsing
            </span>
            <h3 className="text-2xl font-serif font-medium text-stone-900 mt-1">
              More Exclusive Photos
            </h3>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>View Full Gallery</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid of More Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {morePhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                navigate(`/photo/${photo.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer flex flex-col bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt}
                  fill
                  className="group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-mono text-rose-300 uppercase">
                    Intimate Story
                  </span>
                  <h4 className="text-sm font-semibold text-white">
                    {photo.title}
                  </h4>
                  <span className="text-[11px] text-white/90 mt-0.5">
                    Tap to read story →
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-white/90 text-stone-900 text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
                  Emma
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                    {photo.storyExcerpt}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-800 group-hover:text-stone-950">
                  <span>Read Story</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Component for full-screen inspection */}
      <Lightbox
        photos={[currentPhoto]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </div>
  );
};
