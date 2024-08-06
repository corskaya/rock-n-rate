import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setShowAboutModal } from "../slice";
import Song from "../../../types/song";
import AboutModal from "./AboutModal";
import styles from "../styles.module.css";

type Props = {
  song: Song;
};

const MobileAbout: React.FC<Props> = ({ song }) => {
  const showAboutModal = useSelector((state: RootState) => state.song.showAboutModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowAboutModal = (show: boolean) => {
    dispatch(setShowAboutModal(show));
  };

  return (
    <>
      <div
        className={styles.mobileAboutContainer}
        onClick={() => handleShowAboutModal(true)}
      >
        <h1 className={`${styles.songName} ${styles.textShadow}`}>About</h1>
        <p className={styles.aboutTextMobile}>{song.about}</p>
      </div>
      <AboutModal
        show={showAboutModal}
        onClose={() => handleShowAboutModal(false)}
        text={song.about || ""}
      />
    </>
  );
};

export default MobileAbout;
