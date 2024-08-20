import { useDispatch, useSelector } from "react-redux";
import { FilterOutlined } from "@ant-design/icons";
import { Loading, Message } from "../../components";
import { AppDispatch, RootState } from "../../store";
import { setShowFilterModal } from "./slice";
import Filter from "./components/Filter";
import List from "./components/List";
import Paginate from "./components/Paginate";
import FilterModal from "./components/FilterModal";
import styles from "./styles.module.css";

const Songs: React.FC = () => {
  const { 
    songsPending, 
    songsRejected, 
    songsFulfilled, 
    songs, 
    errorMessage,
    showFilterModal,
    isFiltered,
  } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowFilterModal = (show: boolean) => {
    dispatch(setShowFilterModal(show));
  };

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <div className={styles.mobileFilterBtnContainer}/>
          <h3 className={styles.listHeading}>Rock'n Rate Songs</h3>
          <div className={styles.mobileFilterBtnContainer}>
            <button 
              className={`${styles.mobileFilterBtn} ${isFiltered ? styles.filtered : ""}`}
              onClick={() => handleShowFilterModal(true)}
            >
              <FilterOutlined className={styles.mobileFilterIcon} />
            </button>
          </div>
        </div>
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
      <FilterModal
        show={showFilterModal}
        onClose={() => handleShowFilterModal(false)}
      />
    </div>
  );
}

export default Songs;
