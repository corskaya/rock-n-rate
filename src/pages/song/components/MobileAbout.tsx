import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setShowAboutModal } from "../slice";
import Song from "../../../types/song";
import AboutModal from "./AboutModal";
import styles from "../styles.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  song: Song;
};

const MobileAbout: React.FC<Props> = ({ song }) => {
  const showAboutModal = useSelector(
    (state: RootState) => state.song.showAboutModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleShowAboutModal = (show: boolean) => {
    dispatch(setShowAboutModal(show));
  };

  return (
    <>
      {song.about && (
        <>
          <div
            className={styles.mobileAboutContainer}
            onClick={() => handleShowAboutModal(true)}
          >
            <h1 className={`${styles.aboutHeadingMobile} ${styles.textShadow}`}>
              {t("About")}
            </h1>
            <p className={styles.aboutTextMobile}>{song.about}</p>
          </div>
          <AboutModal
            show={showAboutModal}
            onClose={() => handleShowAboutModal(false)}
            text={song.about || ""}
          />
        </>
      )}
    </>
  );
};

export default MobileAbout;
