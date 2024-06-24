import styles from '../styles/listCard.module.scss';
import { useFavorites } from '../contexts/FavoritesContext';
import { Card } from './Card';
import { useRouter } from 'next/navigation';

export const CardList = ({ list }: CardListProps) => {
  const { isFavorite, addFavorite, removeFavorite, isFromFavorites } =
    useFavorites();
  const router = useRouter();

  const getHandleFavoriteClick = () => {
    const handleFavoriteClick = (character: Character) => {
      if (isFavorite(character)) {
        removeFavorite(character.id);
      } else {
        addFavorite(character);
      }
    };

    const handleGoDetailClick = (character: Character) => {
      router.push(`/character/${character.id}`);
    };

    if (isFromFavorites) {
      return handleGoDetailClick;
    } else {
      return handleFavoriteClick;
    }
  };
  return (
    <div className={styles.cardsContainer}>
      {list.map((item) => (
        <Card
          key={item.id}
          character={item}
          handleCardClick={getHandleFavoriteClick()}
        />
      ))}
    </div>
  );
};
