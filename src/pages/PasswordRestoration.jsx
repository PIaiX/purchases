import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PasswordForm from '../components/forms/PasswordForm';

const PasswordRestoration = () => {
  return (
    <main>
      <Container>
        <section className='sec-password mb-6'>
          <Row className='justify-content-center'>
            <Col xs={12} xl={10}>
              <h1 className='h2'>Восстановление пароля</h1>
              <Row>
                <Col lg={7} xxl={6}>
                  <div className="wrap">
                    <PasswordForm/>
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

export default PasswordRestoration;