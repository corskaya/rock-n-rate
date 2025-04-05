import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Label, Loading, Message } from "../../../components";
import { getPopularAlbums } from "../slice";
import { setFilters } from "../../albums/slice";
import { AppDispatch, RootState } from "../../../store";
import styles from "../styles.module.css";
import { useTranslation } from 'react-i18next';

const PopularAlbums: React.FC = () => {
  const {
    popularAlbumsPending,
    popularAlbumsFulfilled,
    popularAlbumsRejected,
    popularAlbums,
    popularAlbumsErrorMessage,
  } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToPopularAlbums = () => {
    dispatch(setFilters({ orderBy: "Popularity" }));
    navigate("/albums");
  };

  useEffect(() => {
    dispatch(getPopularAlbums());
  }, [dispatch]);

  return (
    <div className={styles.popularAlbumsBackground}>
      <div className={styles.popularAlbumsContainer}>
        <div className={styles.popularAlbumsHeader}>
          <Label className={styles.popularAlbumsText}>{t("Popular Albums")}</Label>
          <span
            className={styles.popularAlbumsBrowseAll}
            onClick={navigateToPopularAlbums}
          >
            {t("Browse All")}
          </span>
        </div>
        <div className={styles.popularAlbumsContentContainer}>
          {popularAlbumsPending && <Loading />}
          {popularAlbumsRejected && (
            <Message>{t(popularAlbumsErrorMessage ?? "An error occurred")}</Message>
          )}
          {popularAlbumsFulfilled && (
            <div className={styles.popularAlbumsContent}>
              {popularAlbums.map((album) => (
                <div
                  key={album._id}
                  className={styles.popularAlbumsCardContainer}
                >
                  <Link to={`/album/${album.slug}`}>
                    <Card
                      className={styles.albumCard}
                      imageUrl={album.image}
                      rating={album.rating}
                      genres={album.genres}
                      shape="square"
                    />
                    <div className={styles.mobileAlbumCardContainer}>
                      <img
                        src={album.image}
                        alt={album.name}
                        className={styles.mobileAlbumCard}
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/album/${album.slug}`}
                    className={styles.popularAlbumsCardLabelLink}
                  >
                    <Label className={styles.popularAlbumsCardLabel}>
                      {album.name}
                    </Label>
                  </Link>
                  <Label className={styles.labelSmall}>
                    {dayjs(album.releaseDate).year()}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularAlbums;
