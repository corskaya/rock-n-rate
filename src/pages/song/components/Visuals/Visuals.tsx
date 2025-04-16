import { Button } from "../../../../components";
import { useNavigate } from "react-router-dom";
import Song from "../../../../types/song";
import styles from "./Visuals.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  song: Song;
};

const Visuals: React.FC<Props> = ({ song }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewArtist = (artistSlug: string) => {
    navigate(`/artist/${artistSlug}`);
  };

  const handleViewAlbum = (albumSlug: string) => {
    navigate(`/album/${albumSlug}`);
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={song.image} alt={song._id} />
      </div>
      <Button
        className={styles.visualButton}
        onClick={() => handleViewArtist(song.artistRefSlug)}
      >
        {t("View Artist")}
      </Button>
      <Button
        className={styles.visualButton}
        color="info"
        onClick={() => handleViewAlbum(song.albumRefSlug)}
      >
        {t("View Album")}
      </Button>
    </div>
  );
}

export default Visuals;
