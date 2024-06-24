import Image from 'next/image';
import styles from '../styles/card.module.scss';
import { useFavorites } from '../contexts/FavoritesContext';

export const Card = ({ character, handleCardClick }: CardProps) => {
  const { isFavorite } = useFavorites();

  return (
    <div className={styles.card} key={character.id}>
      <div className={styles.cardInner}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt="Hero image"
        />
        <div
          className={styles.boxContent}
          onClick={() => handleCardClick(character)}
        >
          <div className={styles.hoverOverlay}></div>
          <span className={styles.rightBox}>{character.name}</span>
          <div className={styles.leftBox}>
            <Image
              src={
                isFavorite(character) ? '/heart.svg' : '/unselected-heart.svg'
              }
              alt="Favorite Hero"
              width={12}
              height={10.84}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
