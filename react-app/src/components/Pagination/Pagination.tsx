import React from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  total: number;
  currentPage: number;
  onPaginate: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  onPaginate,
}) => {
  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number}
          className={number + 1 === currentPage ? styles.active : ''}
          onClick={() => onPaginate(number + 1)}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
