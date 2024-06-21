'use client';

import useCharacters from '../hooks/useCharacters';
import Header from '../components/Header';
import { useSearch } from '../contexts/SearchContext';
import { CharacterSearch } from '../components/CharacterSearch';

const HomePage = () => {
  const { characters, error, fetchCharacters } = useCharacters();
  const { setSearchQuery } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      fetchCharacters(undefined, value); // It would implement this in your useCharacters hook to support filtering by name
    } else {
      fetchCharacters(50); // Fetch initial list of characters when search term is cleared or too short
    }
  };

  return (
    <>
      <Header />
      <CharacterSearch handleSearchChange={handleSearchChange} error={error} characters={characters!} />
    </>
  );
};

export default HomePage;
