import Song from "../../../../types/song";
import styles from "./MobileMainInfo.module.css";
import dayjs from "dayjs";

type Props = {
  song: Song;
};

const MobileMainInfo: React.FC<Props> = ({ song }) => {
  return (
    <div className={styles.mobileMainInfoContainer}>
      <h1 className={`${styles.songName} ${styles.textShadow}`}>
        {song.name}
      </h1>
      <h3 className={`${styles.foundationYear} ${styles.textShadow}`}>
        {dayjs(song.releaseDate).format("YYYY")}
      </h3>
      <h3 className={`${styles.genres} ${styles.textShadow}`}>
        {song.genres.join(" / ")}
      </h3>
    </div>
  );
}

export default MobileMainInfo;
