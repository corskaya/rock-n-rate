import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { getAlbums, getAlbumsWithSongs, setShowAlbumsModal, setShowSongsModal } from "../../slice";
import Artist from "../../../../types/artist";
import AlbumsModal from "../AlbumsModal/AlbumsModal";
import SongsModal from "../SongsModal/SongsModal";
import styles from "./Visuals.module.css";

type Props = {
  artist: Artist;
};

const Visuals: React.FC<Props> = ({ artist }) => {
  const showAlbumsModal = useSelector((state: RootState) => state.artist.showAlbumsModal);
  const showSongsModal = useSelector((state: RootState) => state.artist.showSongsModal);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowAlbumsModal = (show: boolean) => {
    dispatch(getAlbums(artist.slug));
    dispatch(setShowAlbumsModal(show));
  };

  const handleShowSongsModal = (show: boolean) => {
    dispatch(getAlbumsWithSongs(artist.slug));
    dispatch(setShowSongsModal(show));
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
        onClick={() => handleShowSongsModal(true)}
      >
        View Songs
      </Button>
      <AlbumsModal 
        show={showAlbumsModal}
        onClose={() => handleShowAlbumsModal(false)}
      />
      <SongsModal 
        show={showSongsModal}
        onClose={() => handleShowSongsModal(false)}
      />
    </div>
  );
};

export default Visuals;
