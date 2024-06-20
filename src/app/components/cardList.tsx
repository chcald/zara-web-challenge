import Image from 'next/image';
import styles from '@/app/styles/character.module.scss';

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
                  <div className={styles.hoverOverlay}></div>
                  <span className={styles.rightBox}>{item.name}</span>
                  <div className={styles.leftBox}>
                    <Image
                      src="/unselected-heart.svg"
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
      ) : (
        'NO RESULTS TO SHOW'
      )}
    </>
  );
};
