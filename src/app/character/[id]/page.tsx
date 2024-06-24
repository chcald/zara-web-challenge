'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../../styles/characterDetail.module.scss';
import Header from '../../../components/Header';
import ComicsList from '../../../components/ComicsList';
import { useFavorites } from '../../../contexts/FavoritesContext';

const CharacterDetailPage = ({ params }: { params: { id: string } }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const { getFavoriteById } = useFavorites();

  useEffect(() => {
    if (params.id) {
      const fetchedCharacter = getFavoriteById(Number(params.id));
      setCharacter(fetchedCharacter!);
    }
  }, [params.id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.characterDetailContainer}>
        <div className={styles.cardInner}>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />

          <div className={styles.boxContent}>
            <div className={styles.boxInner}>
              <span className={styles.rightBox}>{character.name}</span>
              <div className={styles.leftBox}>
                <Image
                  src={'/unselected-heart.svg'}
                  alt="Favorite Hero"
                  width={22}
                  height={24}
                />
              </div>
            </div>
            <div className={styles.bottomBox}>
              <p>{character.description || 'no description'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comicsContainer}>
        <div className={styles.title}>
          <span>COMICS</span>
        </div>
        <ComicsList comics={character.comics} />
      </div>
    </>
  );
};

export default CharacterDetailPage;
