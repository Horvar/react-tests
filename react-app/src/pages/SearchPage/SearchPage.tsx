import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
  useParams,
  Outlet,
  useLocation,
} from 'react-router-dom';
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

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && searchTerm === '') {
      handleSearch('', 1);
    }
  }, []);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { details } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const openDetails = (person: Person) => {
    const personId = person.url.split('/').slice(-2, -1)[0];
    setSelectedPerson(person);
    navigate(`/details/${personId}`);
  };

  const closeDetails = () => {
    navigate(-1);
  };

  useEffect(() => {
    const query = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (query !== null) {
      setSearchTerm(query);
    }
    setCurrentPage(page);

    if (query !== null && query !== searchTerm) {
      handleSearch(query, page);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!details) {
      setSelectedPerson(null);
    }
  }, [details]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage]);

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ search: searchTerm, page: page.toString() });
    handleSearch(searchTerm, page);
  };

  const testErrorFunction = () => {
    setTestError(true);
  };

  const handleSearch = async (term: string, page: number = 1) => {
    setIsLoading(true);
    setSearchParams({ search: term, page: page.toString() });

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
              <Results data={searchResults} onItemSelected={openDetails} />
            </>
          )}
        </div>

        <div className={styles.searchDetails}>
          <Outlet context={{ selectedPerson, closeDetails }} />
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
