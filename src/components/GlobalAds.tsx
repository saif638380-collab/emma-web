import React, { useEffect, useState } from 'react';
import { useRouter } from '../context/RouterContext';

export const GlobalAds: React.FC = () => {
  const { path } = useRouter();
  const isMoneyPage = path.includes('50-romance-ebooks-audiobooks');
  const [showSocialBar, setShowSocialBar] = useState(false);

  // Toggle Social Bar visibility: off for 4s, on for 3s
  useEffect(() => {
    if (isMoneyPage) return;

    let timeoutId: NodeJS.Timeout;

    const runCycle = () => {
      // Hide for 4 seconds
      setShowSocialBar(false);
      timeoutId = setTimeout(() => {
        // Show for 3 seconds
        setShowSocialBar(true);
        timeoutId = setTimeout(runCycle, 3000);
      }, 4000);
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [isMoneyPage]);

  useEffect(() => {
    if (isMoneyPage) return;

    // Popunder (Inject normally as it works in background)
    const popScript = document.createElement('script');
    popScript.src = 'https://pl31540809.profitableratecpmnetwork.com/1d/19/1d/1d191dfc589c3ff1ddf46cceecb105ee.js';
    popScript.async = true;
    popScript.id = 'ad-popunder';

    if (!document.getElementById('ad-popunder')) {
      document.body.appendChild(popScript);
    }

    return () => {
      const p = document.getElementById('ad-popunder');
      if (p) p.remove();
    };
  }, [isMoneyPage]);

  if (isMoneyPage) return null;

  // Render Social Bar in an iframe to easily control its visibility without breaking its internal logic
  const socialBarSrc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background: transparent; }
        </style>
      </head>
      <body>
        <script src="https://pl31540817.profitableratecpmnetwork.com/a4/74/00/a47400c4d9a1053970a105be13e4278b.js"></script>
      </body>
    </html>
  `;

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none transition-opacity duration-300"
      style={{
        height: '150px',
        opacity: showSocialBar ? 1 : 0,
        pointerEvents: showSocialBar ? 'auto' : 'none'
      }}
    >
      <iframe
        srcDoc={socialBarSrc}
        width="100%"
        height="100%"
        style={{ border: 'none', background: 'transparent' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </div>
  );
};
