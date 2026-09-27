import React, { useState } from 'react';
import { getAllArticles } from '../data/articles';
import { Image } from '../components/Image';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { Link } from '../context/RouterContext';
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { ASSETS } from '../data/assets';

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  'All',
  'Romantic Stories',
  'First Encounters',
  'Quiet Moments',
  'Love & Longing',
  'Midnight Whispers',
];

export const ArticlesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const allArticles = getAllArticles();

  const filteredArticles =
    selectedCategory === 'All'
      ? allArticles
      : allArticles.filter((a) => a.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      <SeoHead
        title="Emma's Romantic Stories & Blog — Short Tales of Love & Moments"
        description="Heartfelt short romantic stories and blog entries by Emma about love, stolen glances, late-night talks, and unforgettable connections."
      />

      {/* Top Ad Slot at the first of page (no text) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-1">
        <AdSlot id="ad-slot-articles-top" format="banner" minHeight="100px" className="!my-0" />
      </section>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-8">
        <div className="border-b border-stone-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 mb-1">
              <span>Short Stories & Journal</span>
              <span>·</span>
              <span>By Emma</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900 mt-1">
              Emma's Romantic Stories & Blog
            </h1>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Heartfelt short romantic stories, midnight thoughts, and quiet memories captured from the heart.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200">
              <Image
                src={ASSETS.emma01}
                alt="Emma"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-stone-900 block">Emma</span>
              <span className="text-[11px] font-mono text-stone-500">20 Short Stories</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-stone-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="divide-y divide-stone-100">
          {currentArticles.map((article) => (
            <article
              key={article.slug}
              className="py-8 first:pt-2 flex flex-col sm:flex-row items-start gap-5 sm:gap-7 group"
            >
              {/* Thumbnail */}
              <Link
                href={`/articles/${article.slug}`}
                className="w-full sm:w-52 sm:shrink-0 aspect-[16/10] sm:aspect-square overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/70 shadow-2xs"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1.5">
                  <span className="text-stone-800 font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <Link href={`/articles/${article.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 group-hover:underline underline-offset-4 decoration-stone-400 leading-snug">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="mt-3.5 flex items-center justify-between">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:gap-2 transition-all"
                  >
                    <span>Read reflection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <span className="text-[11px] font-mono text-stone-400">
                    By Emma
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isSelected = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-colors ${
                      isSelected
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Bottom Ad Slot */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <AdSlot id="ad-slot-articles-bottom" format="banner" minHeight="100px" />
      </section>
    </div>
  );
};
