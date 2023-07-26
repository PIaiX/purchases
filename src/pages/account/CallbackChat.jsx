import React from 'react';
import {Link} from 'react-router-dom';
import UserMessage from '../../components/chat/UserMessage';
import MyMessage from '../../components/chat/MyMessage';
import send from '../../assets/imgs/send.svg';
import { RxChevronLeft } from "react-icons/rx";
import ReturnTitle from '../../components/utils/ReturnTitle';

const CallbackChat = () => {
  return (
    <section className='sec-appeal mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/callback'} title={'Обращение ID-15296'}/>

      <div className="row">
        <div className="col-xxl-10">
          <div className="top">
            <h4>Тема: <span className='fw-4'>Не получается совершить покупку</span></h4>
            <Link to="/account/callback" className='blue d-flex align-items-center'>
              <RxChevronLeft className='fs-13'/>
              <span>Назад</span>
            </Link>
          </div>
          <div className="box">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallbackChat;