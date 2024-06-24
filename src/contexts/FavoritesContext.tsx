'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: Character[];
  addFavorite: (favorite: Character) => void;
  removeFavorite: (favoriteId: number) => void;
  isFavorite: (favorite: Character) => boolean;
  isFromFavorites: boolean;
  setIsFromFavorites: (value: boolean) => void;
  getFavoriteById: (id: number) => Character | undefined;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [isFromFavorites, setIsFromFavorites] = useState<boolean>(false);

  const addFavorite = (favorite: Character) => {
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  };

  const removeFavorite = (favoriteId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== favoriteId),
    );
  };

  const isFavorite = (character: Character) =>
    !character ? false : favorites.some((fav) => fav.id === character.id);

  const getFavoriteById = (id: number): Character | undefined => {
    return favorites.find((favorite) => favorite.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        isFromFavorites,
        setIsFromFavorites,
        getFavoriteById
      }}
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
