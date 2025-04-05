import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Label, Loading, Message, SongCard } from "../../../components";
import { getPopularSongs } from "../slice";
import { setFilters } from "../../songs/slice";
import { AppDispatch, RootState } from "../../../store";
import styles from "../styles.module.css";
import { useTranslation } from 'react-i18next';

const PopularSongs: React.FC = () => {
  const {
    popularSongsPending,
    popularSongsFulfilled,
    popularSongsRejected,
    popularSongs,
    popularSongsErrorMessage,
  } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToPopularSongs = () => {
    dispatch(setFilters({ orderBy: "Popularity" }));
    navigate("/songs");
  };

  useEffect(() => {
    dispatch(getPopularSongs());
  }, [dispatch]);

  return (
    <div className={styles.popularSongsBackground}>
      <div className={styles.popularSongsContainer}>
        <div className={styles.popularSongsHeader}>
          <Label className={styles.popularSongsText}>{t("Popular Songs")}</Label>
          <span
            className={styles.popularSongsBrowseAll}
            onClick={navigateToPopularSongs}
          >
            {t("Browse All")}
          </span>
        </div>
        <div className={styles.popularSongsContentContainer}>
          {popularSongsPending && <Loading />}
          {popularSongsRejected && (
            <Message>{t(popularSongsErrorMessage ?? "An error occurred")}</Message>
          )}
          {popularSongsFulfilled && (
            <div className={styles.popularSongsContent}>
              {popularSongs.map((song) => (
                <div
                  key={song._id}
                  className={styles.popularSongsCardContainer}
                >
                  <Link
                    to={`/song/${song.slug}`}
                    className={styles.popularSongsCardLink}
                  >
                    <SongCard song={song} className={styles.songCard} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularSongs;
