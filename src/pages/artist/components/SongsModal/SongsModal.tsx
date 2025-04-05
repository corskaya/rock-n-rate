import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSongsModal } from "../../slice";
import { Loading, Modal, Message, Label } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import styles from "./SongsModal.module.css";
import { StarFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  onClose: () => void;
};

const SongsModal: React.FC<Props> = ({ show, onClose }) => {
  const {
    albumsWithSongsPending,
    albumsWithSongsFulfilled,
    albumsWithSongs,
    albumsWithSongsRejected,
    albumsWithSongsErrorMessage,
  } = useSelector((state: RootState) => state.artist);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleLinkClick = () => {
    dispatch(setShowSongsModal(false));
  };

  return (
    <Modal
      show={show}
      title={t("Songs")}
      suffix={
        <h2 className={styles.songsSuffix}>{`${albumsWithSongs.reduce(
          (acc, album) => acc + album.songs.length,
          0
        )} ${t("songs")}`}</h2>
      }
      onClose={onClose}
      centerBody={
        albumsWithSongsPending ||
        albumsWithSongsRejected ||
        (albumsWithSongsFulfilled && albumsWithSongs?.length === 0)
      }
    >
      {albumsWithSongsPending && <Loading size="large" />}
      {albumsWithSongsFulfilled && (
        <div>
          {albumsWithSongs?.map((album, i) => (
            <div className={styles.albumWithSongsContainer} key={i}>
              <div className={styles.albumContainer}>
                <img
                  src={album.image}
                  alt={`${album.name} cover`}
                  className={styles.albumImage}
                />
                <div className={styles.albumInfoContainer}>
                  <Label className={styles.albumName}>
                    {album.name}
                  </Label>
                  <div className={styles.albumBottomInfoContainer}>
                    <div className={styles.albumYear}>
                      {dayjs(album.releaseDate).format("YYYY")}
                    </div>
                  </div>
                </div>
              </div>
              {album.songs.map((song, i) => (
                <Link
                  key={i}
                  className={styles.songLink}
                  to={`/song/${song.slug}`}
                  onClick={handleLinkClick}
                >
                  <div className={styles.songContainer}>
                    <div className={styles.songNameContainer}>
                      <div className={styles.songIndex}>{i + 1}</div>
                      <Label className={styles.songName}>
                        {song.name}
                      </Label>
                    </div>
                    <div className={styles.songRatingContainer}>
                      <StarFilled className={styles.songRatingIcon}/>
                      <div className={styles.songRating}>
                        {song.rating !== 0 ? song.rating : "?"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      {albumsWithSongsFulfilled &&
        albumsWithSongs?.length === 0 &&
        !albumsWithSongsPending && <Message>{t("No song found")}</Message>}
      {albumsWithSongsRejected && (
        <Message>{albumsWithSongsErrorMessage}</Message>
      )}
    </Modal>
  );
};

export default SongsModal;
