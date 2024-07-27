import styles from "../styles.module.css";

const Description: React.FC = () => {
  return (
    <div className={styles.descriptionContainer}>
      <h1 className={styles.descriptionHeader}>Welcome To Rock'n Rate!</h1>
      <p className={styles.descriptionText}>
        Welcome to the ultimate destination for music enthusiasts and rock
        aficionados alike. Immerse yourself in a world where every beat, every
        riff, and every lyric holds the power to inspire and resonate.
      </p>
    </div>
  );
}

export default Description;
