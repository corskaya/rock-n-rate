import { useSelector } from "react-redux";
import { Loading, Message } from "../../components";
import styles from "./styles.module.css";
import Filter from "./components/Filter";
import List from "./components/List";
import Paginate from "./components/Paginate";
import { RootState } from "../../store";

const Songs: React.FC = () => {
  const { 
    songsPending, 
    songsRejected, 
    songsFulfilled, 
    songs, 
    errorMessage,
  } = useSelector((state: RootState) => state.songs);

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.listContainer}>
        <h3 className={styles.listHeader}>Rock'n Rate Songs</h3>
        {songsPending && (
          <div>
            <Loading />
          </div>
        )}
        {songsFulfilled && <Paginate />}
        {songsFulfilled && songs.length === 0 && !songsPending && (
          <Message>No song found</Message>
        )}
        {songsFulfilled && <List songs={songs} />}
        {songsFulfilled && <Paginate />}
        {songsRejected && <Message>{errorMessage}</Message>}
      </div>
    </div>
  );
}

export default Songs;
