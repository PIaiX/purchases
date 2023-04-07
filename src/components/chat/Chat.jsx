import React from 'react';
import WarningIcon from '../svg/WarningIcon';
import send from '../../assets/imgs/send.svg';
import MyMessage from './MyMessage';
import UserMessage from './UserMessage';
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-count">
        <div className='fs-13'>102</div>
        <div className='fs-09'>участника online</div>
      </div>
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
  );
};

export default Chat;