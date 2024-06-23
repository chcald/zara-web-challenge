'use client';

import Header from '../../components/Header';
import { useFavorites } from '../../contexts/FavoritesContext';
import { CharacterSearch } from '../../components/CharacterSearch';
import { useSearch } from '../../contexts/SearchContext';
import { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const { setSearchQuery, searchQuery, resetSearch } = useSearch();
  const { favorites } = useFavorites();
  const [filteredFavorites, setFilteredFavorites] =
    useState<Character[]>(favorites);

  useEffect(() => {
    resetSearch();
  });

  useEffect(() => {
    setFilteredFavorites(
      favorites.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [favorites, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <>
      <Header />
      <CharacterSearch
        handleSearchChange={handleSearchChange}
        characters={filteredFavorites}
        title={'FAVORITES'}
      />
    </>
  );
};

export default FavoritesPage;
