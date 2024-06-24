import React from 'react';
import useComicImageService from '../hooks/useComicImage';
import { useState } from 'react';
import styles from '../styles/comic.module.scss';

const Comic = (comic: ComicProps) => {
  const [comicUrl] = useState<string>(
    comic.resourceURI,
  );
  const { comicImage, loading, error } = useComicImageService(comicUrl);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error loading image {error.message}</div>;
  }

  return (
    <div>
      <div className={styles.comicCard}>
        <img src={comicImage} alt={comic.name} />
        <div className={styles.name}>{comic.name}</div>
      </div>
    </div>
  );
};

export default Comic;
