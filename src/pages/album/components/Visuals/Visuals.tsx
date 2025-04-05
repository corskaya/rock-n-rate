import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { getSongs, setShowSongsModal } from "../../slice";
import { AppDispatch, RootState } from "../../../../store";
import Album from "../../../../types/album";
import styles from "./Visuals.module.css";
import SongsModal from "../SongsModal/SongsModal";
import { useTranslation } from 'react-i18next';

type Props = {
  album: Album;
};

const Visuals: React.FC<Props> = ({ album }) => {
  const showSongsModal = useSelector((state: RootState) => state.album.showSongsModal);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewArtist = (artistSlug: string) => {
    navigate(`/artist/${artistSlug}`);
  };

  const handleShowSongsModal = (show: boolean) => {
    dispatch(getSongs(album.slug));
    dispatch(setShowSongsModal(show));
  };

  return (
    <div className={styles.visualsContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={album.image} alt={album._id} />
      </div>
      <Button
        className={styles.visualButton}
        onClick={() => handleViewArtist(album.artistRefSlug)}
      >
        {t('View Artist')}
      </Button>
      <Button
        className={styles.visualButton}
        color="info"
        onClick={() => handleShowSongsModal(true)}
      >
        {t('View Songs')}
      </Button>
      <SongsModal 
        show={showSongsModal}
        onClose={() => handleShowSongsModal(false)}
      />
    </div>
  );
}

export default Visuals;
