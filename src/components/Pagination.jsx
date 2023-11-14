import React, { useState } from 'react';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const Pagination = (props) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = [];

  const [current, setCurrentPage] = useState(currentPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const goToPreviousPage = () => {
    setCurrentPage(current - 1);
    console.log(current);
  };

  const goToNextPage = () => {
    setCurrentPage(current + 1);
    console.log(current);
  };
  return (
    <nav className="pagination">
      <ul>
        <li>
          <button disabled={current === 1} onClick={goToPreviousPage}><RxChevronLeft /></button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => onPageChange(number)}
              className={current === number ? 'active' : ''}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button disabled={current === totalPages} onClick={goToNextPage}><RxChevronRight /></button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;