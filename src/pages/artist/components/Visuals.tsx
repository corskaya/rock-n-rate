import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components";
import { setFilters as setSongFilters } from "../../songs/slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { getAlbums, setShowAlbumsModal } from "../slice";
import Artist from "../../../types/artist";
import styles from "../styles.module.css";
import AlbumsModal from "./AlbumsModal";

type Props = {
  artist: Artist;
};

const Visuals: React.FC<Props> = ({ artist }) => {
  const showAlbumsModal = useSelector((state: RootState) => state.artist.showAlbumsModal);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleShowAlbumsModal = (show: boolean) => {
    dispatch(getAlbums(artist.slug));
    dispatch(setShowAlbumsModal(show));
  };

  const handleViewSongs = () => {
    dispatch(setSongFilters({ searchTerm: artist.name }));
    navigate("/songs");
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={artist.image} alt={artist._id} />
      </div>
      <Button 
        className={styles.visualButton} 
        onClick={() => handleShowAlbumsModal(true)}
      >
        View Albums
      </Button>
      <Button
        className={styles.visualButton}
        color="info"
        onClick={handleViewSongs}
      >
        View Songs
      </Button>
      <AlbumsModal 
        show={showAlbumsModal}
        onClose={() => handleShowAlbumsModal(false)}
      />
    </div>
  );
};

export default Visuals;
