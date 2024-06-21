import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLoading } from '../contexts/LoadingContext';
import { useSearch } from '../contexts/SearchContext';

import classNames from 'classnames';
import styles from '../styles/header.module.scss';

const Header = () => {
  const { loading } = useLoading();
  const { favorites } = useFavorites();
  const router = useRouter();
  const { resetSearch } = useSearch();

  const handleLogoHeader = () => {
    router.push('/');
    resetSearch();
  };

  return (
    <header
      className={classNames(styles.header, { [styles.loadingLine]: loading })}
    >
      <div className={styles.logoWrapper} onClick={handleLogoHeader}>
        <Image
          src="/marvel-logo.svg"
          alt="marvel logo"
          width={130}
          height={52}
          priority
        />
      </div>
      <div
        className={styles.favoritesCounterWrapper}
        onClick={() => router.push('/favorites')}
      >
        <Image src="/heart.svg" alt="heart" width={24} height={21.68} />
        <span>{favorites.length}</span>
      </div>
    </header>
  );
};

export default Header;
