import React, { useState } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { Menu, X, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Gallery', href: '/gallery' },
    { label: 'Recommends', href: '/recommends' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-100 transition-colors shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Text only, no logo, clean display typography) */}
        <Link
          href="/"
          className="text-lg tracking-wider font-semibold font-sans uppercase text-stone-900 hover:opacity-75 transition-opacity"
        >
          OBSCURA
        </Link>

        {/* Zone 2: Navigation Links (Clean text links with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-stone-950 ${
                  isActive ? 'text-stone-950 font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Special Romance button + Mobile toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/articles/50-romance-ebooks-audiobooks"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md hover:shadow-blue-600/30 whitespace-nowrap"
            title="Emma's Special Romance Collection"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Special Romance</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-stone-600 hover:text-stone-950 rounded-lg hover:bg-stone-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-100 bg-white px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <Link
              href="/articles/50-romance-ebooks-audiobooks"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Special Romance Collection</span>
            </Link>
            {navLinks.map((link) => {
              const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 transition-colors ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
