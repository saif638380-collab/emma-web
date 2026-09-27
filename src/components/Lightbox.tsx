import React, { useEffect, useCallback, useRef } from 'react';
import { PhotoItem } from '../data/photos';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    const nextIdx = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image view"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top action bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white/80 z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/50 tracking-wider">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="hidden sm:inline text-xs text-white/40">·</span>
          <span className="hidden sm:inline text-xs font-medium tracking-wide text-white/90">
            {currentPhoto.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16">
        <img
          key={currentPhoto.id}
          src={currentPhoto.imageUrl}
          alt={currentPhoto.alt}
          className="max-h-[85vh] max-w-[92vw] md:max-w-[85vw] object-contain shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom subtle caption */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-[11px] pointer-events-none hidden sm:block">
        Use Arrow keys or swipe to browse · Press Esc to exit
      </div>
    </div>
  );
};
