import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { setShowRatingsModal } from "../../slice";
import { Loading, Modal, Message } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import defaultProfilePicture from "../../../../assets/default-profile-picture.png";
import Album from "../../../../types/album";
import styles from "./RatingsModal.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
  album: Album;
};

const RatingsModal: React.FC<Props> = ({ show, onClose, album }) => {
  const { ratingsPending, ratingsFulfilled, ratings, ratingsRejected, ratingsErrorMessage } = useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();

  const handleLinkClick = (isPrivate: boolean, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isPrivate) {
      return e.preventDefault();
    }
    dispatch(setShowRatingsModal(false));
  }

  return (
    <Modal
      show={show}
      title="Ratings"
      suffix={
        <h2
          className={styles.modalRatingSuffix}
        >{`${album.ratingCount} ratings`}</h2>
      }
      onClose={onClose}
      centerBody={
        ratingsPending ||
        ratingsRejected ||
        (ratingsFulfilled && ratings?.length === 0)
      }
    >
      {ratingsPending && <Loading size="large" />}
      {ratingsFulfilled && (
        <div>
          {ratings?.map((rating, i) => (
            <Link
              key={i}
              className={styles.modalRatingLink}
              to={rating.isPrivate ? "#" : `/user/${rating.username}`}
              onClick={(e) => handleLinkClick(rating.isPrivate, e)}
            >
              <div className={styles.modalRatingContainer}>
                <div className={styles.modalRatingInfo}>
                  <div className={styles.modalRatingAvatarContainer}>
                    <img
                      src={rating.avatar || defaultProfilePicture}
                      alt={`${rating.username} avatar`}
                      className={styles.modalRatingAvatar}
                    />
                  </div>
                  <div className={styles.modalRatingUsername}>
                    {rating.isPrivate ? "Private Rating" : rating.username}
                  </div>
                </div>
                <div className={styles.modalRatingRatingContainer}>
                  <div className={styles.modalRatingRating}>
                    {rating.rating}
                  </div>
                  <StarFilled className={styles.modalRatingStar} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {ratingsFulfilled && ratings?.length === 0 && !ratingsPending && (
        <Message>No rating found</Message>
      )}
      {ratingsRejected && <Message>{ratingsErrorMessage}</Message>}
    </Modal>
  );
}

export default RatingsModal;
