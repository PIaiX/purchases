import React from 'react';
import { Link } from 'react-router-dom';

const NavBreadcrumbs = ({ title }) => {
  return (
    <nav className='breadcrumbs'>
      <ul>
        <li>
          <Link to='/'>Главная</Link>
        </li>
        {title ? "Новости" &&
          < li >
            <Link to='/blog'>Новости</Link>
          </li>
          :
          < li >
            <Link to='/'>{title}</Link>
          </li>
        }
      </ul>
    </nav >
  );
};

export default NavBreadcrumbs;