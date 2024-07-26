import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Label } from "../../../components";
import RateModal from "./RateModal.tsx";
import RatingsModal from "./RatingsModal.tsx";
import { AppDispatch, RootState } from "../../../store";
import Album from "../../../types/album";
import { getRatings, setShowRateModal, setShowRatingsModal } from "../slice";
import styles from "../styles.module.css";

type Props = {
  album: Album;
};

const Info: React.FC<Props> = ({ album }) => {
  const showRateModal = useSelector((state: RootState) => state.album.showRateModal);
  const showRatingsModal = useSelector((state: RootState) => state.album.showRatingsModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowRatingsModal = () => {
    dispatch(getRatings(album._id));
    dispatch(setShowRatingsModal(true));
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.mainInfoContainer}>
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
                {album.rating !== 0 ? album.rating : "?"}
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
                {album.ratingOfRelevantUser ?? "?"}
              </div>
              <div className={styles.ratingMax}>/ 10</div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.aboutTextWeb}>{album.about}</p>
      <RateModal
        show={showRateModal}
        onClose={() => dispatch(setShowRateModal(false))}
        album={album}
      />
      <RatingsModal
        show={showRatingsModal}
        onClose={() => dispatch(setShowRatingsModal(false))}
        album={album}
      />
    </div>
  );
}

export default Info;
