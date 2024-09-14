import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Label } from "../../../components";
import Album from "../../../types/album";
import styles from "../styles.module.css";

type Props = {
  albums: Album[];
};

const List: React.FC<Props> = ({ albums }) => {
  return (
    <div className={styles.cardsContainer}>
      {albums.map((album) => (
        <div key={album._id} className={styles.cardContainer}>
          <Link to={`/album/${album.slug}`}>
            <Card
              className={styles.card}
              imageUrl={album.image}
              rating={album.rating}
              genres={album.genres}
              shape="square"
            />
            <div className={styles.mobileCardContainer}>
              <img
                src={album.image}
                alt={album.name}
                className={styles.mobileCard}
              />
            </div>
          </Link>
          <Link to={`/album/${album.slug}`} className={styles.cardLabelLink}>
            <Label className={styles.cardLabel}>{album.name}</Label>
          </Link>
          <Label className={styles.labelSmall}>
            {dayjs(album.releaseDate).year()}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default List;
