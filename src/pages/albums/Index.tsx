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

const Albums: React.FC = () => {
  const {
    albumsPending,
    albumsRejected,
    albumsFulfilled,
    albums,
    errorMessage,
    showFilterModal,
    isFiltered,
  } = useSelector((state: RootState) => state.albums);
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
          <h3 className={styles.listHeading}>Rock'n Rate Albums</h3>
          <div className={styles.mobileFilterBtnContainer}>
            <button 
              className={`${styles.mobileFilterBtn} ${isFiltered ? styles.filtered : ""}`}
              onClick={() => handleShowFilterModal(true)}
            >
              <FilterOutlined className={styles.mobileFilterIcon} />
            </button>
          </div>
        </div>
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
      <FilterModal
        show={showFilterModal}
        onClose={() => handleShowFilterModal(false)}
      />
    </div>
  );
}

export default Albums;
