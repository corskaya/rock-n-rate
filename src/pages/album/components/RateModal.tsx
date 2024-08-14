import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { rateAlbum, removeRating, setShowRateModal } from "../slice";
import { setToastStatus } from "../../login/slice";
import { Loading } from "../../../components";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import Album from "../../../types/album";
import styles from "../styles.module.css";

const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  show: boolean;
  onClose: () => void;
  album: Album;
};

const RateModal: React.FC<Props> = ({ show, onClose, album }) => {
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);
  const rateAlbumPending = useSelector((state: RootState) => state.album.rateAlbumPending);
  const removeRatingPending = useSelector((state: RootState) => state.album.removeRatingPending);
  const [hoveredPoint, setHoveredPoint] = useState<number>(album.ratingOfRelevantUser || 0);
  const [selectedPoint, setSelectedPoint] = useState<number>(album.ratingOfRelevantUser || 0);
  const [starSize, setStarSize] = useState<number>(60);
  const [starTextSize, setStarTextSize] = useState<number>(22);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handlePointHover = (point: number) => {
    setHoveredPoint(point);
  };

  const handlePointLeave = () => {
    if (selectedPoint > 0) {
      setHoveredPoint(selectedPoint);
    } else {
      setHoveredPoint(0);
    }
  };

  const handleSelectPoint = (point: number) => {
    setSelectedPoint(point);
  };

  const handleRateAlbum = () => {
    if (selectedPoint <= 0 || selectedPoint === album.ratingOfRelevantUser) {
      return;
    }
    if (!token || !user) {
      dispatch(
        setToastStatus({
          show: true,
          title: "Please login",
          message: "To rate an album, please log in first.",
          type: "info",
        })
      );
      dispatch(setShowRateModal(false));
      navigate("/login");
      return;
    }
    dispatch(rateAlbum({ id: album._id, rating: selectedPoint }));
  };

  const handleRemoveRating = () => {
    dispatch(removeRating(album._id));
  };

  useEffect(() => {
    if (!show) {
      setSelectedPoint(album.ratingOfRelevantUser || 0);
      setHoveredPoint(album.ratingOfRelevantUser || 0);
    }
  }, [show, album.ratingOfRelevantUser]);

  useEffect(() => {
    setStarSize(90 + selectedPoint * 4);
    setStarTextSize(22 + selectedPoint * 1);
  }, [selectedPoint]);

  return (
    show && (
      <div className={styles.rateModalContainer}>
        <div onClick={onClose} className={styles.rateModalOverlay}></div>
        <div
          className={styles.rateModalContent}
          style={{
            minHeight: `${album.ratingOfRelevantUser ? "270px" : "220px"}`,
          }}
        >
          <div className={styles.rateModalBodyContainer}>
            <div className={styles.rateModalBody}>
              <div className={styles.rateModalRatingIconContainer}>
                <StarFilled
                  className={styles.rateModalRatingIcon}
                  style={{ fontSize: starSize }}
                />
              </div>
              <h3 className={styles.rateModalRateThisText}>RATE THIS</h3>
              <h3 className={styles.rateModalAlbumName}>{album.name}</h3>
              <div className={styles.rateModalStarsContainer}>
                {points.map((point) =>
                  point > hoveredPoint ? (
                    <StarOutlined
                      key={point}
                      className={`${styles.rateModalStar} ${styles.rateModalStarPassive}`}
                      onMouseEnter={() => handlePointHover(point)}
                      onMouseLeave={handlePointLeave}
                      onClick={() => handleSelectPoint(point)}
                    />
                  ) : (
                    <StarFilled
                      key={point}
                      className={`${styles.rateModalStar} ${styles.rateModalStarActive}`}
                      onMouseEnter={() => handlePointHover(point)}
                      onMouseLeave={handlePointLeave}
                      onClick={() => handleSelectPoint(point)}
                    />
                  )
                )}
              </div>

              <h3
                className={styles.rateModalRatingText}
                style={{ fontSize: starTextSize }}
              >
                {selectedPoint || "?"}
              </h3>
              <button
                className={`${styles.rateModalBtn} ${
                  selectedPoint > 0 &&
                  selectedPoint !== album.ratingOfRelevantUser
                    ? styles.rateModalBtnActive
                    : styles.rateModalBtnPassive
                }`}
                onClick={handleRateAlbum}
              >
                {rateAlbumPending ? <Loading size="small" /> : "Rate"}
              </button>

              <button
                className={`${styles.rateModalRemoveBtn} ${
                  selectedPoint !== album.ratingOfRelevantUser
                    ? styles.rateModalRemoveBtnActive
                    : styles.rateModalRemoveBtnPassive
                }`}
                style={{
                  visibility: `${
                    album.ratingOfRelevantUser ? "visible" : "hidden"
                  }`,
                }}
                onClick={handleRemoveRating}
              >
                {removeRatingPending ? <Loading size="small" /> : "Remove rating"}
              </button>
            </div>
          </div>
          <div className={styles.rateModalCloseBtnContainer}>
            <div className={styles.rateModalCloseBtn} onClick={onClose}>
              <CloseOutlined />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RateModal;
