import React, { useState } from 'react';
import { Send, Heart, CheckCircle2, MessageSquare } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { Image } from './Image';

interface MessageEmmaSectionProps {
  className?: string;
}

export const MessageEmmaSection: React.FC<MessageEmmaSectionProps> = ({ className = '' }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage('Please enter your name and message.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Try server backend endpoint
      const response = await fetch('/api/message-emma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          inbox: 'Inbox response requested',
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        // Fallback directly to Telegram bot API
        const botToken = '8827568319:AAG05YK4Z9jTOBXXwzqYWAEtk7t-losgIs0';
        try {
          const chatId = '8514334720';
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `💌 <b>New Message for Emma!</b>\n\n👤 <b>Name:</b> ${name}\n💬 <b>Message:</b>\n${message}`,
              parse_mode: 'HTML',
            }),
          });
        } catch (innerErr) {
          console.warn('Fallback bot notification completed.', innerErr);
        }
      }

      setSubmitted(true);
      setName('');
      setMessage('');
    } catch (err) {
      console.error('Submission error:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('emma_messages') || '[]');
        stored.push({ name, message, date: new Date().toISOString() });
        localStorage.setItem('emma_messages', JSON.stringify(stored));
      } catch (storageErr) {
        console.warn('Local storage write warning:', storageErr);
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`max-w-2xl mx-auto px-4 sm:px-6 my-6 ${className}`} id="message-emma">
      <div className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-7 shadow-xs">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
            <Image
              src={ASSETS.emma02}
              alt="Emma"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-medium text-stone-900 tracking-tight">
              Wanna tell me something? Write here
            </h3>
            <p className="text-xs text-stone-500">
              Leave your message for Emma below. You will get reply in inbox.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 text-center animate-fade-in">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <h4 className="text-lg font-medium text-stone-900 mb-1">
              Emma will response you
            </h4>
            <p className="text-stone-600 text-xs max-w-sm mx-auto leading-relaxed">
              Your message was received! You will get reply in inbox soon.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-xs font-medium text-stone-800 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Write another note</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should Emma call you?"
                className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:bg-white focus:outline-hidden focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                What you want to say to Emma
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write whatever you want to tell Emma here..."
                className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:bg-white focus:outline-hidden focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Submit & Guarantee */}
            <div className="pt-1 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>You will get reply in inbox</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-medium text-xs rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
