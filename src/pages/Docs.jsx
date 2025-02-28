import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Docs = () => {
  return (
    <main className='account'>
      <Container>
        <section className='privacy-policy mb-md-5'>
          <Row className='justify-content-center'>
            <Col xs={12} xl={11} xxl={10}>
              <div className='topic'>
                <h1 className='h2 mb-0'>Правовая информация</h1>
              </div>
              <ul className='mt-3'>
                <li>
                  <Link to={"privacy"}>
                    <p>
                      Политика конфиденциальности
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"cookie"}>
                    <p>
                      Политика куки
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"rules"}>
                    <p>
                      Пользовательское соглашение
                    </p>
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Docs;