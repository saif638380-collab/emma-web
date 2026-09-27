import React from 'react';
import { PHOTOS } from '../data/photos';
import { Image } from '../components/Image';
import { AdSlot } from '../components/AdSlot';
import { SeoHead } from '../components/SeoHead';
import { useRouter } from '../context/RouterContext';
import { BookOpen } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SeoHead
        title="Emma's Gallery — Candid Moments & Stories"
        description="Browse Emma's portraits and candid visual moments. Click any photo to read Emma's thoughts and reflection."
      />

      {/* Top Ad Slot at the first of the page (no text) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-1">
        <AdSlot
          id="ad-slot-gallery-top"
          format="banner"
          minHeight="100px"
          className="!my-0"
        />
      </section>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-8">
        <div className="border-b border-stone-100 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
            Visual Journal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900 mt-1">
            Emma's Photo Gallery
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            A quiet visual archive of candid portraits. Click any photo to read Emma's intimate story.
          </p>
        </div>
      </section>

      {/* Responsive Grid with Native Ad inserted after 6 images */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {PHOTOS.map((photo, index) => {
            const showAdAfter = index === 5;

            return (
              <React.Fragment key={photo.id}>
                {/* Photo Card */}
                <div
                  onClick={() => {
                    navigate(`/photo/${photo.id}`);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-50 border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt}
                      fill
                      priority={index < 4}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] font-mono tracking-wider text-white/80 uppercase">
                        Emma's Gallery
                      </span>
                      <h3 className="text-sm font-semibold text-white mt-0.5">
                        {photo.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-white/90 bg-white/20 px-2.5 py-0.5 rounded-full w-fit">
                        <BookOpen className="w-3 h-3" />
                        <span>Read reflection →</span>
                      </div>
                    </div>

                    <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-stone-800 bg-white/90 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-2xs">
                      Emma
                    </div>
                  </div>

                  {/* Clean caption below photo */}
                  <div className="p-3.5 bg-white border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900 truncate pr-2">
                      {photo.title}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400 shrink-0">
                      Read Story
                    </span>
                  </div>
                </div>

                {/* Native Ad Block after 6th image */}
                {showAdAfter && (
                  <div className="col-span-full py-4">
                    <AdSlot
                      id="ad-slot-gallery-native"
                      format="native"
                      className="!my-2"
                      minHeight="120px"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
};
