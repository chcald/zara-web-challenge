'use client';

import Header from '../../components/Header';
import { useFavorites } from '../../contexts/FavoritesContext';
import { CharacterSearch } from '../../components/CharacterSearch';
import { useSearch } from '../../contexts/SearchContext';

const FavoritesPage = () => {
  const { setSearchQuery } = useSearch();
  const { favorites } = useFavorites();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <>
      <Header />
      <CharacterSearch
        handleSearchChange={handleSearchChange}
        characters={favorites}
        title={'FAVORITES'}
      />
    </>
  );
};

export default FavoritesPage;
