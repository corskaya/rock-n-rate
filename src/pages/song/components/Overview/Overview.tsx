import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DashboardFilled } from "@ant-design/icons";
import { RecordVoiceOver, CalendarMonth, Album, Star, AddTask } from '@mui/icons-material';
import dayjs from "dayjs";
import { Loading, Message } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { getOverview, getRatings, setShowRatingsModal } from "../../slice";
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
  } = useSelector((state: RootState) => state.song);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleShowRatingsModal = (show: boolean) => {
    dispatch(getRatings(slug!));
    dispatch(setShowRatingsModal(show));
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
                <RecordVoiceOver className={styles.overviewBoxIcon} />
                <Link 
                  className={styles.overviewBoxLink}
                  to={`/artist/${overview.artist.slug}`}
                >
                  <div className={styles.overviewBoxText}>
                    {overview.artist.name}
                  </div>
                </Link>
              </div>
              <div className={styles.overviewInnerBox}>
                <Album className={styles.overviewBoxIcon} />
                <Link 
                  className={styles.overviewBoxLink}
                  to={`/album/${overview.album.slug}`}
                >
                  <div className={styles.overviewBoxText}>
                    {overview.album.name}
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <CalendarMonth className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{dayjs(overview.releaseDate).format("DD.MM.YYYY")}</div>
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
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Star className={styles.overviewBoxIcon} />
                <div 
                  className={`${styles.overviewBoxText} ${styles.overviewBoxLink}`}
                  onClick={() => handleShowRatingsModal(true)}
                >
                  {t("{{count}} Ratings", { count: overview.ratingCount })}
                </div>
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
