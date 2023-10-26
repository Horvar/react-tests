import React from 'react';
import styles from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';

type Person = {
  name: string;
  gender: string;
};

type SearchPageState = {
  searchResults: Person[];
  error: boolean;
};

class SearchPage extends React.Component<
  Record<string, never>,
  SearchPageState
> {
  state: SearchPageState = {
    searchResults: [],
    error: false,
  };

  handleSearch = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      const data = (await response.json()) as { results: Person[] };
      this.setState({ searchResults: data.results });
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className={styles.searchPage}>
        <div className={styles.searchPageRow}>
          <SearchBar onSearch={this.handleSearch} />
        </div>

        <div className={styles.searchPageRow}>
          <Results data={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
