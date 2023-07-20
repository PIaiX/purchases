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
          <h1 className='h2 text-center'>Авторизация</h1>
          <Row className='justify-content-center'>
            <Col xs={12} md={8} lg={6} xl={5}>
              <div className="wrap">
                <AuthorizationForm/>
                <Link to="/registration" className='mt-3 text-center link d-block'>Регистрация</Link>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Login;