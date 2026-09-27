import React from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { getArticleBySlug } from '../data/articles';
import { Image } from '../components/Image';
import { MdxContent } from '../components/MdxContent';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ArrowLeft, ArrowRight, BookOpen, Heart } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const SingleArticlePage: React.FC = () => {
  const { params, navigate } = useRouter();
  const slug = params.slug;

  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-3">
          Story Not Found
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          The requested essay could not be located in Emma's journal.
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Emma's Journal</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-stone-900 pb-20">
      <SeoHead
        title={`${article.title} — Written by Emma`}
        description={article.excerpt}
        ogType="article"
        ogImage={article.coverImage}
      />

      {/* Top Ad Slot at the first of page (no text) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-1">
        <AdSlot id="ad-slot-single-article-top" format="banner" minHeight="100px" className="!my-0" />
      </div>

      {/* Header Container */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Emma's Romantic Journal</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span>WRITTEN BY EMMA</span>
          </div>
        </div>

        {/* Header content: Centered for romance bundle, or standard */}
        <div className={article.slug === '50-romance-ebooks-audiobooks' ? 'text-center' : ''}>
          {/* Metadata */}
          <div className={`flex items-center gap-2 text-xs font-mono text-stone-500 mb-3 ${article.slug === '50-romance-ebooks-audiobooks' ? 'justify-center' : ''}`}>
            <span className="text-stone-800 font-medium">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 leading-tight text-balance">
            {article.title}
          </h1>

          {article.slug === '50-romance-ebooks-audiobooks' ? (
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 border border-rose-200/80 max-w-2xl mx-auto shadow-xs">
              <p className="text-base sm:text-lg text-stone-900 font-medium leading-relaxed font-sans">
                <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 inline-block mb-1 sm:mb-0">
                  🔥 Get hard in seconds. Turn you on instantly.
                </span>{' '}
                When you want to feel truly romantic, lose all control, and get lost in pure, breathless passion tonight—all you need is this exclusive collection.
              </p>
            </div>
          ) : (
            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          )}

          {/* Author Byline */}
          <div className={`mt-6 pt-5 border-t border-stone-100 flex items-center gap-3 ${article.slug === '50-romance-ebooks-audiobooks' ? 'justify-center' : ''}`}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200 shrink-0">
              <Image
                src={ASSETS.emma01}
                alt="Emma"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-stone-900 block">
                Emma
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                Short romantic stories, reflections & memories
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/80 shadow-2xs">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
          />
        </div>

        {/* High-Converting CTA Button right down to the photo */}
        <div className="mt-3.5 flex items-center justify-center">
          <a
            href="https://www.checkout-ds24.com/redir/630712/saif219569dafa/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-stone-950 bg-gradient-to-b from-[#ffb703] via-[#fb8500] to-[#e85d04] hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_14px_rgba(251,133,0,0.38)] border-t border-amber-200/60 no-underline cursor-pointer tracking-wide"
          >
            <span className="text-stone-950 flex items-center gap-1.5">
              <span>⚡</span>
              <span>GET 50 ROMANCE EBOOKS + AUDIOBOOKS NOW</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </a>
        </div>
      </div>

      {/* Article Content with Embedded AdSlots */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <MdxContent content={article.content} />
      </div>

      {/* Emma's Exclusive Hot Story Recommendation - Entire card clickable */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 my-10">
        <a
          href="https://www.checkout-ds24.com/redir/630712/saif219569dafa/"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white border border-stone-800 shadow-xl relative overflow-hidden block group hover:border-amber-500/60 transition-all no-underline"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-lg shrink-0 bg-stone-800 border border-stone-700 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={ASSETS.romanceBundleBox}
                alt="50 Romance eBooks + Audiobooks"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                Emma's Exclusive Hot Story Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white group-hover:text-amber-100 transition-colors leading-snug">
                50 Romance eBooks + Audiobooks
              </h3>
              <p className="mt-2 text-amber-300 font-semibold text-sm sm:text-base leading-relaxed">
                Get hard in seconds — Turn you on instantly
              </p>
              <p className="mt-1 text-stone-300 text-xs sm:text-sm leading-relaxed">
                Hey, if you feel really romantic right now, get the exclusive hot story here that will make you happy and make you feel something right now. All you need is my exclusive book.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-stone-950 bg-gradient-to-b from-[#ffb703] via-[#fb8500] to-[#e85d04] group-hover:brightness-110 shadow-[0_4px_14px_rgba(251,133,0,0.4)] transition-all w-full sm:w-auto">
                  <span>⚡ Get 50 Romance eBooks + Audiobooks Now →</span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Author Note Box */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 my-10">
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-2xs shrink-0">
            <Image
              src={ASSETS.emma02}
              alt="Emma"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-xs text-stone-600 leading-relaxed">
            <span className="font-semibold text-stone-900 text-sm block mb-1">
              A Personal Note from Emma
            </span>
            I write these short romantic stories and journal entries to capture the tender, fleeting moments of love, warmth, and quiet heartbeats that make life feel magical. Thank you for reading with an open heart.
          </div>
        </div>
      </div>




    </article>
  );
};
