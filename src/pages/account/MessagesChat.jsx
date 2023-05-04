import React from 'react';
import UserMessage from '../../components/chat/UserMessage';
import MyMessage from '../../components/chat/MyMessage';
import send from '../../assets/imgs/send.svg';
import WarningIcon from '../../components/svg/WarningIcon';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';

const MessagesChat = () => {
  return (
    <div className="sec-messages-chat">
      <Link to='/account/messages' className='d-flex align-items-center d-xl-none link-2 ms-4 mb-2'>
        <ReturnIcon className="fs-20"/>
        <span className='ms-2'>назад</span>
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
  );
};

export default MessagesChat;