import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bgImg from '../assets/imgs/bg/gradient.jpg';

const Cookie = () => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg'/>
      <Container>
        <section className='mb-md-5'>
          <Row className='justify-content-center'>
            <Col xs={12} xl={11} xxl={10}>
              <div className='topic'>
                <h1 className='h2 mb-0'>Политика cookie</h1>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Cookie;