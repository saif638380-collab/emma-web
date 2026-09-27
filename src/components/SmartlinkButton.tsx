import React from 'react';
import { useRouter } from '../context/RouterContext';

export const SmartlinkButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { path } = useRouter();

  if (path.includes('50-romance-ebooks-audiobooks')) {
    return null;
  }

  return (
    <a
      href="https://www.profitableratecpmnetwork.com/rx5q3jrb53?key=5c6116dc9ebd8a5111c3e79586168bd5"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block text-center w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all uppercase tracking-wide text-sm ${className}`}
    >
      Hot pic of Emma 🔥
    </a>
  );
};
