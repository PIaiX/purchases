import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import {Link} from 'react-router-dom';
import Girl from '../assets/imgs/girl.png';
import bgImg from '../assets/imgs/bg/gradient.jpg';

const FAQ = () => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg'/>
      <Container>
        <section className='faq mb-md-5'>
          <Row className='gx-5 justify-content-end'>
            <Col md={6}>
              <div className='topic mb-5'>
                <h1 className='h2 mb-0'>Часто задаваемые вопросы</h1>
              </div>
              <div className='list-wrapping mb-5'>
                <div className='list-wrapping-top'>
                  <h4>Продажа</h4>
                </div>
                <div className='list-wrapping-main'>
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header as="div">Общая информация</Accordion.Header>
                      <Accordion.Body>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header as="div">Финансы и баланс</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header as="div">Совершение покупки</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header as="div">Аккаунт на бирже</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
              <div className='list-wrapping mb-5'>
                <div className='list-wrapping-top'>
                  <h4>Покупка</h4>
                </div>
                <div className='list-wrapping-main'>
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header as="div">Общая информация</Accordion.Header>
                      <Accordion.Body>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header as="div">Финансы и баланс</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header as="div">Совершение покупки</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header as="div">Аккаунт на бирже</Accordion.Header>
                      <Accordion.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <ul className='list-unstyled'>
                <li className='mb-5'>
                  <div className='topic'>
                    <h2 className="mb-0">
                      <Link to='/rules'>Правила</Link>
                    </h2>
                  </div>
                </li>
                <li className='mb-5'>
                  <div className='topic'>
                    <h2 className="mb-0">
                      <Link to="/privacy">Политика конфиденциальности</Link>
                    </h2>
                  </div>
                </li>
                <li className='mb-5'>
                  <div className='topic'>
                    <h2 className="mb-0">
                      <Link to='/cookie'>Политика cookie</Link>
                    </h2>
                  </div>
                </li>
              </ul>
              <div className='box'>
                <img src={Girl} alt="Girl" className='img-fluid' />
                <h2 className='mb-2'>Не нашли ответ?</h2>
                <p className='mb-4'>авторизируйтесь чтобы задать вопрос администрации сайта</p>
                <Link to='/login' className='btn-1'>Войти</Link>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default FAQ;