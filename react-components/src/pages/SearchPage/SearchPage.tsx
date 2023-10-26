import React from 'react';
import styles from './SearchPage.module.css';

const SearchPage: React.FC = () => {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchPageRow}>{/* Search */}</div>

      <div className={styles.searchPageRow}>{/* Result */}</div>
    </div>
  );
};

export default SearchPage;
