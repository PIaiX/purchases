import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import LanguageSwitcher from './utils/LanguageSwitcher';
import {Link} from 'react-router-dom';
import fav from '../assets/imgs/fav.svg';

const Header = () => {
  const [showAdvice, setShowAdvice] = useState(false);

  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);
  
  return (
    <>
    <header>
      <Container className='h-100'>
        <div className="h-100 d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <Link to='/login' className='btn-1 d-none d-lg-flex'>Войти</Link>
            <button type='button' onClick={handleShowAdvice} className='d-flex align-items-center ms-lg-4 ms-xl-5'>
              <img src={fav} alt="Избранное"/>
              <span>Избранное</span>
            </button>
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
    </>
  );
};

export default Header;