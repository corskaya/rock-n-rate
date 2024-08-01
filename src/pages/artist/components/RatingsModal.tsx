import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import { setShowRatingsModal } from "../slice";
import { Loading, Modal, Message } from "../../../components";
import { Link } from "react-router-dom";
import defaultProfilePicture from "../../../assets/default-profile-picture.png";
import styles from "../styles.module.css";
import React from "react";
import Artist from "../../../types/artist";
import { AppDispatch, RootState } from "../../../store";

type Props = {
  show: boolean;
  onClose: () => void;
  artist: Artist;
};

const RatingsModal: React.FC<Props> = ({ show, onClose, artist }) => {
  const { ratingsPending, ratingsFulfilled, ratings, ratingsRejected, ratingsErrorMessage } = useSelector((state: RootState) => state.artist);
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
      titleSuffix={`${artist.ratingCount} ratings`}
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
              to={rating.isPrivate ? '#' : `/user/${rating.username}`}
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
                    {rating.isPrivate ? 'Private User' : rating.username}
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
