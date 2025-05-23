import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../store";
import { getTopics, setSearchTerm } from "./slice";
import { Loading, Message } from "../../components";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length >= 3) {
        dispatch(getTopics({ searchTerm }));
      }
    }, 600),
    [searchTerm, dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const inputElement = document.querySelector(".search-input-mobile") as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLinkClick = () => {
    dispatch(setSearchTerm(""));
  }

  const handleClear = () => {
    dispatch(setSearchTerm(""));
    const inputElement = document.querySelector(".search-input-mobile") as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <SearchOutlined className={styles.inputIcon} />
          <input
            className={`${styles.input} search-input-mobile`}
            placeholder={t('Search')}
            value={searchTerm}
            onChange={handleChange}
          />
          {topicsPending && (
            <Loading className={styles.inputLoading} size="small" />
          )}
          {!topicsPending && searchTerm.length > 0 && (
            <CloseOutlined
              className={styles.clearIcon}
              onClick={handleClear}
            />
          )}
        </div>
      </div>
      {searchTerm.length >= 3 && (
        <div className={styles.searchResults}>
          {!topicsPending && topicsRejected && (
            <Message className={styles.searchResultErrorMessage}>{t(errorMessage ?? 'An error occurred')}</Message>
          )}
          {!topicsPending && topicsFulfilled && topics.length === 0 && (
            <div className={styles.searchResultNotFound}>{t('No results found.')}</div>
          )}
          {!topicsPending &&
            topicsFulfilled &&
            topics.map((topic, i) => (
              <Link
                key={i}
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
                    <div className={styles.searchResultTopicContainer}>
                      <div className={styles.searchResultName}>
                        {topic.name}
                      </div>
                      <div className={styles.searchResultType}>
                        {t(topic.type)}
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
