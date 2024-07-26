// import { useDispatch } from "react-redux";
import { Button } from "../../../components";
// import { setFilters as setAlbumFilters } from "../../albums/slice";
// import { setFilters as setSongFilters } from "../../songs/slice";
import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../../../store";
import Artist from "../../../types/artist";
import styles from "../styles.module.css";

type Props = {
  artist: Artist;
};

const Visuals: React.FC<Props> = ({ artist }) => {
  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleViewAlbums = () => {
    // dispatch(setAlbumFilters({ searchTerm: artist.name }));
    navigate("/albums");
  };

  const handleViewSongs = () => {
    // dispatch(setSongFilters({ searchTerm: artist.name }));
    navigate("/songs");
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={artist.image} alt={artist._id} />
      </div>
      <Button className={styles.visualButton} onClick={handleViewAlbums}>
        View Albums
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
};

export default Visuals;
