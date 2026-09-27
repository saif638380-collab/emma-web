import React from 'react';
import { Link } from '../context/RouterContext';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-stone-200/80 bg-white text-stone-600 text-xs transition-colors mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          
          {/* Site identity */}
          <div>
            <span className="font-semibold tracking-wider uppercase font-sans text-stone-900">
              OBSCURA
            </span>
            <p className="mt-1 text-xs text-stone-500 max-w-sm">
              An exclusive photo-first visual journal. Candid portraits, heartfelt short romantic stories, and tender reflections by Emma.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 font-medium text-stone-600">
            <Link href="/gallery" className="hover:text-stone-950 transition-colors">
              Gallery
            </Link>
            <Link href="/recommends" className="hover:text-stone-950 transition-colors">
              Recommends
            </Link>
            <Link href="/contact" className="hover:text-stone-950 transition-colors">
              Contact
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-stone-950 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Affiliate disclosure & copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-stone-400">
          <p className="max-w-xl leading-relaxed">
            Affiliate Disclosure: Obscura participates in affiliate marketing programs. When you purchase through links on this site, we may earn an affiliate commission at no additional cost to you. All gear and materials listed are independently chosen, used in the field, and genuinely endorsed.
          </p>
          <div className="shrink-0 text-stone-400">
            © {new Date().getFullYear()} Obscura Archive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
