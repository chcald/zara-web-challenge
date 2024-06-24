import React from 'react';
import styles from '../styles/comicsList.module.scss';
import Comic from './Comic';

const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <div className={styles.comicsList}>
      {comics.items.map((comic, index) => (
        <Comic key={index} resourceURI={comic.resourceURI} name={comic.name} image={''} />
      ))}
    </div>
  );
};

export default ComicsList;
