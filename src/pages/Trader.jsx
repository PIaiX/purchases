import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StarRating from '../components/utils/StarRating';
import Joystick from '../components/svg/Joystick';
import { FiMessageCircle, FiEdit, FiShare, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
import { TbHeartHandshake } from "react-icons/tb";
import UserMessage from '../components/chat/UserMessage';
import MyMessage from '../components/chat/MyMessage';
import {Link} from 'react-router-dom';
import ReturnIcon from '../components/svg/ReturnIcon';
import WarningIcon from '../components/svg/WarningIcon';
import send from '../assets/imgs/send.svg';
import FeedbackLine from '../components/FeedbackLine';
import TraderLine from '../components/TraderLine';

const Trader = () => {
  return (
    <main>
      <section className='mb-6'>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="d-flex align-items-center mb-5">
                <div className='user flex-1'>
                  <div className="user-photo">
                    <img src="imgs/user2.jpg" alt="userphoto" />
                    <button type='button'><FiEdit/></button>
                  </div>
                  <div className="user-main">
                    <div className='title'>Weatherwax</div>
                    <div className="d-flex align-items-center">
                      <StarRating rate={5}/> 
                      <span className='fs-13 fw-7 ms-2'>5</span>
                    </div>
                    <p className='mt-2'>3 года на платформе</p>
                  </div>
                  <ul className="user-info">
                    <li>
                      <div>
                        <TbHeartHandshake className='svg'/>
                        <span>Сделок:</span>
                      </div>
                      <span>1033</span>
                    </li>
                    <li>
                      <div>
                        <Joystick className='path'/>
                        <span>Лотов:</span>
                      </div>
                      <span>336</span>
                    </li>
                    <li>
                      <div>
                        <FiMessageCircle className='svg'/>
                        <span>Отзывов:</span>
                      </div>
                      <span>193</span>
                    </li>
                  </ul>
                  <img src="imgs/qr-code.svg" alt="qr-code" className='qr-code align-self-center ms-3 ms-xl-5'/>
                </div>
                <div>
                  <button type='button' className='d-flex dark-blue fs-15 ms-2 ms-xl-4'>
                    <FiShare/>
                  </button>
                  <button type='button' className='mt-4 d-flex dark-blue fs-15 ms-2 ms-xl-4'>
                    <FiAlertTriangle/>
                  </button>
                </div>
              </div>

              <h4>Предложения</h4>
              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top"></div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className='row row-cols-1 g-3'>
                    <li>
                      <TraderLine 
                        serv={'Airin + Blackbird'}
                        descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'}
                        price={'186,97 ₽'}
                      />
                    </li>
                    <li>
                      <TraderLine 
                        serv={'Airin + Blackbird'}
                        descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'}
                        price={'186,97 ₽'}
                      />
                    </li>
                    <li>
                      <TraderLine 
                        serv={'Airin + Blackbird'}
                        descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'}
                        price={'186,97 ₽'}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top">
                  <h5 className='fw-6'>Всего 193 отзыва</h5>
                </div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className='row row-cols-1 g-3'>
                    <li>
                      <FeedbackLine user="Galadriel_90" rate={4.1} text="быстрое и качественное выполнение заказа, спасибо!"/>
                    </li>
                    <li>
                      <FeedbackLine user="Galadriel_90" rate={4.1} text="быстрое и качественное выполнение заказа, спасибо!"/>
                    </li>
                    <li>
                      <FeedbackLine user="Raccoon5" rate={2.8} text="Быстро и чётко,спасибо продавцу"/>
                    </li>
                  </ul>
                </div>
                <div className="list-wrapping-bottom">
                  <button type="button" className='mx-auto d-flex flex-column align-items-center pale-blue fs-11'>
                    <span>Показать ещё</span>
                    <FiChevronDown className='fs-14'/>
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <h2 className='text-center'>Чат с пользователем</h2>
              <div className="sec-messages-chat">
                <Link to='/account/messages' className='d-flex align-items-center d-xl-none return-icon ms-4 mb-2'>
                  <ReturnIcon/>
                </Link>
                <div className="chat-window">
                  <UserMessage name={'User8name'} time={'12:36'} text={'Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой'}/>
                  <UserMessage name={'Galadriel_90'} time={'12:37'} text={'Другим отключают со временем. Как другу отключили. Хотелось бы на новый год такой подарок.'}/>
                  <MyMessage name={'Weatherwax'} time={'12:37'} text={'Ребятааааа! Куплю аккаунты в доте'}/>
                  <UserMessage name={'Galadriel_90'} time={'12:37'} text={'Какая-то слишком глупая схема обмана Через рефералы Схема стара как жизнь'}/>
                  <UserMessage name={'User8name'} time={'12:40'} text={'Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой'}/>
                  <MyMessage name={'Weatherwax'} time={'12:37'} text={'Ребятааааа! Куплю аккаунты в доте'}/>
                  <UserMessage name={'User8name'} time={'12:36'} text={'Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой'}/>
                  <UserMessage name={'Galadriel_90'} time={'12:37'} text={'Другим отключают со временем. Как другу отключили. Хотелось бы на новый год такой подарок.'}/>
                </div>
                <form action="" className='chat-form'>
                  <div className="input">
                    <input type="text" placeholder='Продажа в чате запрещена'/>
                  </div>
                  <button type='submit' className='btn-1'>
                    <img src={send} alt="send" />
                  </button>
                </form>
                <button type='button' className='chat-report'>
                  <WarningIcon/>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Trader;