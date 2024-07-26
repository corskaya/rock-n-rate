import { useDispatch } from "react-redux";
import { Button } from "../../../components";
// import { setFilters } from "../../songs/slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import Album from "../../../types/album";
import styles from "../styles.module.css";

type Props = {
  album: Album;
};

const Visuals: React.FC<Props> = ({ album }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleViewArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  const handleViewSongs = () => {
    dispatch(setFilters({ searchTerm: album.name }));
    navigate(`/songs`);
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={album.image} alt={album._id} />
      </div>
      <Button
        className={styles.visualButton}
        onClick={() => handleViewArtist(album.artistRefObjectId)}
      >
        View Artist
      </Button>
      <Button
        className={styles.visualButton}
        color="info"
        onClick={handleViewSongs}
      >
        View Songs
      </Button>
    </div>
  );
}

export default Visuals;
