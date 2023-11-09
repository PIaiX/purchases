import React from 'react';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <nav className="pagination">
      <ul>
        <li>
          <button disabled={currentPage === 1} onClick={goToPreviousPage}><RxChevronLeft /></button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => onPageChange(number)}
              className={currentPage === number ? 'active' : 'disabled'}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button disabled={currentPage === totalPages} onClick={goToNextPage}><RxChevronRight /></button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;