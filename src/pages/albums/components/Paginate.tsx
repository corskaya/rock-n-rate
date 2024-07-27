import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles.module.css";
import { goToPage } from "../slice";
import { RootState } from "../../../store";

type PaginateButtonProps = {
  text: string | number;
  isActive?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
};

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

function Paginate() {
  const pageCount = useSelector((state: RootState) => state.albums.pageCount);
  const currentPage = useSelector((state: RootState) => state.albums.page);
  const dispatch = useDispatch();
  const maxVisiblePages = 7;
  const startPage = Math.max(
    1,
    Math.min(currentPage - 3, pageCount - maxVisiblePages + 1)
  );
  const pagesArray = Array.from(
    { length: Math.min(pageCount, maxVisiblePages) },
    (_, index) => startPage + index
  );

  useEffect(() => {
    return () => {
      dispatch(goToPage(1));
    };
  }, [dispatch]);

  return (
    <>
      {pageCount > 1 && (
        <div className={styles.paginateContainer}>
          {currentPage > 1 && (
            <PaginateButton
              text={"« Previous"}
              onClick={() => dispatch(goToPage(currentPage - 1))}
            />
          )}
          {pageCount > maxVisiblePages && currentPage > 4 && (
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
          {pageCount > maxVisiblePages && currentPage < pageCount - 3 && (
            <PaginateButton text={"..."} isClickable={false} />
          )}
          {currentPage !== pageCount && (
            <PaginateButton
              text={"Next »"}
              onClick={() => dispatch(goToPage(currentPage + 1))}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Paginate;
