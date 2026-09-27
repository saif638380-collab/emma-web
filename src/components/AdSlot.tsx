import React, { useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';

export interface AdSlotProps {
  id: string;
  format?: 'banner' | 'in-feed' | 'native' | 'responsive';
  className?: string;
  minHeight?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id,
  format = 'responsive',
  className = '',
  minHeight = '100px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { path } = useRouter();

  if (path.includes('50-romance-ebooks-audiobooks')) {
    return null;
  }

  // Default to 300x250
  let adKey = '21b94b016c9cf21345845880190d0be6';
  let adHeight = 250;
  let adWidth = 300;

  // If format is banner, use 728x90
  if (format === 'banner') {
    adKey = '00d99e3da35aa1a30f924198a6e64c9a';
    adHeight = 90;
    adWidth = 728;
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.hasChildNodes()) return;

    const iframe = document.createElement('iframe');
    iframe.width = adWidth.toString();
    iframe.height = adHeight.toString();
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    
    // Add iframe to DOM first so it gets a contentWindow
    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh; overflow: hidden; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              window.atOptions = {
                'key' : '${adKey}',
                'format' : 'iframe',
                'height' : ${adHeight},
                'width' : ${adWidth},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highrevenueformat.com/${adKey}/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
    
  }, [adKey, adHeight, adWidth]);

  return (
    <div
      className={`w-full my-5 flex items-center justify-center ${className}`}
      data-ad-unit={id}
    >
      <div
        id={id}
        ref={containerRef}
        style={{ minHeight, height: adHeight, width: '100%', maxWidth: adWidth }}
        className="bg-stone-50/60 border border-dashed border-stone-200/80 rounded-xl flex items-center justify-center transition-colors shadow-2xs overflow-hidden"
      />
    </div>
  );
};
