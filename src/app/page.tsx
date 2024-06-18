'use client';

import Image from 'next/image';
import styles from './styles/home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardList } from './components/cardList';
import useCharacters from './hooks/useCharacters';

const HomePage = () => {
  const { characters, loading, error, fetchCharacters } = useCharacters();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/marvel-logo.svg"
          alt="marvel logo"
          width={130}
          height={52}
          priority
        />
        <div className={styles.favoritesCounterWrapper}>
          <Image src="/heart.svg" alt="heart" width={24} height={21.68} />
          <span>3</span>
        </div>
      </header>
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
          />
        </div>
        <span className={styles.resultCount}>{characters?.length} RESULTS</span>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {characters && <CardList list={characters!} />}
        <button onClick={() => fetchCharacters(50)}>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
