import React from 'react';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

import { useFavorites } from '../contexts/FavoritesContext';
import { useLoading } from '../contexts/LoadingContext';
import classNames from 'classnames';

const Header = () => {
  const { loading } = useLoading();
  const { favorites } = useFavorites();

  return (
    <header
      className={classNames(styles.header, { [styles.loadingLine]: loading })}
    >
      <Image
        src="/marvel-logo.svg"
        alt="marvel logo"
        width={130}
        height={52}
        priority
      />
      <div className={styles.favoritesCounterWrapper}>
        <Image src="/heart.svg" alt="heart" width={24} height={21.68} />
        <span>{favorites.length}</span>
      </div>
    </header>
  );
};

export default Header;
