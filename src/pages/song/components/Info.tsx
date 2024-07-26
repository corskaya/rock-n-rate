import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Label } from "../../../components";
import RateModal from "./RateModal";
import RatingsModal from "./RatingsModal";
import { AppDispatch, RootState } from "../../../store";
import Song from "../../../types/song";
import { getRatings, setShowRateModal, setShowRatingsModal } from "../slice";
import styles from "../styles.module.css";

type Props = {
  song: Song;
};

const Info: React.FC<Props> = ({ song }) => {
  const showRateModal = useSelector((state: RootState) => state.song.showRateModal);
  const showRatingsModal = useSelector((state: RootState) => state.song.showRatingsModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowRatingsModal = () => {
    dispatch(getRatings(song._id));
    dispatch(setShowRatingsModal(true));
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
              onClick={handleShowRatingsModal}
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
              onClick={() => dispatch(setShowRateModal(true))}
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
      <p className={styles.aboutTextWeb}>{song.about}</p>
      <RateModal
        show={showRateModal}
        onClose={() => dispatch(setShowRateModal(false))}
        song={song}
      />
      <RatingsModal
        show={showRatingsModal}
        onClose={() => dispatch(setShowRatingsModal(false))}
        song={song}
      />
    </div>
  );
}

export default Info;
