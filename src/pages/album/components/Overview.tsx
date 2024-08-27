import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DashboardFilled } from "@ant-design/icons";
import { RecordVoiceOver, CalendarMonth, MusicNote, Star, AddTask } from '@mui/icons-material';
import dayjs from "dayjs";
import { Loading, Message } from "../../../components";
import { AppDispatch, RootState } from "../../../store";
import { getOverview } from "../slice";
import styles from "../styles.module.css";

const Overview: React.FC = () => {
  const { id } = useParams();
  const {
    overviewPending,
    overviewFulfilled,
    overviewRejected,
    overview,
    overviewErrorMessage,
  } = useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOverview(id!));
  }, [dispatch, id]);

  return (
    <div className={styles.overviewContainer}>
      {overviewPending && <Loading />}
      {overviewFulfilled && overview && (
        <>
          <div className={styles.overviewHeader}>
            <DashboardFilled className={styles.overviewIcon} />
            <h4
              className={styles.overviewHeading}
            >Overview</h4>
          </div>
          <div className={styles.overview}>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <RecordVoiceOver className={styles.overviewBoxIcon} />
                <Link 
                  className={styles.overviewBoxLink}
                  to={`/artist/${overview.artist._id}`}
                >
                  <span className={styles.overviewBoxText}>
                    {overview.artist.name}
                  </span>
                </Link>
              </div>
              <div className={styles.overviewInnerBox}>
                <MusicNote className={styles.overviewBoxIcon} />
                <span className={styles.overviewBoxText}>{`${overview.songCount} Songs`}</span>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <CalendarMonth className={styles.overviewBoxIcon} />
                <span className={styles.overviewBoxText}>{dayjs(overview.releaseDate).format("DD.MM.YYYY")}</span>
              </div>
              <div className={styles.overviewInnerBox}>
                <AddTask className={styles.overviewBoxIcon} />
                <Link 
                  className={styles.overviewBoxLink}
                  to={`/user/${overview.addedByUser.username}`}
                >
                  <span className={styles.overviewBoxText}>
                    {overview.addedByUser.username}
                  </span>
                </Link>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Star className={styles.overviewBoxIcon} />
                <span className={styles.overviewBoxText}>{`${overview.ratingCount} Ratings`}</span>
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
