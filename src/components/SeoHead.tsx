import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description = 'An anonymous photo-first visual journal featuring exclusive unposted 35mm frames, field notes, and curated gear recommendations.',
  ogType = 'website',
  ogImage,
}) => {
  useEffect(() => {
    // Update title
    document.title = title.includes('Obscura') ? title : `${title} — Obscura`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // Update og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update og:type
    let ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

  }, [title, description, ogType, ogImage]);

  return null;
};
