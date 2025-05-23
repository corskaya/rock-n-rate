import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, goToPage, setFilters, setIsFiltered, setShowFilterModal } from "../slice";
import { Button, Form, Input, Label, Modal, Select } from "../../../components";
import { AppDispatch, RootState } from "../../../store";
import { SongFilter } from "../types";
import Genre from "../../../types/genre";
import genres from "../../../constants/genres";
import styles from "../styles.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<Props> = ({ show, onClose }) => {
  const { filters, page, isFiltered } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { t } = useTranslation();
  const defaultFilters: SongFilter = {
    searchTerm: "",
    genre: Genre.All,
    rating: 0,
    year: "All",
    orderBy: "Latest",
  };

  const checkIfFiltered = () => {
    return JSON.stringify(defaultFilters) !== JSON.stringify(filters);
  }

  const onSearch = () => {
    dispatch(goToPage(1));
    dispatch(getSongs(filters));
    dispatch(setIsFiltered(checkIfFiltered()));
    dispatch(setShowFilterModal(false));
  };

  const onClearFilters = () => {
    dispatch(setIsFiltered(false));
    dispatch(goToPage(1));
    dispatch(setFilters(defaultFilters));
    dispatch(getSongs(defaultFilters));
    dispatch(setShowFilterModal(false));
  };

  useEffect(() => {
    dispatch(getSongs({ ...filters, page }));
    dispatch(setIsFiltered(checkIfFiltered()));
    // eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <Modal
      show={show}
      title={t("Filter")}
      suffix={isFiltered && (
        <span 
          className={styles.filterModalSuffix} 
          onClick={onClearFilters}
        >
          {t("Clear")}
        </span>
      )}
      onClose={onClose}
      footer={
        <Button 
          className={styles.mobileSearchBtn}
          onClick={() => formRef.current?.requestSubmit()}
        >
          {t("Search")}
        </Button>
      }
    >
      <Form formRef={formRef} onFinish={onSearch}>
        <div className={styles.filterModalContainer}>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>{t("Genre")}:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.genre}
              options={genres.map((genre) => ({
                label: t(genre),
                value: genre,
              }))}
              onChange={(e) => {
                dispatch(
                  setFilters({
                    genre: e.target.value as Genre,
                  })
                );
              }}
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>{t("Rating")}:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.rating}
              options={[
                { label: t("All"), value: 0 },
                { label: t("9+"), value: 9 },
                { label: t("8+"), value: 8 },
                { label: t("7+"), value: 7 },
                { label: t("6+"), value: 6 },
                { label: t("5+"), value: 5 },
                { label: t("4+"), value: 4 },
                { label: t("3+"), value: 3 },
                { label: t("2+"), value: 2 },
                { label: t("1+"), value: 1 },
              ]}
              onChange={(e) =>
                dispatch(setFilters({ rating: +e.target.value }))
              }
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>{t("Year")}:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.year}
              options={[
                { label: t("All"), value: "All" },
                { label: t("2020-2024"), value: "2020-2024" },
                { label: t("2010-2019"), value: "2010-2019" },
                { label: t("2000-2009"), value: "2000-2009" },
                { label: t("1990-1999"), value: "1990-1999" },
                { label: t("1980-1989"), value: "1980-1989" },
                { label: t("1970-1979"), value: "1970-1979" },
                { label: t("1960-1969"), value: "1960-1969" },
                { label: t("1950-1959"), value: "1950-1959" },
                { label: t("1900-1949"), value: "1900-1949" },
              ]}
              onChange={(e) => dispatch(setFilters({ year: e.target.value }))}
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>{t("Order By")}:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.orderBy}
              options={[
                { label: t('Latest'), value: "Latest" },
                { label: t('Oldest'), value: "Oldest" },
                { label: t('Rating'), value: "Rating" },
                { label: t('Year'), value: "Year" },
                { label: t('Popularity'), value: "Popularity" },
              ]}
              onChange={(e) =>
                dispatch(setFilters({ orderBy: e.target.value }))
              }
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>{t("Search Term")}:</Label>
            <Input
              className={styles.filterModalInput}
              isControlled={true}
              value={filters.searchTerm}
              onChange={(e) =>
                dispatch(setFilters({ searchTerm: e.target.value }))
              }
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default FilterModal;
