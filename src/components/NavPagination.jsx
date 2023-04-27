import React from 'react';
import {Link} from 'react-router-dom';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const NavPagination = () => {
  return (
    <nav className='pagination'>
      <ul>
        <li>
          <Link to="/">
            <RxChevronLeft/>
          </Link>
        </li>
        <li>
          <Link to="/"c className='active'>1</Link>
        </li>
        <li>
          <Link to="/">2</Link>
        </li>
        <li>
          <Link to="/">3</Link>
        </li>
        <li>
          <Link to="/">4</Link>
        </li>
        <li>
          <Link to="/">
            <RxChevronRight/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavPagination;