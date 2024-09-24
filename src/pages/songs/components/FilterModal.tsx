import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, goToPage, setFilters, setIsFiltered, setShowFilterModal } from "../slice";
import { Button, Form, Input, Label, Modal, Select } from "../../../components";
import { AppDispatch, RootState } from "../../../store";
import { SongFilter } from "../types";
import Genre from "../../../types/genre";
import genres from "../../../constants/genres";
import styles from "../styles.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<Props> = ({ show, onClose }) => {
  const { filters, page, isFiltered } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch<AppDispatch>();
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
      title="Filter"
      suffix={isFiltered && (
        <span 
          className={styles.filterModalSuffix} 
          onClick={onClearFilters}
        >
          Clear
        </span>
      )}
      onClose={onClose}
    >
      <Form onFinish={onSearch}>
        <div className={styles.filterModalContainer}>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>Genre:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.genre}
              options={genres.map((genre) => ({
                label: genre,
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
            <Label className={styles.labelSmall}>Rating:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.rating}
              options={[
                { label: "All", value: 0 },
                { label: "9+", value: 9 },
                { label: "8+", value: 8 },
                { label: "7+", value: 7 },
                { label: "6+", value: 6 },
                { label: "5+", value: 5 },
                { label: "4+", value: 4 },
                { label: "3+", value: 3 },
                { label: "2+", value: 2 },
                { label: "1+", value: 1 },
              ]}
              onChange={(e) =>
                dispatch(setFilters({ rating: +e.target.value }))
              }
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>Year:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.year}
              options={[
                { label: "All", value: "All" },
                { label: "2020-2024", value: "2020-2024" },
                { label: "2010-2019", value: "2010-2019" },
                { label: "2000-2009", value: "2000-2009" },
                { label: "1990-1999", value: "1990-1999" },
                { label: "1980-1989", value: "1980-1989" },
                { label: "1970-1979", value: "1970-1979" },
                { label: "1960-1969", value: "1960-1969" },
                { label: "1950-1959", value: "1950-1959" },
                { label: "1900-1949", value: "1900-1949" },
              ]}
              onChange={(e) => dispatch(setFilters({ year: e.target.value }))}
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}>Order By:</Label>
            <Select
              className={styles.filterModalSelect}
              value={filters.orderBy}
              options={[
                { label: "Latest", value: "Latest" },
                { label: "Oldest", value: "Oldest" },
                { label: "Rating", value: "Rating" },
                { label: "Year", value: "Year" },
                { label: "Popularity", value: "Popularity" },
              ]}
              onChange={(e) =>
                dispatch(setFilters({ orderBy: e.target.value }))
              }
            />
          </div>
          <div className={styles.filterModalRow}>
            <Label className={styles.labelSmall}> Search Term: </Label>
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
        <div className={styles.mobileSearchBtnContainer}>
          <Button className={styles.mobileSearchBtn}>Search</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FilterModal;
