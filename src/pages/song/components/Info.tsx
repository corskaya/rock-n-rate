import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Label } from "../../../components";
import { AppDispatch, RootState } from "../../../store";
import { getRatings, setShowAboutModal, setShowRateModal, setShowRatingsModal } from "../slice";
import RateModal from "./RateModal";
import RatingsModal from "./RatingsModal";
import Song from "../../../types/song";
import AboutModal from "./AboutModal";
import styles from "../styles.module.css";

type Props = {
  song: Song;
};

const Info: React.FC<Props> = ({ song }) => {
  const showRateModal = useSelector((state: RootState) => state.song.showRateModal);
  const showRatingsModal = useSelector((state: RootState) => state.song.showRatingsModal);
  const showAboutModal = useSelector((state: RootState) => state.artist.showAboutModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowRatingsModal = (show: boolean) => {
    dispatch(getRatings(song.slug));
    dispatch(setShowRatingsModal(show));
  };

  const handleShowRateModal = (show: boolean) => {
    dispatch(setShowRateModal(show));
  };

  const handleShowAboutModal = (show: boolean) => {
    dispatch(setShowAboutModal(show));
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.mainInfoContainer}>
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
      <div className={styles.ratingsContainer}>
        <div className={styles.ratingContainer}>
          <Label className={`${styles.ratingText} ${styles.textShadow}`}>
            R'NR RATING
          </Label>
          <div>
            <div
              className={styles.ratingPointContainer}
              onClick={() => handleShowRatingsModal(true)}
            >
              <StarFilled className={styles.ratingIcon} />
              <div className={styles.ratingPoint}>
                {song.rating !== 0 ? song.rating : "?"}
              </div>
              <div className={styles.ratingMax}>/ 10</div>
            </div>
          </div>
        </div>
        <div className={styles.ratingContainer}>
          <Label className={`${styles.ratingText} ${styles.textShadow}`}>
            YOUR RATING
          </Label>
          <div>
            <div
              className={styles.ratingPointContainer}
              onClick={() => handleShowRateModal(true)}
            >
              <StarFilled className={styles.userRatingIcon} />
              <div className={styles.ratingPoint}>
                {song.ratingOfRelevantUser ?? "?"}
              </div>
              <div className={styles.ratingMax}>/ 10</div>
            </div>
          </div>
        </div>
      </div>
      <p 
        className={styles.aboutTextWeb}
        onClick={() => handleShowAboutModal(true)}
      >
        {song.about}
      </p>
      <RateModal
        show={showRateModal}
        onClose={() => handleShowRateModal(false)}
        song={song}
      />
      <RatingsModal
        show={showRatingsModal}
        onClose={() => handleShowRatingsModal(false)}
        song={song}
      />
      <AboutModal
        show={showAboutModal}
        onClose={() => handleShowAboutModal(false)}
        text={song.about || ""}
      />
    </div>
  );
}

export default Info;
