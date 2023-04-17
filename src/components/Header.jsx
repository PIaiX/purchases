import React from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import fav from '../assets/imgs/fav.svg';
import LanguageSwitcher from './utils/LanguageSwitcher';

const Header = () => {
  return (
    <header>
      <Container className='h-100'>
        <div className="h-100 d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <button type='button' className='btn-1 d-none d-lg-flex'>Войти</button>
            <Link to='/favs' className='d-flex align-items-center ms-lg-4 ms-xl-5'>
              <img src={fav} alt="Избранное"/>
              <span>Избранное</span>
            </Link>
            <Link to='/registration' className='d-none d-lg-flex ms-4 ms-xl-5'>Регистрация</Link>
            <input type="search" className='d-none d-lg-flex ms-4 ms-xl-5' placeholder='Поиск по описанию'/>
          </div>
          <div className='d-none d-lg-flex align-items-center'>
            <Link to='/help' className='me-4 me-xl-5'>Помощь</Link>
            <LanguageSwitcher/>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;