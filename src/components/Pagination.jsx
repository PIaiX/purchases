import React, { useState } from 'react';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const Pagination = (props) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = [];

  const [current, setCurrentPage] = useState(currentPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        <li>
          <button disabled={current === 1} onClick={() => { setCurrentPage(current - 1); onPageChange(current - 1); }} ><RxChevronLeft /></button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => { setCurrentPage(number); onPageChange(number); }}
              className={current === number ? 'active' : ''}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button disabled={current === totalPages} onClick={() => { setCurrentPage(current + 1); onPageChange(current + 1); }}><RxChevronRight /></button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;