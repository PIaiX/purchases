import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Message from './Message';
import SimpleInputFile from '../utils/SimpleInputFile';
import ChatData from './ChatData'
import { useSelector } from "react-redux";
import socket from "../../config/socket";
import {
  createMessage,
  getDialogs,
  getMessages,
  viewMessages,
} from "../../services/message";


const Chat = () => {


  const Data = ChatData;
  const compareTime = (a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };

  const sortData = Data.sort(compareTime);
  const myName = 'Weatherwax';
  return (
    <div className="chat">
      <div className="chat-window">
        {sortData.map((item) => (
          <Message
            my={item.name === myName}
            name={item.name}
            time={item.time}
            text={item.text}
          />

        ))}
      </div>
      <form action="" className='chat-form'>
        <input type="text" placeholder='Ваше сообщение' />
        <button type='submit' className='btn-1 fs-08 py-2 px-3'>Отправить</button>
        <SimpleInputFile className="mx-3" />
      </form>
    </div>
  );
};

export default Chat;