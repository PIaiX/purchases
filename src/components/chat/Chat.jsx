import React from 'react';
import MyMessage from './MyMessage';
import UserMessage from './UserMessage';
import SimpleInputFile from '../utils/SimpleInputFile';

const Chat = () => {
  return (
    <div className="chat">
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
        <input type="text" placeholder='Ваше сообщение'/>
        <button type='submit' className='btn-1 fs-08 py-2 px-3'>Отправить</button>
        <SimpleInputFile className="mx-3"/>
      </form>
    </div>
  );
};

export default Chat;