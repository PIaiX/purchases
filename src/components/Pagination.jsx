import React, { useState } from 'react';

function Pagination({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {paginatedData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      <div>
        <button
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Previous
        </button>

        <span>{currentPage}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;