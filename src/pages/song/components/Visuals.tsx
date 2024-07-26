import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import Song from "../../../types/song";
import styles from "../styles.module.css";

type Props = {
  song: Song;
};

const Visuals: React.FC<Props> = ({ song }) => {
  const navigate = useNavigate();

  const handleViewArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  const handleViewAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={song.image} alt={song._id} />
      </div>
      <Button
        className={styles.visualButton}
        onClick={() => handleViewArtist(song.artistRefObjectId)}
      >
        View Artist
      </Button>
      <Button
        className={styles.visualButton}
        color="info"
        onClick={() => handleViewAlbum(song.albumRefObjectId)}
      >
        View Album
      </Button>
    </div>
  );
}

export default Visuals;
