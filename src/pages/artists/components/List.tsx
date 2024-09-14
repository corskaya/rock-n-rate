import { Link } from "react-router-dom";
import { Card, Label } from "../../../components";
import Artist from "../../../types/artist";
import styles from "../styles.module.css";

type Props = {
  artists: Artist[];
};

const List: React.FC<Props> = ({ artists }) => {
  return (
    <div className={styles.cardsContainer}>
      {artists.map((artist) => (
        <div key={artist._id} className={styles.cardContainer}>
          <Link to={`/artist/${artist.slug}`}>
            <Card
              className={styles.card}
              imageUrl={artist.image}
              rating={artist.rating}
              genres={artist.genres}
            />
            <div className={styles.mobileCardContainer}>
              <img
                src={artist.image}
                alt={artist.name}
                className={styles.mobileCard}
              />
            </div>
          </Link>
          <Link to={`/artist/${artist.slug}`} className={styles.cardLabelLink}>
            <Label className={styles.cardLabel}>{artist.name}</Label>
          </Link>
          <Label className={styles.labelSmall}>{artist.foundationYear}</Label>
        </div>
      ))}
    </div>
  );
}

export default List;
