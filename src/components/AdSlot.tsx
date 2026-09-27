import React, { useEffect, useRef } from 'react';

export interface AdSlotProps {
  id: string;
  format?: 'banner' | 'in-feed' | 'native' | 'responsive';
  className?: string;
  minHeight?: string;
}

/**
 * Reusable AdSlot component configured for client-side injection (e.g. Adsterra, Google AdSense).
 * Avoids SSR/hydration mismatches by deferring script evaluation to useEffect on the client.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  id,
  format = 'responsive',
  className = '',
  minHeight = '100px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-side script injection hook for Adsterra or native advertising networks.
    /*
    const container = containerRef.current;
    if (!container) return;

    (window as any).atOptions = {
      'key': 'YOUR_ADSTERRA_KEY_HERE',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//www.profitablecreativeformat.com/YOUR_KEY/invoke.js';
    container.appendChild(script);

    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
    */
  }, [id, format]);

  return (
    <div
      className={`w-full my-5 flex items-center justify-center ${className}`}
      data-ad-unit={id}
    >
      <div
        id={id}
        ref={containerRef}
        style={{ minHeight }}
        className="w-full max-w-4xl bg-stone-50/60 border border-dashed border-stone-200/80 rounded-xl flex items-center justify-center transition-colors shadow-2xs"
      />
    </div>
  );
};
