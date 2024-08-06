import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Label } from "../../../components";
import { getRatings, setShowAboutModal, setShowRateModal, setShowRatingsModal } from "../slice";
import { AppDispatch, RootState } from "../../../store";
import RateModal from "./RateModal";
import RatingsModal from "./RatingsModal";
import Album from "../../../types/album";
import AboutModal from "./AboutModal";
import styles from "../styles.module.css";

type Props = {
  album: Album;
};

const Info: React.FC<Props> = ({ album }) => {
  const showRateModal = useSelector((state: RootState) => state.album.showRateModal);
  const showRatingsModal = useSelector((state: RootState) => state.album.showRatingsModal);
  const showAboutModal = useSelector((state: RootState) => state.artist.showAboutModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowRatingsModal = (show: boolean) => {
    dispatch(getRatings(album._id));
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
              onClick={() => handleShowRatingsModal(true)}
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
              onClick={() => handleShowRateModal(true)}
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
      <p 
        className={styles.aboutTextWeb}
        onClick={() => handleShowAboutModal(true)}
      >
        {album.about}
      </p>
      <RateModal
        show={showRateModal}
        onClose={() => handleShowRateModal(false)}
        album={album}
      />
      <RatingsModal
        show={showRatingsModal}
        onClose={() => handleShowRatingsModal(false)}
        album={album}
      />
      <AboutModal
        show={showAboutModal}
        onClose={() => handleShowAboutModal(false)}
        text={album.about || ""}
      />
    </div>
  );
}

export default Info;
