import React, { useState } from 'react';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import ReactPaginate from 'react-paginate';

const NavPagination = (props) => {
  const onPageChange = props.onPageChange;
  const totalPages = props?.totalPages;
  return (
    (totalPages > 1) && (
      <nav className='pagination'>
        <ul>
          <ReactPaginate
            pageCount={totalPages} // Общее количество страниц
            pageRangeDisplayed={5} // Количество отображаемых страниц
            marginPagesDisplayed={2} // Количество страниц на краях
            previousLabel={<RxChevronLeft />}
            nextLabel={<RxChevronRight />}
            breakLabel={'...'}
            onPageChange={onPageChange}
            activeClassName={'active'}
            containerClassName={'pagination'}
            pageClassName={'page-item'} // Добавляем класс для стилизации цифр страниц
            pageLinkClassName={'page-link'}
          />
        </ul>
      </nav>

    )
  );
};

export default NavPagination;