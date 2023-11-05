import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.css';
import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import Pagination from '../../components/Pagination';
import { Person } from '../../types';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [testError, setTestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
    handleSearch(searchTerm, page);
  }, [searchParams]);

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
    handleSearch(searchTerm, page);
  };

  const testErrorFunction = () => {
    setTestError(true);
  };

  const handleSearch = async (term: string, page: number = 1) => {
    setIsLoading(true);
    setSearchTerm(term);
    navigate(`/?page=${page}`);

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${term}&page=${page}`
      );
      const data = (await response.json()) as {
        results: Person[];
        count: number;
      };
      setSearchResults(data.results);
      setTotalResults(data.count);
      setIsLoading(false);
    } catch (error) {
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
        <div className={styles.searchPageRowSearch}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className={styles.searchPageRowSearch}>
            <div className={styles.error}>
              An error has occurred. Please try again later.
            </div>
          </div>
        )}

        <div className={styles.searchPageRowResult}>
          {isLoading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <>
              <Results data={searchResults} />
            </>
          )}
        </div>

        <div className={styles.searchPageRowControls}>
          <Pagination
            total={totalResults}
            currentPage={currentPage}
            onPaginate={handlePaginate}
          />
          <button className={styles.errorButton} onClick={testErrorFunction}>
            Test Error
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
