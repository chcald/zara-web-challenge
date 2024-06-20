'use client';

import styles from '../styles/home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardList } from '../components/CardList';
import useCharacters from '../hooks/useCharacters';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { characters, error, fetchCharacters } = useCharacters();
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchCharacters(undefined, searchTerm);
    } else {
      fetchCharacters(50, undefined);
    }
  }, [searchTerm]);

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
          {characters?.length} RESULT
          {characters?.length !== 1 && 'S'}
        </span>
        {error && <p>Error: {error.message}</p>}
        {characters && <CardList list={characters} />}
      </div>
    </div>
  );
};

export default HomePage;
