import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './DetailPage.module.css';

import { Person } from '../../types';

interface OutletContextType {
  selectedPerson: Person;
  closeDetails: () => void;
}

const DetailPage = () => {
  const { selectedPerson, closeDetails } =
    useOutletContext<OutletContextType>();

  return (
    <div className={styles.details}>
      {selectedPerson ? (
        <>
          <div className={styles.detailsOverlay} onClick={closeDetails}></div>
          <div className={styles.detailsModal}>
            <button className={styles.detailsClose} onClick={closeDetails}>
              Close
            </button>
            <h2 className={styles.detailsTitle}>{selectedPerson.name}</h2>
            <div className={styles.detailsData}>
              <span>Gender: </span>
              <span>
                <b>{selectedPerson.gender}</b>
              </span>
            </div>
            <div className={styles.detailsData}>
              <span>Height: </span>
              <span>
                <b>{selectedPerson.height}</b>
              </span>
            </div>
            <div className={styles.detailsData}>
              <span>Mass: </span>
              <span>
                <b>{selectedPerson.mass}</b>
              </span>
            </div>
            <div className={styles.detailsData}>
              <span>Hair color: </span>
              <span>
                <b>{selectedPerson.hair_color}</b>
              </span>
            </div>
            <div className={styles.detailsData}>
              <span>Eye color: </span>
              <span>
                <b>{selectedPerson.eye_color}</b>
              </span>
            </div>
            <div className={styles.detailsData}>
              <span>Skin color: </span>
              <span>
                <b>{selectedPerson.skin_color}</b>
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loader}>Loading...</div>
      )}
    </div>
  );
};

export default DetailPage;
