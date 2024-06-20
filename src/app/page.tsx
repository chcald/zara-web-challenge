'use client';

import styles from '@/app/styles/home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardList } from '@/app/components/CardList';
import useCharacters from '@/app/hooks/useCharacters';
import Header from '@/app/components/Header';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { characters, error } = useCharacters();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    characters && setFilteredCharacters(characters);
  }, []);

  useEffect(() => {
    console.log(searchTerm)
    if (characters) {
      if (searchTerm.length > 0) {
        setFilteredCharacters(
          characters.filter((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      } else {
        setFilteredCharacters(characters);
      }
    }
  }, [searchTerm, characters]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.searchIcon}
            size="sm"
          />
          <input
            type="text"
            placeholder="SEARCH A CHARACTER..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className={styles.resultCount}>
          {filteredCharacters?.length} RESULT
          {filteredCharacters?.length !== 1 && 'S'}
        </span>
        {error && <p>Error: {error.message}</p>}
        {filteredCharacters && <CardList list={filteredCharacters} />}
      </div>
    </div>
  );
};

export default HomePage;
