import React, { useState, useEffect } from 'react';
import styles from './DetailPage.module.css';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

const DetailPage: React.FC = () => {
  const [personDetails, setPersonDetails] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const data = (await response.json()) as Person;
        setPersonDetails(data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Failed to load details. Please try again later.
      </div>
    );
  }

  if (!personDetails) {
    return <div className={styles.error}>Person not found.</div>;
  }

  return (
    <div className={styles.detailPage}>
      <h1>{personDetails.name}</h1>
      <div>
        <p>Height: {personDetails.height}</p>
        <p>Mass: {personDetails.mass}</p>
      </div>
    </div>
  );
};

export default DetailPage;
