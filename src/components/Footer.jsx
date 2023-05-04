import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link, NavLink} from 'react-router-dom';
import Plaix from './svg/Plaix';
import PLaixIcon from './svg/PLaixIcon';
import SupportIcon from './svg/SupportIcon';
import MenuIcon from './svg/MenuIcon';
import ChatIcon from './svg/ChatIcon';
import HeartIcon from './svg/HeartIcon';
import useIsMobile from '../hooks/isMobile';
import { RxCross1 } from "react-icons/rx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobileLG = useIsMobile('1109px');

  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  return (
    <>
      <footer>
        <Container className='h-100'>
          {
            (isMobileLG)
            ? <nav className='nav-mobile'>
              <Link to='/' className='logo'>logo</Link>
              <ul>
                <li><NavLink to='/fav'><HeartIcon/></NavLink></li>
                <li><NavLink to='/account' end><SupportIcon/></NavLink></li>
                <li><NavLink to='/account/messages' end><ChatIcon/></NavLink></li>
                <li><button type='button' onClick={handleShowMenu}><MenuIcon/></button></li>
              </ul>
            </nav>
            : <Row className='h-100 align-items-center'>
              <Col md={7}>
                <ul className='list-unstyled d-flex align-items-center justify-content-between'>
                  <li><span>©{currentYear} Game</span></li>
                  <li><Link to='/privacy'>Политика конфиденциальности</Link></li>
                  <li><Link to='/cookie'>Политика cookie</Link></li>
                </ul>
              </Col>
              <Col md={5}>
                <a href="/" className='dev-link ms-auto'>
                  <span>Создано в</span>
                  <Plaix/>
                </a>
              </Col>
            </Row>
          }
        </Container>
      </footer>
      <Offcanvas show={showMenu} onHide={handleCloseMenu} placement='end'>
        <Offcanvas.Body>
          <button type='button' className='close' onClick={handleCloseMenu}>
            <RxCross1/>
          </button>
          <div className='text-center title-font fs-20 mb-4'>LOGO-RUSH2PLAY</div>
          <ul onClick={handleCloseMenu}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/blog">Новости</Link>
            </li>
            <li>
              <Link to="/help">Помощь</Link>
            </li>
            <li>
              <Link to="/privacy">Политика конфиденциальности</Link>
            </li>
            <li>
              <Link to="/cookie">Политика cookie</Link>
            </li>
            <li>
              <Link to="/rules">Правила</Link>
            </li>
          </ul>
          <div className='sec-promo mb-5'>
            <div className='text'>
              <h1 className='mb-0'>Играй в свое <br className='d-sm-none'/>удовольствие</h1>
            </div>
            <img src="imgs/head.png" alt="head" />
          </div>
          <a href="/" className='dev-link mx-auto'>
            <PLaixIcon/>
            <span className='mx-2'>Создано в</span>
            <Plaix/>
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Footer;