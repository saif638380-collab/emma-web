/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { SingleArticlePage } from './pages/SingleArticlePage';
import { RecommendsPage } from './pages/RecommendsPage';
import { ContactPage } from './pages/ContactPage';
import { PhotoDetailPage } from './pages/PhotoDetailPage';
import { MessageEmmaSection } from './components/MessageEmmaSection';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Route resolver
  const renderCurrentPage = () => {
    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path.startsWith('/photo/') || path.startsWith('/photos/')) {
      return <PhotoDetailPage />;
    }
    if (path === '/gallery' || path.startsWith('/gallery/')) {
      return <GalleryPage />;
    }
    if (path.startsWith('/articles/')) {
      return <SingleArticlePage />;
    }
    if (path === '/articles') {
      return <ArticlesPage />;
    }
    if (path === '/recommends' || path.startsWith('/recommends/')) {
      return <RecommendsPage />;
    }
    if (path === '/contact') {
      return <ContactPage />;
    }

    // Fallback 404
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-serif font-medium text-stone-900">
          404 — Story Not Found
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          The requested coordinate does not exist in this archive.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
        >
          Return to Overview
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-stone-900">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      {/* Reader message form at the very bottom of the page, up to the footer */}
      <div className="w-full border-t border-stone-100 bg-stone-50/50 py-4">
        <MessageEmmaSection />
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}
