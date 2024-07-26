import Song from "../../../types/song";
import styles from "../styles.module.css";

type Props = {
  song: Song;
};

const MobileAbout: React.FC<Props> = ({ song }) => {
  return (
    <div className={styles.mobileAboutContainer}>
      <h1 className={`${styles.songName} ${styles.textShadow}`}>About</h1>
      <p className={styles.aboutTextMobile}>{song.about}</p>
    </div>
  );
}

export default MobileAbout;
