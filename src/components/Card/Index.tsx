import Genre from "../../types/genre";
import Button from "../Button/Index";
import styles from "./styles.module.css";
import { StarFilled } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  imageUrl: string;
  rating: number;
  genres: Genre[];
  shape?: "rectangle" | "square";
  size?: "medium" | "large";
};

const Card: React.FC<Props> = ({
  className,
  imageUrl,
  rating,
  genres = [],
  shape = "rectangle",
  size = "medium",
}) => {
  const { t } = useTranslation();
  const labelLimit = shape === "rectangle" ? 12 : 14;
  const shortenLabel = (label = "") => {
    return label.length > labelLimit
      ? `${label.substring(0, labelLimit - 1)}...`
      : label;
  };

  return (
    <div
      className={`${styles.cardContainer} ${
        shape === "square" && styles.square
      } ${size === "large" && styles.large} ${className}`}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imageUrl} alt="card" />
        <div className={styles.overlay}>
          <div className={styles.ratingContainer}>
            <StarFilled className={styles.ratingIcon} />
            <div className={styles.rating}>{`${
              rating !== 0 ? rating : "?"
            } / 10`}</div>
          </div>
          <div className={styles.genreContainer}>
            <div className={styles.genre}>{shortenLabel(genres[0])}</div>
            {shape === "rectangle" && (
              <div className={styles.genre}>{shortenLabel(genres[1])}</div>
            )}
          </div>
          <Button className={styles.detailsBtn}>{t('View Details')}</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
