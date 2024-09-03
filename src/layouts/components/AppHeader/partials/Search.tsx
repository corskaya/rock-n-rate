import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../../../store";
import { Loading, Message } from "../../../../components";
import { getTopics } from "../../../../pages/search/slice";
import styles from "../styles.module.css";

const RESULT_LIMIT = 5;

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const {
    topicsPending,
    topicsFulfilled,
    topicsRejected,
    topics,
    errorMessage,
  } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length >= 3) {
        dispatch(getTopics({ searchTerm, limit: RESULT_LIMIT }));
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleLinkClick = () => {
    setIsFocused(false);
    setSearchTerm("");
    const inputElement = document.querySelector(".search-input-web") as HTMLInputElement;
    if (inputElement) {
      inputElement.blur();
    }
  };

  return (
    <div className={styles.navInputContainer}>
      <SearchOutlined className={styles.navInputIcon} />
      <input
        className={`${styles.navInput} search-input-web`}
        placeholder="Quick search"
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {topicsPending && <Loading className={styles.navInputLoading} size="small" />}
      {isFocused && searchTerm.length >= 3 && (
        <div
          className={styles.searchResults}
          onMouseDown={(e) => e.preventDefault()}
        >
          {!topicsPending && topicsRejected && (
            <Message className={styles.searchResultErrorMessage}>{errorMessage}</Message>
          )}
          {!topicsPending && topicsFulfilled && topics.length === 0 && (
            <div className={styles.searchResultNotFound}>No results found.</div>
          )}
          {!topicsPending && topicsFulfilled && topics.map((topic) => (
            <Link
              key={topic.slug}
              className={styles.searchResultLink}
              to={`/${topic.type.toLowerCase()}/${topic.slug}`}
              onClick={handleLinkClick}
            >
              <div className={styles.searchResultContainer}>
                <img
                  className={styles.searchResultImage}
                  alt={`${topic.name} cover`}
                  src={topic.image}
                />
                <div className={styles.searchResultInfoContainer}>
                  <div className={styles.searchResultName}>{topic.name}</div>
                  <div className={styles.searchResultBottomInfoContainer}>
                    <div className={styles.searchResultYear}>{topic.year}</div>
                    <div className={styles.searchResultTopic}>{topic.type}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
