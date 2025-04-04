import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { setShowAboutModal } from "../../slice";
import Album from "../../../../types/album";
import AboutModal from "../AboutModal/AboutModal";
import styles from "./MobileAbout.module.css";

type Props = {
  album: Album;
};

const MobileAbout: React.FC<Props> = ({ album }) => {
  const showAboutModal = useSelector(
    (state: RootState) => state.album.showAboutModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleShowAboutModal = (show: boolean) => {
    dispatch(setShowAboutModal(show));
  };

  return (
    <>
      {album.about && (
        <>
          <div
            className={styles.mobileAboutContainer}
            onClick={() => handleShowAboutModal(true)}
          >
            <h1 className={`${styles.aboutHeadingMobile} ${styles.textShadow}`}>
              About
            </h1>
            <p className={styles.aboutTextMobile}>{album.about}</p>
          </div>
          <AboutModal
            show={showAboutModal}
            onClose={() => handleShowAboutModal(false)}
            text={album.about || ""}
          />
        </>
      )}
    </>
  );
};

export default MobileAbout;
