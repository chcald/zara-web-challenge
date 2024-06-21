import React from 'react';
import { CardList } from './CardList';
import styles from '../styles/characterSearch.module.scss';
import { useSearch } from '../contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const CharacterSearch = ({
  title,
  handleSearchChange,
  characters,
  error,
}: CharacterSearchProps) => {
  const { searchQuery } = useSearch();

  return (
    <div className={styles.characterSearchContainer}>
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.searchWrapper}>
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.searchIcon}
          size="sm"
        />
        <input
          type="text"
          placeholder="SEARCH A CHARACTER..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.resultCount}>
        {characters?.length} RESULT{characters?.length !== 1 && 'S'}
      </div>
      {error && <p>Error: {error.message}</p>}
      {characters && <CardList list={characters} />}
    </div>
  );
};
