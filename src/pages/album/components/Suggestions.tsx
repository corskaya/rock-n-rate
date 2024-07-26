import { useSelector } from "react-redux";
import { Loading, Message, Tooltip } from "../../../components";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";

const Suggestions: React.FC = () => {
  const {
    similarAlbumsPending,
    similarAlbumsFulfilled,
    similarAlbumsRejected,
    similarAlbums,
    similarAlbumsErrorMessage,
  } = useSelector((state: RootState) => state.album);

  return (
    <div className={styles.suggestionsContainer}>
      <h4 className={`${styles.suggestionsText} ${styles.textShadow}`}>
        Similar Albums
      </h4>
      {similarAlbumsPending && <Loading />}
      {similarAlbumsFulfilled && similarAlbums && (
        <div className={styles.suggestions}>
          {similarAlbums.map((album) => (
            <Link to={`/album/${album._id}`} key={album._id}>
              <Tooltip content={album.name}>
                <div className={styles.suggestionImageContainer}>
                  <img
                    src={album.image}
                    alt={album.name}
                    className={styles.suggestionImage}
                  />
                </div>
              </Tooltip>
            </Link>
          ))}
        </div>
      )}
      {similarAlbumsRejected && <Message>{similarAlbumsErrorMessage}</Message>}
    </div>
  );
}

export default Suggestions;
