'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const resetSearch = () => {
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
