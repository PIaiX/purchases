import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthorizationForm from '../components/forms/AuthorizationForm';
import RegistrationForm from '../components/forms/RegistrationForm';

const Registration = () => {
  return (
    <main>
      <Container>
        <section className='sec-registration mb-6'>
          <Row className='justify-content-center'>
            <Col xs={12} xl={10}>
              <div className="title">
                <h1 className='h2 mb-0'>Регистрация нового пользователя</h1>
                <img src="imgs/head2.png" alt="head" />
              </div>
              <div className='box mt-4'>
                <RegistrationForm/>

                <AuthorizationForm title={'Уже есть аккаунт?'}/>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;