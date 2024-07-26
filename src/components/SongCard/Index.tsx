import Song from "../../types/song";
import styles from "./styles.module.css";

type Props = {
  className?: string;
  song: Song;
};

const SongCard: React.FC<Props> = ({ className, song }) => {
  return (
    <div className={`${styles.songCardContainer} ${className}`}>
      <img className={styles.songCardImage} src={song.image} alt={song.name} />
      <div className={styles.songCardInfo}>
        <div className={styles.songCardName}>{song.name}</div>
        <div className={styles.songCardArtist}>{song.artistRefName}</div>
      </div>
    </div>
  );
}

export default SongCard;
