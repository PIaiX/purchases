import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, NavLink} from 'react-router-dom';
import Plaix from './svg/Plaix';
import SearchIcon from './svg/SearchIcon';
import SupportIcon from './svg/SupportIcon';
import MenuIcon from './svg/MenuIcon';
import ChatIcon from './svg/ChatIcon';
import useIsMobile from '../hooks/isMobile';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {mobile} = useIsMobile('991px');

  return (
    <footer>
      <Container className='h-100'>
        {
          (mobile)
          ? <nav className='nav-mobile'>
            <Link to='/' className='logo'>logo</Link>
            <ul>
              <li><NavLink to='/search'><SearchIcon/></NavLink></li>
              <li><NavLink to='/support'><SupportIcon/></NavLink></li>
              <li><NavLink to='/chat'><ChatIcon/></NavLink></li>
              <li><NavLink to='/menu'><MenuIcon/></NavLink></li>
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
  );
};

export default Footer;