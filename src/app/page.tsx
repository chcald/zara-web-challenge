import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Image
          className={styles.logo}
          src="/heart.svg"
          alt="Heart"
          width={24}
          height={21.68}
          priority
        />
      </div>
    </main>
  );
}
