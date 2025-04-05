import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardFilled } from "@ant-design/icons";
import { Public, CalendarMonth, Album, MusicNote, Star, AddTask } from '@mui/icons-material';
import { useParams, Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { Loading, Message } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { getAlbums, getAlbumsWithSongs, getOverview, getRatings, setShowAlbumsModal, setShowRatingsModal, setShowSongsModal } from "../../slice";
import styles from "./Overview.module.css";
import { useTranslation } from "react-i18next";

const Overview: React.FC = () => {
  const { slug } = useParams();
  const {
    overviewPending,
    overviewFulfilled,
    overviewRejected,
    overview,
    overviewErrorMessage,
  } = useSelector((state: RootState) => state.artist);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleShowRatingsModal = (show: boolean) => {
    dispatch(getRatings(slug!));
    dispatch(setShowRatingsModal(show));
  };

  const handleShowAlbumsModal = (show: boolean) => {
    dispatch(getAlbums(slug!));
    dispatch(setShowAlbumsModal(show));
  };

  const handleShowSongsModal = (show: boolean) => {
    dispatch(getAlbumsWithSongs(slug!));
    dispatch(setShowSongsModal(show));
  };

  useEffect(() => {
    dispatch(getOverview(slug!));
  }, [dispatch, slug]);

  return (
    <div className={styles.overviewContainer}>
      {overviewPending && <Loading />}
      {overviewFulfilled && overview && (
        <>
          <div className={styles.overviewHeader}>
            <DashboardFilled className={styles.overviewIcon} />
            <h4
              className={styles.overviewHeading}
            >{t("Overview")}</h4>
          </div>
          <div className={styles.overview}>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Public className={styles.overviewBoxIcon} />
                <ReactCountryFlag className={styles.overviewCountryFlag} countryCode={overview.country} svg />
              </div>
              <div className={styles.overviewInnerBox}>
                <Album className={styles.overviewBoxIcon} />
                <div 
                  className={`${styles.overviewBoxText} ${styles.overviewBoxLink}`}
                  onClick={() => handleShowAlbumsModal(true)}
                >
                  {`${overview.albumCount} ${t("Albums")}`}
                </div>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <CalendarMonth className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{overview.foundationYear}</div>
              </div>
              <div className={styles.overviewInnerBox}>
                <MusicNote className={styles.overviewBoxIcon} />
                <div 
                  className={`${styles.overviewBoxText} ${styles.overviewBoxLink}`}
                  onClick={() => handleShowSongsModal(true)}
                >
                  {`${overview.songCount} ${t("Songs")}`}
                </div>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Star className={styles.overviewBoxIcon} />
                <div 
                  className={`${styles.overviewBoxText} ${styles.overviewBoxLink}`}
                  onClick={() => handleShowRatingsModal(true)}
                >
                  {`${overview.ratingCount} ${t("Ratings")}`}
                </div>
              </div>
              <div className={styles.overviewInnerBox}>
                <AddTask className={styles.overviewBoxIcon} />
                <Link 
                  className={styles.overviewBoxLink}
                  to={`/user/${overview.addedByUser.username}`}
                >
                <div className={styles.overviewBoxText}>
                  {overview.addedByUser.username}
                </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {overviewRejected && <Message>{overviewErrorMessage}</Message>}
    </div>
  );
};

export default Overview;
