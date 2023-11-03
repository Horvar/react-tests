import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import { Person } from '../../types';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [testError, setTestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialSearchTerm = localStorage.getItem('searchTerm') || '';
    handleSearch(initialSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testErrorFunction = () => {
    setTestError(true);
  };

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      const data = (await response.json()) as { results: Person[] };
      setSearchResults(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setIsLoading(false);
    }
  };

  if (testError) {
    throw new Error('Test error!');
  }

  return (
    <>
      <div className={styles.searchPage}>
        <div className={styles.searchPageRow}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className={styles.searchPageRow}>
          {isLoading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <Results data={searchResults} />
          )}
        </div>

        <button className={styles.errorButton} onClick={testErrorFunction}>
          Test Error
        </button>
      </div>
    </>
  );
};

export default SearchPage;
