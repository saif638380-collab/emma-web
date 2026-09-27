import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {},
});

export function useRouter() {
  return useContext(RouterContext);
}

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    // Support pathname or hash route fallback
    if (window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash.startsWith('#/')) {
        setPath(window.location.hash.slice(1));
      } else {
        setPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (path === to) return;
    try {
      window.history.pushState({}, '', to);
    } catch {
      // In restricted iframe environments fallback to hash
      window.location.hash = '#' + to;
    }
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Extract params (e.g. for /articles/:slug and /photo/:id)
  const params: Record<string, string> = {};
  if (path.startsWith('/articles/')) {
    const slug = path.replace('/articles/', '').split('?')[0].split('#')[0];
    if (slug) params.slug = slug;
  } else if (path.startsWith('/photo/')) {
    const photoId = path.replace('/photo/', '').split('?')[0].split('#')[0];
    if (photoId) {
      params.photoId = photoId;
      params.id = photoId;
    }
  } else if (path.startsWith('/photos/')) {
    const photoId = path.replace('/photos/', '').split('?')[0].split('#')[0];
    if (photoId) {
      params.photoId = photoId;
      params.id = photoId;
    }
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = '',
  onClick,
  ...props
}) => {
  const { path, navigate } = useRouter();
  const isActive = path === href || (href !== '/' && path.startsWith(href));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !props.target) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
};
