import Image from 'next/image';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
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
      </div>
    </div>
  );
}
