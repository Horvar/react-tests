import React from 'react';
import styles from './Results.module.css';

import { Person } from '../../types';

type ResultsProps = {
  data: Person[];
};

const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div className={styles.results}>
      {data.map((result: Person) => (
        <div className={styles.resultsItem} key={result.name}>
          <h3 className={styles.resultsName}>{result.name}</h3>
          <p className={styles.resultsText}>
            <span>
              <b>Gender: </b>
            </span>
            <span>{result.gender}</span>
          </p>
          <p className={styles.resultsText}>
            <span>
              <b>Height: </b>
            </span>
            <span>{result.height}</span>
          </p>
          <p className={styles.resultsText}>
            <span>
              <b>Mass: </b>
            </span>
            <span>{result.mass}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
