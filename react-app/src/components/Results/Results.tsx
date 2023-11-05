import React from 'react';
import styles from './Results.module.css';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';

type ResultsProps = {
  data: Person[];
  onItemSelected: (person: Person) => void;
};

const Results: React.FC<ResultsProps> = ({ data, onItemSelected }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handleItemClick = (person: Person) => {
    onItemSelected(person);
    navigate(`/search/details/${person.name}?page=${currentPage}`);
  };

  return (
    <div className={styles.results}>
      {data.map((result: Person) => (
        <div
          className={styles.resultsItem}
          key={result.url}
          onClick={() => handleItemClick(result)}
        >
          <h3 className={styles.resultsName}>{result.name}</h3>
          <p className={styles.resultsText}>
            <b>Gender: </b>
            {result.gender}
          </p>
          <p className={styles.resultsText}>
            <b>Height: </b>
            {result.height}
          </p>
          <p className={styles.resultsText}>
            <b>Mass: </b>
            {result.mass}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
