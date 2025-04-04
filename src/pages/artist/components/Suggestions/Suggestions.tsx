import { useSelector } from "react-redux";
import { Loading, Message, Tooltip } from "../../../../components";
import styles from "./Suggestions.module.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store";

const Suggestions: React.FC = () => {
  const {
    similarArtistsPending,
    similarArtistsFulfilled,
    similarArtistsRejected,
    similarArtists,
    similarArtistsErrorMessage,
  } = useSelector((state: RootState) => state.artist);

  return (
    <div className={styles.suggestionsContainer}>
      <h4 className={`${styles.suggestionsText} ${styles.textShadow}`}>
        Similar Artists
      </h4>
      {similarArtistsPending && <Loading />}
      {similarArtistsFulfilled && similarArtists && (
        <div className={styles.suggestions}>
          {similarArtists.map((artist) => (
            <Link 
              to={`/artist/${artist.slug}`} 
              key={artist._id}
            >
              <Tooltip content={artist.name}>
                <div className={styles.suggestionImageContainer}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className={styles.suggestionImage}
                  />
                </div>
              </Tooltip>
            </Link>
          ))}
        </div>
      )}
      {similarArtistsRejected && <Message>{similarArtistsErrorMessage}</Message>}
    </div>
  );
}

export default Suggestions;
