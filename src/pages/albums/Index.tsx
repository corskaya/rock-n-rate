import { useSelector } from "react-redux";
import { Loading, Message } from "../../components";
import Filter from "./components/Filter";
import List from "./components/List";
import Paginate from "./components/Paginate";
import styles from "./styles.module.css";
import { RootState } from "../../store";

function Albums() {
  const {
    albumsPending,
    albumsRejected,
    albumsFulfilled,
    albums,
    errorMessage,
  } = useSelector((state: RootState) => state.albums);

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.listContainer}>
        <h3 className={styles.listHeader}>Rock'n Rate Albums</h3>
        {albumsPending && (
          <div>
            <Loading />
          </div>
        )}
        {albumsFulfilled && <Paginate />}
        {albumsFulfilled && albums.length === 0 && !albumsPending && (
          <Message>No album found</Message>
        )}
        {albumsFulfilled && <List albums={albums} />}
        {albumsFulfilled && <Paginate />}
        {albumsRejected && <Message>{errorMessage}</Message>}
      </div>
    </div>
  );
}

export default Albums;
