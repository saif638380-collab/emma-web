import React, { useState } from 'react';
import { SeoHead } from '../components/SeoHead';
import { Instagram, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      <SeoHead
        title="Contact & Inquiries — Obscura"
        description="Direct contact form for print inquiries, shoot collaborations, and Instagram direct messages."
      />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="border-b border-stone-100 pb-6 mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
            Direct Line
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900 mt-1">
            Contact
          </h1>
          <p className="mt-2 text-stone-600 text-sm">
            For archival darkroom print inquiries, editorial collaborations, or quiet photographic discourse.
          </p>
        </div>

        {/* Instagram direct banner */}
        <div className="mb-8 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-stone-900 shadow-2xs border border-stone-100">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900">
                Direct on Instagram
              </h3>
              <p className="text-xs text-stone-500">
                Fastest response for quick questions or shoot location notes.
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:opacity-85 transition-opacity"
          >
            Open Profile
          </a>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="p-8 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-medium text-stone-900">
              Message Transmitted
            </h3>
            <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
              Your message has been queued to the field log. Replies are returned during weekly darkroom sessions.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-4 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-2xs"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
              >
                Your Name <span className="text-stone-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. S. Vance"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
              >
                Email Address <span className="text-stone-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
              >
                Inquiry Topic
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Print acquisition / Shoot question / General"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
              >
                Message <span className="text-stone-400">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your note here..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-stone-900 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
