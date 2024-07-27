import { useSelector } from "react-redux";
import { Loading, Message, SongCard } from "../../../components";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";

const Suggestions: React.FC = () => {
  const {
    similarSongsPending,
    similarSongsFulfilled,
    similarSongsRejected,
    similarSongs,
    similarSongsErrorMessage,
  } = useSelector((state: RootState) => state.song);

  return (
    <div className={styles.suggestionsContainer}>
      <h4 className={`${styles.suggestionsText} ${styles.textShadow}`}>
        Similar Songs
      </h4>
      {similarSongsPending && <Loading />}
      {similarSongsFulfilled && similarSongs && (
        <div className={styles.suggestions}>
          {similarSongs.map((song) => (
            <Link 
              to={`/song/${song._id}`} 
              key={song._id}
              className={styles.songCardLink}
            >
              <SongCard song={song} className={styles.songCard} />
            </Link>
          ))}
        </div>
      )}
      {similarSongsRejected && <Message>{similarSongsErrorMessage}</Message>}
    </div>
  );
}

export default Suggestions;
