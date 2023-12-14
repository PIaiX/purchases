import React from 'react';
import { Link } from 'react-router-dom';

const NavBreadcrumbs = (props) => {
  return (
    <nav className='breadcrumbs'>
      <ul>
        <li>
          <Link to='/'>Главная</Link>
        </li>
        {props.title == "Новости" &&
          < li >
            <Link to='/blog'>Новости</Link>
          </li>
        }
        {props.title == "Каталог" &&
          < li >
            <Link to='/'>Каталог</Link>
          </li>
        }
      </ul>
    </nav >
  );
};

export default NavBreadcrumbs;