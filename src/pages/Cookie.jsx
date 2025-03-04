import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bgImg from '../assets/imgs/bg/gradient.jpg';
import ReturnLink from '../components/utils/ReturnLink';

const Cookie = () => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg' />
      <Container>
        <section className='mb-md-5'>
          <div className='topic  d-flex align-items-baseline mb-5'>
            <ReturnLink link={'/docs'} className="me-4" />
            <h1 className='h2 mb-0'>Политика cookie</h1>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Cookie;