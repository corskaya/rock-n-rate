import Album from "../../../types/album";
import styles from "../styles.module.css";

type Props = {
  album: Album;
};

const MobileAbout: React.FC<Props> = ({ album }) => {
  return (
    <div className={styles.mobileAboutContainer}>
      <h1 className={`${styles.albumName} ${styles.textShadow}`}>About</h1>
      <p className={styles.aboutTextMobile}>{album.about}</p>
    </div>
  );
}

export default MobileAbout;
