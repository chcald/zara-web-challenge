import Image from 'next/image';
import styles from '../styles/card.module.scss';
import { useFavorites } from '../contexts/FavoritesContext';

interface CardListProps {
  list: Character[];
}

export const CardList = ({ list }: CardListProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.id === character.id);
  };

  const handleFavoriteClick = (character: Character) => {
    if (isFavorite(character)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };
  return (
    <div className={styles.cardsContainer}>
      {list.map((item) => (
        <div className={styles.card} key={item.id}>
          <div className={styles.cardInner}>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt="Hero image"
            />
            <div
              className={styles.boxContent}
              onClick={() => handleFavoriteClick(item)}
            >
              <div className={styles.hoverOverlay}></div>
              <span className={styles.rightBox}>{item.name}</span>
              <div className={styles.leftBox}>
                <Image
                  src={
                    isFavorite(item) ? '/heart.svg' : '/unselected-heart.svg'
                  }
                  alt="favorite"
                  width={12}
                  height={10.84}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
