import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSong, getSimilarSongs } from "./slice";
import Visuals from "./components/Visuals";
import Info from "./components/Info";
import Suggestions from "./components/Suggestions";
import MobileMainInfo from "./components/MobileMainInfo";
import MobileAbout from "./components/MobileAbout";
import { Loading, Message } from "../../components";
import { AppDispatch, RootState } from "../../store";
import Comments from "./components/Comments";
import Overview from "./components/Overview";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

const Song: React.FC = () => {
  const { slug } = useParams();
  const { songPending, songRejected, songFulfilled, song, songErrorMessage } =
    useSelector((state: RootState) => state.song);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getSong(slug!));
    dispatch(getSimilarSongs(slug!));
  }, [dispatch, slug]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {songPending && <Loading size="large" />}
        {songFulfilled && song && (
          <>
            <MobileMainInfo song={song} />
            <div className={styles.songWebContainer}>
              <Visuals song={song} />
              <Info song={song} />
              <Suggestions />
            </div>
            <MobileAbout song={song} />
            <div className={styles.songWebReviewContainer}>
              <Comments />
              <Overview />
            </div>
          </>
        )}
        {songRejected && <Message>{t(songErrorMessage ?? "An error occurred")}</Message>}
      </div>
    </div>
  );
};

export default Song;
