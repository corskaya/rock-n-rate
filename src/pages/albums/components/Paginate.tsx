import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goToPage } from "../slice";
import { RootState } from "../../../store";
import styles from "../styles.module.css";

type PaginateButtonProps = {
  text: string | number;
  isActive?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
};

const MAX_VISIBLE_PAGES_WEB = 7;
const VISIBLE_PAGE_INTERVAL_WEB = 3;
const PREV_TEXT_WEB = "Previous";
const MAX_VISIBLE_PAGES_MOBILE = 3;
const VISIBLE_PAGE_INTERVAL_MOBILE = 1;
const PREV_TEXT_MOBILE = "Prev";

const PaginateButton: React.FC<PaginateButtonProps> = ({
  text,
  isActive = false,
  isClickable = true,
  onClick,
}) => {
  return (
    <button
      className={`${styles.paginateBtn} ${
        isActive ? styles.paginateBtnActive : ""
      } ${!isClickable ? styles.paginateBtnNotClickable : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

const Paginate: React.FC = () => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(MAX_VISIBLE_PAGES_WEB);
  const [visiblePageInterval, setVisiblePageInterval] = useState(VISIBLE_PAGE_INTERVAL_WEB);
  const [prevText, setPrevText] = useState(PREV_TEXT_WEB);
  const pageCount = useSelector((state: RootState) => state.albums.pageCount);
  const currentPage = useSelector((state: RootState) => state.albums.page);
  const dispatch = useDispatch();
  const startPage = Math.max(
    1,
    Math.min(currentPage - visiblePageInterval, pageCount - maxVisiblePages + 1)
  );
  const pagesArray = Array.from(
    { length: Math.min(pageCount, maxVisiblePages) },
    (_, index) => startPage + index
  );

  const handlePrevPage = () => {
    dispatch(goToPage(currentPage - 1));
  }

  const handleNextPage = () => {
    dispatch(goToPage(currentPage + 1));
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setMaxVisiblePages(MAX_VISIBLE_PAGES_MOBILE);
        setVisiblePageInterval(VISIBLE_PAGE_INTERVAL_MOBILE);
        setPrevText(PREV_TEXT_MOBILE);
      } else {
        setMaxVisiblePages(MAX_VISIBLE_PAGES_WEB);
        setVisiblePageInterval(VISIBLE_PAGE_INTERVAL_WEB);
        setPrevText(PREV_TEXT_WEB);
      }
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {pageCount > 1 && (
        <div className={styles.paginateContainer}>
          {currentPage > 1 && (
            <PaginateButton
              text={`« ${prevText}`}
              onClick={handlePrevPage}
            />
          )}
          {pageCount > maxVisiblePages && currentPage > (Math.ceil(maxVisiblePages / 2)) && (
            <PaginateButton text={"..."} isClickable={false} />
          )}
          {pagesArray.map((page) => (
            <PaginateButton
              key={page}
              text={page}
              isActive={page === currentPage}
              onClick={() => dispatch(goToPage(page))}
            />
          ))}
          {pageCount > maxVisiblePages && currentPage < pageCount - (Math.floor(maxVisiblePages / 2)) && (
            <PaginateButton text={"..."} isClickable={false} />
          )}
          {currentPage !== pageCount && (
            <PaginateButton
              text={"Next »"}
              onClick={handleNextPage}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Paginate;
