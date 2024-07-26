import Artist from "../../../types/artist";
import styles from "../styles.module.css";

type Props = {
  artist: Artist;
};

const MobileAbout: React.FC<Props> = ({ artist }) => {
  return (
    <div className={styles.mobileAboutContainer}>
      <h1 className={`${styles.artistName} ${styles.textShadow}`}>About</h1>
      <p className={styles.aboutTextMobile}>{artist.about}</p>
    </div>
  );
}

export default MobileAbout;
