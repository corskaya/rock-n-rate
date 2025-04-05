import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import { Card, Label, Loading, Message } from "../../../components";
import { getPopularArtists } from "../slice";
import rssIcon from "../../../assets/rss-icon.png";
import { setFilters } from "../../artists/slice";
import { AppDispatch, RootState } from "../../../store";
import styles from "../styles.module.css";
import { useTranslation } from 'react-i18next';

const PopularArtists: React.FC = () => {
  const {
    popularArtistsPending,
    popularArtistsFulfilled,
    popularArtistsRejected,
    popularArtists,
    popularArtistsErrorMessage,
  } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToPopularArtists = () => {
    dispatch(setFilters({ orderBy: "Popularity" }));
    navigate("/artists");
  };

  useEffect(() => {
    dispatch(getPopularArtists());
  }, [dispatch]);

  return (
    <div className={styles.popularArtistsBackground}>
      <div className={styles.popularArtistsContainer}>
        <div className={styles.popularArtistsHeader}>
          <div className={styles.emptyDiv}></div>
          <div className={styles.popularArtistsTextContainer}>
            <StarFilled className={styles.popularArtistsTextIcon} />
            <Label className={styles.popularArtistsText}>{t("Popular Artists")}</Label>
          </div>
          <div className={styles.popularArtistsMoreContainer}>
            <img
              className={styles.popularArtistsMoreIcon}
              src={rssIcon}
              alt="rss-icon"
            />
            <div
              className={styles.popularArtistsMore}
              onClick={navigateToPopularArtists}
            >
              {t("more featured...")}
            </div>
          </div>
        </div>
        <div className={styles.popularArtistsContentContainer}>
          {popularArtistsPending && <Loading />}
          {popularArtistsRejected && (
            <Message>{t(popularArtistsErrorMessage ?? "An error occurred")}</Message>
          )}
          {popularArtistsFulfilled && (
            <div className={styles.popularArtistsContent}>
              {popularArtists.map((artist) => (
                <div
                  key={artist._id}
                  className={styles.popularArtistsCardContainer}
                >
                  <Link to={`/artist/${artist.slug}`}>
                    <Card
                      className={styles.artistCard}
                      imageUrl={artist.image}
                      rating={artist.rating}
                      genres={artist.genres}
                      size="large"
                    />
                    <div className={styles.mobileArtistCardContainer}>
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className={styles.mobileArtistCard}
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/artist/${artist.slug}`}
                    className={styles.popularArtistsCardLabelLink}
                  >
                    <Label className={styles.popularArtistsCardLabel}>
                      {artist.name}
                    </Label>
                  </Link>
                  <Label className={styles.labelSmall}>
                    {artist.foundationYear}
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

export default PopularArtists;
