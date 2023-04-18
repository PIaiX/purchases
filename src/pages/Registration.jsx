import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Registration = () => {
  return (
    <main>
      <Container>
        <section className='sec-registration'>
          <Row className='justify-content-center'>
            <Col lg={10}>
              <div className="title">
                <h1 className='h2 mb-0'>Регистрация нового пользователя</h1>
                <img src="imgs/head2.png" alt="head" />
              </div>
              <form action="" className='mt-4'></form>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;