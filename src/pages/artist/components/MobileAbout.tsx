import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setShowAboutModal } from "../slice";
import Artist from "../../../types/artist";
import AboutModal from "./AboutModal";
import styles from "../styles.module.css";

type Props = {
  artist: Artist;
};

const MobileAbout: React.FC<Props> = ({ artist }) => {
  const showAboutModal = useSelector((state: RootState) => state.artist.showAboutModal);
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
        <h1 className={`${styles.artistName} ${styles.textShadow}`}>About</h1>
        <p className={styles.aboutTextMobile}>{artist.about}</p>
      </div>
      <AboutModal
        show={showAboutModal}
        onClose={() => handleShowAboutModal(false)}
        text={artist.about || ""}
      />
    </>
  );
};

export default MobileAbout;
