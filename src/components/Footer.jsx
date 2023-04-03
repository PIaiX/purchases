import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import Plaix from './svg/Plaix';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container className='h-100'>
        <Row className='h-100 align-items-center'>
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
      </Container>
    </footer>
  );
};

export default Footer;