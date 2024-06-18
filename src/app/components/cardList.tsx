import styles from '../styles/character.module.scss';

interface CardListProps {
  list: Character[];
}

export const CardList = ({ list }: CardListProps) => {
  return (
    <>
    {list?.length > 0 ? (
      <div className={styles.cardsContainer}>
        {list.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.cardInner}>
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt="Hero image"
              />
              <div className={styles.boxContent}>
                <span className={styles.rightBox}>{item.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      'NO RESULTS TO SHOW'
    )}
  </>
  );
};
