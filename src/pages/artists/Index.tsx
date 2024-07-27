import { useSelector } from "react-redux";
import { Loading, Message } from "../../components";
import styles from "./styles.module.css";
import Filter from "./components/Filter";
import List from "./components/List";
import Paginate from "./components/Paginate";
import { RootState } from "../../store";

const Artists: React.FC = () => {
  const {
    artistsPending,
    artistsRejected,
    artistsFulfilled,
    artists,
    errorMessage,
  } = useSelector((state: RootState) => state.artists);

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.listContainer}>
        <h3 className={styles.listHeader}>Rock'n Rate Artists</h3>
        {artistsPending && (
          <div>
            <Loading />
          </div>
        )}
        {artistsFulfilled && <Paginate />}
        {artistsFulfilled && artists.length === 0 && !artistsPending && (
          <Message>No artist found</Message>
        )}
        {artistsFulfilled && <List artists={artists} />}
        {artistsFulfilled && <Paginate />}
        {artistsRejected && <Message>{errorMessage}</Message>}
      </div>
    </div>
  );
}

export default Artists;
