import React from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import bgImg from '../assets/imgs/bg/gradient.jpg';

const FAQ = () => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg'/>
      <Container>
        <section className='faq mb-md-5'>
          <div className='topic mb-5'>
            <h1 className='h2 mb-0'>Часто задаваемые вопросы</h1>
          </div>
          <ul>
            <li>
              <Link to="121">Общая информация</Link>
            </li>
            <li>
              <Link to="112">Общая информация</Link>
            </li>
          </ul>
        </section>
      </Container>
    </main>
  );
};

export default FAQ;