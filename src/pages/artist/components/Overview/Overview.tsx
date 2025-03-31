import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardFilled } from "@ant-design/icons";
import { Public, CalendarMonth, Album, MusicNote, Star, AddTask } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import { Loading, Message } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { getOverview } from "../../slice";
import styles from "./Overview.module.css";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

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
            >Overview</h4>
          </div>
          <div className={styles.overview}>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Public className={styles.overviewBoxIcon} />
                <ReactCountryFlag className={styles.overviewCountryFlag} countryCode={overview.country} svg />
              </div>
              <div className={styles.overviewInnerBox}>
                <Album className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{`${overview.albumCount} Albums`}</div>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <CalendarMonth className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{overview.foundationYear}</div>
              </div>
              <div className={styles.overviewInnerBox}>
                <MusicNote className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{`${overview.songCount} Songs`}</div>
              </div>
            </div>
            <div className={styles.overviewOuterBox}>
              <div className={styles.overviewInnerBox}>
                <Star className={styles.overviewBoxIcon} />
                <div className={styles.overviewBoxText}>{`${overview.ratingCount} Ratings`}</div>
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
