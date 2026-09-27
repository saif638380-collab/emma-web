import React, { useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';

export const NativeAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { path } = useRouter();

  if (path.includes('50-romance-ebooks-audiobooks')) {
    return null;
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.hasChildNodes()) return; // Prevent double injection

    // Create the script tag for the native ad
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl31540810.profitableratecpmnetwork.com/36294e3211a4197656dba99b2eeb4b25/invoke.js';
    
    // Create the container div that the script looks for
    const adDiv = document.createElement('div');
    adDiv.id = 'container-36294e3211a4197656dba99b2eeb4b25';
    
    container.appendChild(adDiv);
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full my-5 flex items-center justify-center">
      <div ref={containerRef} className="w-full max-w-4xl flex items-center justify-center transition-colors" />
    </div>
  );
};
