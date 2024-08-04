import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../store";
import { getTopics, setSearchTerm } from "./slice";
import { Loading, Message } from "../../components";
import styles from "./styles.module.css";
import { Topic } from "../../types/common";

const Search: React.FC = () => {
  const {
    searchTerm,
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
        dispatch(getTopics({ searchTerm }));
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
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLinkClick = () => {
    dispatch(setSearchTerm(""));
  };

  const formatType = (type: Topic) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <SearchOutlined className={styles.inputIcon} />
          <input
            className={styles.input}
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          {topicsPending && (
            <Loading className={styles.inputLoading} size="small" />
          )}
        </div>
      </div>
      {searchTerm.length >= 3 && (
        <div className={styles.searchResults}>
          {!topicsPending && topicsRejected && (
            <Message className={styles.searchResultErrorMessage}>{errorMessage}</Message>
          )}
          {!topicsPending && topicsFulfilled && topics.length === 0 && (
            <div className={styles.searchResultNotFound}>No results found.</div>
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
                    <div className={styles.searchResultTopicContainer}>
                      <div className={styles.searchResultName}>
                        {topic.name}
                      </div>
                      <div className={styles.searchResultType}>
                        {formatType(topic.type)}
                      </div>
                    </div>
                    <div className={styles.searchResultYear}>{topic.year}</div>
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
