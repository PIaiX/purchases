import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Message from './Message';
import SimpleInputFile from '../utils/SimpleInputFile';
import { useSelector } from "react-redux";
import socket from "../../config/socket";
import {
  createMessage,
  getMessages,
  viewMessages,
} from "../../services/message";
import { useLocation, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";


const Chat1 = memo(({ messages, emptyText, onChange, className, onSubmit }) => {

  const userId = useSelector(state => state.auth?.user?.id);
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    setText(e);
    onChange(e);
  };

  const onClick = useCallback(() => {
    if (text.length > 0) {
      onSubmit(text);
      setText("");
    }
  }, [text]);

  return (
    <div className={"chat" + className}>


      {
        messages.loading ? (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            Загрузка сообщений...
          </div>
        ) : messages?.items?.length > 0 ? (
          <div className="chat-window">
            {messages.items.map((item) => (


              < Message
                my={item.userId === userId}
                name="Альберт"
                time={item.createdAt}
                text={item.text}
                admin={item.memberId}
                view={item.view}
              />

            ))}
          </div>

        ) : (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            {emptyText}
          </div>
        )
      }

      <div className='chat-form'>
        <input
          value={text}
          type="text"
          placeholder='Ваше сообщение'
          onChange={(e) => onChangeText(e.target.value)}
        />
        <button onClick={onClick} type='submit' className="btn-1 fs-08 py-2 px-3">Отправить</button>
        <SimpleInputFile className="mx-3" />
      </div>
    </div >
  );
});

export default Chat1;