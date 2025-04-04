import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArtist, getSimilarArtists } from "./slice";
import Visuals from "./components/Visuals/Visuals";
import Info from "./components/Info/Info";
import Suggestions from "./components/Suggestions/Suggestions";
import MobileMainInfo from "./components/MobileMainInfo/MobileMainInfo";
import MobileAbout from "./components/MobileAbout/MobileAbout";
import { Loading, Message } from "../../components";
import { AppDispatch, RootState } from "../../store";
import Comments from "./components/Comments/Comments";
import Overview from "./components/Overview/Overview";
import styles from "./styles.module.css";

const Artist: React.FC = () => {
  const { slug } = useParams();
  const {
    artistPending,
    artistRejected,
    artistFulfilled,
    artist,
    artistErrorMessage,
  } = useSelector((state: RootState) => state.artist);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getArtist(slug!));
    dispatch(getSimilarArtists(slug!));
  }, [dispatch, slug]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {artistPending && <Loading size="large" />}
        {artistFulfilled && artist && (
          <>
            <MobileMainInfo artist={artist} />
            <div className={styles.artistWebContainer}>
              <Visuals artist={artist} />
              <Info artist={artist} />
              <Suggestions />
            </div>
            <MobileAbout artist={artist} />
            <div className={styles.artistWebReviewContainer}>
              <Comments />
              <Overview />
            </div>
          </>
        )}
        {artistRejected && <Message>{artistErrorMessage}</Message>}
      </div>
    </div>
  );
};

export default Artist;
