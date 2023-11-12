import React from 'react';
import styles from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate('/', { state: { fromNotFound: true } });
  };

  return (
    <>
      <div className={styles.notFound}>
        <div className={styles.notFoundWrapper}>
          <div className={styles.notFoundError}>404</div>
          <h1 className={styles.notFoundTitle}>Page Not Found</h1>
          <button onClick={handleReturnClick} className={styles.notFoundButton}>
            Return
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
