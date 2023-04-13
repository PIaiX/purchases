import React from 'react';
import {Link} from 'react-router-dom';

const NavBreadcrumbs = () => {
  return (
    <nav className='breadcrumbs'>
      <ul>
        <li>
          <Link to='/'>Главная</Link>
        </li>
        <li>
          <Link to='/blog'>Новости</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBreadcrumbs;