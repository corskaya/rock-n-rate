import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAlbum, getSimilarAlbums } from "./slice.ts";
import Visuals from "./components/Visuals.tsx";
import Info from "./components/Info.tsx";
import Suggestions from "./components/Suggestions.tsx";
import MobileMainInfo from "./components/MobileMainInfo.tsx";
import MobileAbout from "./components/MobileAbout.tsx";
import { Loading, Message } from "../../components";
import { AppDispatch, RootState } from "../../store.ts";
import styles from "./styles.module.css";

function Album() {
  const { id } = useParams();
  const { albumPending, albumRejected, albumFulfilled, album, albumErrorMessage } =
    useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAlbum(id!));
    dispatch(getSimilarAlbums(id!));
  }, [dispatch, id]);

  return (
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
        </>
      )}
      {albumRejected && <Message>{albumErrorMessage}</Message>}
    </div>
  );
}

export default Album;
