import Album from "../../../types/album";
import styles from "../styles.module.css";
import dayjs from "dayjs";

type Props = {
  album: Album;
};

const MobileMainInfo: React.FC<Props> = ({ album }) => {
  return (
    <div className={styles.mobileMainInfoContainer}>
      <h1 className={`${styles.albumName} ${styles.textShadow}`}>
        {album.name}
      </h1>
      <h3 className={`${styles.foundationYear} ${styles.textShadow}`}>
        {dayjs(album.releaseDate).format("YYYY")}
      </h3>
      <h3 className={`${styles.genres} ${styles.textShadow}`}>
        {album.genres.join(" / ")}
      </h3>
    </div>
  );
}

export default MobileMainInfo;
