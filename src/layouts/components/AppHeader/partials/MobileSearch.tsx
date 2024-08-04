import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../../../store";
import { getTopics } from "../slice";
import { Loading, Message } from "../../../../components";
import styles from "../styles.module.css";

type Props = {
  showMobileSearch: boolean;
  setShowMobileSearch: Dispatch<SetStateAction<boolean>>;
};

const MobileSearch: React.FC<Props> = ({
  showMobileSearch,
  setShowMobileSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    topicsPending,
    topicsFulfilled,
    topicsRejected,
    topics,
    errorMessage,
  } = useSelector((state: RootState) => state.appHeader);
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length >= 3) {
        dispatch(getTopics(searchTerm));
      }
    }, 500),
    [searchTerm, dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLinkClick = () => {
    setShowMobileSearch(false);
    setSearchTerm("");
  };

  return (
    <>
      {showMobileSearch && (
        <div className={styles.mobileInputContainer}>
          <div className={styles.mobileInput}>
          <SearchOutlined className={styles.mobileInputIcon} />
          <input
            className={styles.navInput}
            placeholder="Quick search"
            value={searchTerm}
            onChange={handleChange}
          />
          {topicsPending && (
            <Loading className={styles.navInputLoading} size="small" />
          )}
          {searchTerm.length >= 3 && (
            <div
              className={styles.mobileSearchResults}
              onMouseDown={(e) => e.preventDefault()}
            >
              {!topicsPending && topicsRejected && (
                <Message>{errorMessage}</Message>
              )}
              {!topicsPending && topicsFulfilled && topics.length === 0 && (
                <div className={styles.searchResultNotFound}>
                  No results found.
                </div>
              )}
              {!topicsPending &&
                topicsFulfilled &&
                topics.map((topic) => (
                  <Link
                    key={topic._id}
                    className={styles.searchResultLink}
                    to={`/${topic.type}/${topic._id}`}
                    onClick={handleLinkClick}
                  >
                    <div className={styles.searchResultContainer}>
                      <img
                        className={styles.searchResultImage}
                        alt={`${topic.name} cover`}
                        src={topic.image}
                      />
                      <div className={styles.searchResultInfoContainer}>
                        <div className={styles.searchResultName}>
                          {topic.name}
                        </div>
                        <div className={styles.searchResultYear}>
                          {topic.year}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
        </div>
      )}
    </>
  );
};

export default MobileSearch;
