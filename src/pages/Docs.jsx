import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { getCerts } from '../services/cert';
import Loader from '../components/utils/Loader';

const Docs = () => {
  const [certs, setCerts] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getCerts({ status: 2 })
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
      <Container>
        <section className='privacy-policy mb-md-5'>
          <div className='topic'>
            <h1 className='h2 mb-0'>Правовая информация</h1>
          </div>
          <ul className='mt-3'>
            {certs.items.map(item =>
              <li><Link to={item.link} target="_blank"><p>{item.title}</p></Link></li>
            )}
          </ul>
        </section>
      </Container>
    </main>
  );
};

export default Docs;