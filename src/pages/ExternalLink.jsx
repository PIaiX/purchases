import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ExternalLink = () => {
  const navigate = useNavigate();
  const { url } = useParams();
  return (
    <main>
      <Container>
        <Row>
          <Col lg={2}>
            <img src="/imgs/external.png" alt="" className='ms-5' />
          </Col>
          <Col lg={10}>
            <h1 >Переход по внешней ссылке</h1>
            <h3 className='mt-5 mb-4'>Вы покидаете сайт. Нажмите на ссылку ниже если хотите перейти. Администрация Rush to Play ответственности за это не несёт.</h3>
            <Link to={atob(url)} className='link'><h3>{atob(url)}</h3></Link>
            <Button onClick={() => navigate(-1)} className='btn-1 mt-5'>Вернуться назад</Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ExternalLink;