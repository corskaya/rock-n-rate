import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAlbum, getSimilarAlbums } from "./slice";
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

const Album: React.FC = () => {
  const { slug } = useParams();
  const {
    albumPending,
    albumRejected,
    albumFulfilled,
    album,
    albumErrorMessage,
  } = useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAlbum(slug!));
    dispatch(getSimilarAlbums(slug!));
  }, [dispatch, slug]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {albumPending && <Loading size="large" />}
        {albumFulfilled && album && (
          <>
            <MobileMainInfo album={album} />
            <div className={styles.albumWebContainer}>
              <Visuals album={album} />
              <Info album={album} />
              <Suggestions />
            </div>
            <MobileAbout album={album} />
            <div className={styles.albumWebReviewContainer}>
              <Comments />
              <Overview />
            </div>
          </>
        )}
        {albumRejected && <Message>{albumErrorMessage}</Message>}
      </div>
    </div>
  );
};

export default Album;
