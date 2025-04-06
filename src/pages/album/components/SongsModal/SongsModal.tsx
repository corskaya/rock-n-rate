import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSongsModal } from "../../slice";
import { Loading, Modal, Message, Label } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { StarFilled } from "@ant-design/icons";
import styles from "./SongsModal.module.css";
import { useTranslation } from 'react-i18next';

type Props = {
  show: boolean;
  onClose: () => void;
};

const SongsModal: React.FC<Props> = ({ show, onClose }) => {
  const {
    songsPending,
    songsFulfilled,
    songs,
    songsRejected,
    songsErrorMessage,
  } = useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleLinkClick = () => {
    dispatch(setShowSongsModal(false));
  };

  return (
    <Modal
      show={show}
      title={t('Songs')}
      suffix={
        <h2 className={styles.songsSuffix}>
          {t("{{count}} songs", { count: songs.length })}
        </h2>
      }
      onClose={onClose}
      centerBody={
        songsPending || songsRejected || (songsFulfilled && songs?.length === 0)
      }
    >
      {songsPending && <Loading size="large" />}
      {songsFulfilled && (
        <div>
          {songs.map((song, i) => (
            <Link
              key={i}
              className={styles.songLink}
              to={`/song/${song.slug}`}
              onClick={handleLinkClick}
            >
              <div className={styles.songContainer}>
                <div className={styles.songNameContainer}>
                  <div className={styles.songIndex}>{i + 1}</div>
                  <Label className={styles.songName}>{song.name}</Label>
                </div>
                <div className={styles.songRatingContainer}>
                  <StarFilled className={styles.songRatingIcon} />
                  <div className={styles.songRating}>
                    {song.rating !== 0 ? song.rating : "?"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {songsFulfilled && songs?.length === 0 && !songsPending && (
        <Message>{t('No song found')}</Message>
      )}
      {songsRejected && <Message>{t(songsErrorMessage ?? 'An error occurred')}</Message>}
    </Modal>
  );
};

export default SongsModal;
