import React from 'react';
import { marked } from 'marked';
import { AdSlot } from './AdSlot';
import { PRODUCTS } from '../data/products';
import { ExternalLink, Tag } from 'lucide-react';
import { Link } from '../context/RouterContext';

interface MdxContentProps {
  content: string;
}

export const MdxContent: React.FC<MdxContentProps> = ({ content }) => {
  // Split content by `<AdSlot ... />` tags so we can render live React components in place
  const parts = content.split(/(<AdSlot\s+id="[^"]+"\s*\/>)/g);

  return (
    <div className="max-w-none text-stone-900">
      {parts.map((part, index) => {
        const adMatch = part.match(/<AdSlot\s+id="([^"]+)"\s*\/>/);
        if (adMatch) {
          const adId = adMatch[1];
          return <AdSlot key={`ad-${index}`} id={adId} format="responsive" />;
        }

        if (!part.trim()) return null;

        // Process markdown for this chunk
        // Intercept affiliate link custom protocol: [Label](affiliate:product-id)
        let processedMarkdown = part;
        const affiliateRegex = /\[([^\]]+)\]\(affiliate:([a-zA-Z0-9_-]+)\)/g;
        processedMarkdown = processedMarkdown.replace(affiliateRegex, (match, label, productId) => {
          const product = PRODUCTS.find((p) => p.id === productId);
          const url = product ? product.affiliateUrl : `/recommends#${productId}`;
          return `__AFFILIATE_START__${label}__AFFILIATE_MID__${url}__AFFILIATE_MID__${productId}__AFFILIATE_END__`;
        });

        // Parse markdown to HTML
        const html = marked.parse(processedMarkdown, {
          gfm: true,
          breaks: true,
        }) as string;

        // Replace affiliate tokens with styled inline badges or CTA button
        const finalHtml = html.replace(
          /__AFFILIATE_START__(.*?)__AFFILIATE_MID__(.*?)__AFFILIATE_MID__(.*?)__AFFILIATE_END__/g,
          (_match, label, url, productId) => {
            if (productId === 'confidence-guide' || label.toLowerCase().includes('guide') || label.includes('→')) {
              return `<div class="my-6">
                <a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="inline-flex items-center justify-between gap-3 w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group text-center no-underline border border-stone-800">
                  <span>${label}</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>`;
            }
            return `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="inline-flex items-center gap-1 font-semibold text-stone-900 underline decoration-stone-400 hover:decoration-stone-900 transition-all group"><span>${label}</span><svg class="inline-block w-3.5 h-3.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;
          }
        );

        return (
          <div
            key={`md-${index}`}
            className="mdx-body leading-relaxed text-base sm:text-lg font-sans space-y-5 text-stone-900"
            dangerouslySetInnerHTML={{ __html: finalHtml }}
          />
        );
      })}
    </div>
  );
};
