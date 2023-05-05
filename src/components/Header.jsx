import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LanguageSwitcher from './utils/LanguageSwitcher';
import {Link} from 'react-router-dom';
import fav from '../assets/imgs/fav.svg';
import Exit from './svg/Exit';
import SecFavorites from './SecFavorites';


const Header = () => {
  const [showAdvice, setShowAdvice] = useState(false);
  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);

  const [showFav, setShowFav] = useState(false);
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);
  
  return (
    <>
    <Container>
      <header>
        <div className="h-100 d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <Link to='/login' className='btn-1 d-none d-lg-flex'>Войти</Link>
            <button type='button' onClick={handleShowFav} className='d-flex align-items-center ms-lg-4 ms-xxl-5'>
              <img src={fav} alt="Избранное"/>
              <span className='d-none d-xl-inline'>Избранное</span>
            </button>
            <Link to='/registration' className='d-none d-lg-flex ms-4 ms-xxl-5'>Регистрация</Link>
            <input type="search" className='d-none d-lg-flex ms-4 ms-xxl-5' placeholder='Поиск по описанию'/>
          </div>
          <div className='d-none d-lg-flex align-items-center'>
            <Link to='/help' className='me-4 me-xxl-5'>Помощь</Link>
            <LanguageSwitcher/>
            <button className='profile-link ms-4 ms-xxl-5' onClick={handleShowAdvice}>
              <img src="imgs/user.jpg" alt="user" />
              <span>Weatherwax</span>
            </button>
            <button type='button' className='blue fs-15 ms-4'>
              <Exit/>
            </button>
          </div>
        </div>
      </header>
    </Container>
    

    <Modal show={showAdvice} onHide={handleCloseAdvice} size={'lg'} centered>
      <Modal.Header closeButton>
        <img src="imgs/icons/warning.png" alt="warning" className='warning'/>
      </Modal.Header>
      <Modal.Body>
        <h2 className='mb-0'>Пожалуйста, войдите или зарегистрируйтесь</h2>
        <p>Добавлять игры в избранное могут только авторизованные пользователи.</p>
        <Link to='login' className='btn-3 mt-4'>Войти</Link>
      </Modal.Body>
    </Modal>

    <Offcanvas show={showFav} onHide={handleCloseFav} placement='top' className="fav-modal">
      <Container className='px-0'>
        <Offcanvas.Body>
          <SecFavorites/>
        </Offcanvas.Body>
      </Container>
    </Offcanvas>
    </>
  );
};

export default Header;