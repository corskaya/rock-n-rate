import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { rateSong, removeRating, setShowRateModal } from "../slice";
import { setToastStatus } from "../../login/slice";
import { Loading } from "../../../components";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import Song from "../../../types/song";
import styles from "../styles.module.css";
import { useTranslation } from "react-i18next";

const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  show: boolean;
  onClose: () => void;
  song: Song;
};

const RateModal: React.FC<Props> = ({ show, onClose, song }) => {
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);
  const rateSongPending = useSelector((state: RootState) => state.song.rateSongPending);
  const removeRatingPending = useSelector((state: RootState) => state.song.removeRatingPending);
  const [hoveredPoint, setHoveredPoint] = useState<number>(song.ratingOfRelevantUser || 0);
  const [selectedPoint, setSelectedPoint] = useState<number>(song.ratingOfRelevantUser || 0);
  const [starSize, setStarSize] = useState<number>(60);
  const [starTextSize, setStarTextSize] = useState<number>(22);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleRateSong = () => {
    if (selectedPoint <= 0 || selectedPoint === song.ratingOfRelevantUser) {
      return;
    }
    if (!token || !user) {
      dispatch(
        setToastStatus({
          show: true,
          title: t("Please login"),
          message: t("To rate a song, please log in first."),
          type: "info",
        })
      );
      dispatch(setShowRateModal(false));
      navigate("/login");
      return;
    }
    dispatch(rateSong({ slug: song.slug, rating: selectedPoint }));
  };

  const handleRemoveRating = () => {
    dispatch(removeRating(song.slug));
  };

  useEffect(() => {
    if (!show) {
      setSelectedPoint(song.ratingOfRelevantUser || 0);
      setHoveredPoint(song.ratingOfRelevantUser || 0);
    }
  }, [show, song.ratingOfRelevantUser]);

  useEffect(() => {
    setStarSize(90 + selectedPoint * 4);
    setStarTextSize(22 + selectedPoint * 1);
  }, [selectedPoint]);

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    }
  }, [show]);

  return (
    show && (
      <div className={styles.rateModalContainer}>
        <div onClick={onClose} className={styles.rateModalOverlay}></div>
        <div
          className={styles.rateModalContent}
          style={{
            minHeight: `${song.ratingOfRelevantUser ? "270px" : "220px"}`,
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
              <h3 className={styles.rateModalRateThisText}>{t("RATE THIS")}</h3>
              <h3 className={styles.rateModalSongName}>{song.name}</h3>
              <div className={styles.rateModalStarsContainer}>
                {points.map((point) =>
                  point > hoveredPoint ? (
                    <StarOutlined
                      key={point}
                      className={`${styles.rateModalStar} ${styles.rateModalStarPassive}`}
                      onMouseEnter={() => handlePointHover(point)}
                      onMouseLeave={handlePointLeave}
                      onClick={() => handleSelectPoint(point)}
                      onTouchStart={() => handleSelectPoint(point)}
                    />
                  ) : (
                    <StarFilled
                      key={point}
                      className={`${styles.rateModalStar} ${styles.rateModalStarActive}`}
                      onMouseEnter={() => handlePointHover(point)}
                      onMouseLeave={handlePointLeave}
                      onClick={() => handleSelectPoint(point)}
                      onTouchStart={() => handleSelectPoint(point)}
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
                  selectedPoint !== song.ratingOfRelevantUser
                    ? styles.rateModalBtnActive
                    : styles.rateModalBtnPassive
                }`}
                onClick={handleRateSong}
              >
                {rateSongPending ? <Loading size="small" /> : t("Rate")}
              </button>

              <button
                className={`${styles.rateModalRemoveBtn} ${
                  selectedPoint !== song.ratingOfRelevantUser
                    ? styles.rateModalRemoveBtnActive
                    : styles.rateModalRemoveBtnPassive
                }`}
                style={{
                  visibility: `${
                    song.ratingOfRelevantUser ? "visible" : "hidden"
                  }`,
                }}
                onClick={handleRemoveRating}
              >
                {removeRatingPending ? <Loading size="small" /> : t("Remove rating")}
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
