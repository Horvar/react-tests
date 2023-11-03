import React, { useState } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchTerm: string, page: number) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm, 1);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.searchBarButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
