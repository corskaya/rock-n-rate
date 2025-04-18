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
import { useTranslation } from "react-i18next";

const Artists: React.FC = () => {
  const {
    artistsPending,
    artistsRejected,
    artistsFulfilled,
    artists,
    errorMessage,
    showFilterModal,
    isFiltered,
  } = useSelector((state: RootState) => state.artists);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleShowFilterModal = (show: boolean) => {
    dispatch(setShowFilterModal(show));
  };

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <div className={styles.mobileFilterBtnContainer}/>
          <h3 className={styles.listHeading}>{t("Rock'n Rate Artists")}</h3>
          <div className={styles.mobileFilterBtnContainer}>
            <button 
              className={`${styles.mobileFilterBtn} ${isFiltered ? styles.filtered : ""}`}
              onClick={() => handleShowFilterModal(true)}
            >
              <FilterOutlined className={styles.mobileFilterIcon} />
            </button>
          </div>
        </div>
        {artistsPending && (
          <div>
            <Loading />
          </div>
        )}
        {artistsFulfilled && <Paginate />}
        {artistsFulfilled && artists.length === 0 && !artistsPending && (
          <Message>{t("No artist found")}</Message>
        )}
        {artistsFulfilled && <List artists={artists} />}
        {artistsFulfilled && <Paginate />}
        {artistsRejected && <Message>{t(errorMessage ?? 'An error occurred')}</Message>}
      </div>
      <FilterModal
        show={showFilterModal}
        onClose={() => handleShowFilterModal(false)}
      />
    </div>
  );
}

export default Artists;
