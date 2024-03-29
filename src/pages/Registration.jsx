import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegistrationForm from '../components/forms/RegistrationForm';

const Registration = () => {
  return (
    <main>
      <Container>
        <section className='sec-registration mb-6'>
          <h1 className='h2 text-center'>Регистрация</h1>
          <Row className='justify-content-center'>
            <Col xs={12} xl={6}>
              <RegistrationForm/>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;