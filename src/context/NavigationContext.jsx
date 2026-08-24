import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const NavigationContext = createContext(null);

const PUBLIC_PAGES = ['landing', 'signin', 'signup', 'setup'];

function sanitizePageName(raw) {
  if (!raw) return 'landing';
  const clean = String(raw).startsWith('/') ? raw.slice(1).toLowerCase() : String(raw).toLowerCase();
  return clean || 'landing';
}

export function NavigationProvider({ children }) {
  const { currentUser } = useAuth();

  const [currentPage, setCurrentPage] = useState('landing');
  const [pageParams, setPageParams] = useState({});

  function navigate(targetPage, params = {}) {
    const clean = sanitizePageName(targetPage);
    setPageParams(params || {});
    setCurrentPage(clean);
  }

  useEffect(() => {
    if (!currentUser && !PUBLIC_PAGES.includes(currentPage)) {
      setCurrentPage('landing');
    }
  }, [currentUser, currentPage]);

  const value = {
    currentPage,
    pageParams,
    navigate,
    isPublicPage: PUBLIC_PAGES.includes(currentPage),
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
