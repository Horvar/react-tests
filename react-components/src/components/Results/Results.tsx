import React from 'react';
import styles from './Results.module.css';

type Person = {
  name: string;
  gender: string;
};

type ResultsProps = {
  data: Person[];
};

const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div className={styles.results}>
      {data.map((result: Person) => (
        <div key={result.name}>
          <h3>{result.name}</h3>
          <p>{result.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
