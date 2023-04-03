import React from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import SearchIcon from './svg/SearchIcon';
import fav from '../assets/imgs/fav.svg';
import LanguageSwitcher from './utils/LanguageSwitcher';

const Header = () => {
  return (
    <header>
      <Container className='h-100'>
        <div className="h-100 d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <button type='button' className='btn-1'>Войти</button>
            <Link to='/favs' className='ms-5'>
              <img src={fav} alt="Избранное"/>
              <span>Избранное</span>
            </Link>
            <Link to='/registration' className='ms-5'>Регистрация</Link>
            <form action="" className='form-search ms-5'>
              <input type="text" placeholder='Поиск по играм'/>
              <button type='submit'>
                <SearchIcon />
              </button>
            </form>
          </div>
          <div className='d-flex align-items-center'>
            <Link to='/help' className='me-5'>Помощь</Link>
            <LanguageSwitcher/>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;