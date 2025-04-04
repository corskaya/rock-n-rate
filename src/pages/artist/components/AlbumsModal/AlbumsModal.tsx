import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setShowAlbumsModal } from "../../slice";
import { Loading, Modal, Message, Label } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import styles from "./AlbumsModal.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
};

const AlbumsModal: React.FC<Props> = ({ show, onClose }) => {
  const { albumsPending, albumsFulfilled, albums, albumsRejected, albumsErrorMessage } = useSelector((state: RootState) => state.artist);
  const dispatch = useDispatch<AppDispatch>();

  const handleLinkClick = () => {
    dispatch(setShowAlbumsModal(false));
  }

  return (
    <Modal
      show={show}
      title="Albums"
      suffix={
        <h2
          className={styles.modalAlbumSuffix}
        >{`${albums.length} albums`}</h2>
      }
      onClose={onClose}
      centerBody={
        albumsPending ||
        albumsRejected ||
        (albumsFulfilled && albums?.length === 0)
      }
    >
      {albumsPending && <Loading size="large" />}
      {albumsFulfilled && (
        <div>
          {albums?.map((album, i) => (
            <Link
              key={i}
              className={styles.modalAlbumLink}
              to={`/album/${album.slug}`}
              onClick={handleLinkClick}
            >
              <div className={styles.modalAlbumContainer}>
                <img
                  src={album.image}
                  alt={`${album.name} cover`}
                  className={styles.modalAlbumImage}
                />
                <div className={styles.modalAlbumInfoContainer}>
                  <Label className={styles.modalAlbumName}>
                    {album.name}
                  </Label>
                  <div className={styles.modalAlbumBottomInfoContainer}>
                    <div className={styles.modalAlbumYear}>{dayjs(album.releaseDate).format("YYYY")}</div>
                    <div className={styles.modalAlbumRatingContainer}>
                      <StarFilled className={styles.modalAlbumRatingIcon}/>
                      <div className={styles.modalAlbumRating}>
                        {album.rating !== 0 ? album.rating : "?"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {albumsFulfilled && albums?.length === 0 && !albumsPending && (
        <Message>No album found</Message>
      )}
      {albumsRejected && <Message>{albumsErrorMessage}</Message>}
    </Modal>
  );
}

export default AlbumsModal;
