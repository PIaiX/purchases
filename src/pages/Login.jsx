import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthorizationForm from '../components/forms/AuthorizationForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main>
      <Container>
        <section className='sec-login mb-6'>
          <Row className='justify-content-center'>
            <Col lg={10}>
              <h1 className='h2'>Авторизация</h1>
              <Row>
                <Col lg={5}>
                  <div className="wrap">
                    <AuthorizationForm/>
                    <Link to="/registration" className='mt-3 pale-blue d-flex text-decoration-underline'>Регистрация</Link>
                  </div>
                </Col>
                <Col lg={7}>
                  <div className="cover">
                    <h2 className='mb-0'>Тысячи лотов <br/>уже ждут тебя</h2>
                    <img src="imgs/head2.png" alt="head" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Login;