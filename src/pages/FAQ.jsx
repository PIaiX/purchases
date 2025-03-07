import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import bgImg from '../assets/imgs/bg/gradient.jpg';
import { getCerts } from '../services/cert';
import Loader from '../components/utils/Loader';

const FAQ = () => {
  const [certs, setCerts] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getCerts({ status: 1 })
      .then((res) => {
        setCerts((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
      })
      .catch(() => setCerts((prev) => ({ ...prev, loading: false })));
  }, []);

  if (certs.loading) {
    return <Loader full />;
  }
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg' />
      <Container>
        <section className='faq mb-md-5'>
          <div className='topic mb-5'>
            <h1 className='h2 mb-0'>Часто задаваемые вопросы</h1>
          </div>
          <ul>
            {certs.items.map(item =>
              <li><Link to={item.link} target="_blank"><p>{item.title}</p></Link></li>
            )}
          </ul>
        </section>
      </Container>
    </main>
  );
};

export default FAQ;