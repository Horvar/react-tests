import React from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

type SearchBarState = {
  searchTerm: string;
};

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  handleSearch = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          className={styles.searchBarInput}
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
        />
        <button className={styles.searchBarButton} onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
