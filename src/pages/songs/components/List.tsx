import { Link } from "react-router-dom";
import { SongCard } from "../../../components";
import Song from "../../../types/song";
import styles from "../styles.module.css";

type Props = {
  songs: Song[];
};

const List: React.FC<Props> = ({ songs }) => {
  return (
    <div className={styles.cardsContainer}>
      {songs.map((song) => (
        <div key={song._id} className={styles.cardContainer}>
          <Link to={`/song/${song._id}`} className={styles.songCardLink}>
            <SongCard song={song} className={styles.card} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default List;
