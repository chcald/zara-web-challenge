'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: Character[];
  addFavorite: (favorite: Character) => void;
  removeFavorite: (favoriteId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  const addFavorite = (favorite: Character) => {
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  };

  const removeFavorite = (favoriteId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== favoriteId),
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
