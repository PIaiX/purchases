import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleInputFile from '../utils/SimpleInputFile';
import Message from './Message';
import Loader from "../utils/Loader";
import { NotificationManager } from "react-notifications";
import { getImageURL } from "../../helpers/all";
import { useNavigate } from "react-router-dom";


const Chat = memo(({ general, messages, emptyText, onChange, className, onSubmit, user, type, account, setImage, data, onTask }) => {
  const userId = useSelector((state) => state.auth?.user?.id);
  const [text, setText] = useState();
  const [rows, setRows] = useState(1);

  const navigate = useNavigate();

  const onChangeText = (e) => {
    setText(e);
    onChange(e);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      const textarea = e.target;
      setRows(Math.min(Math.max(textarea.value.split('\n').length, 1), 4));
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  const onClick = useCallback(() => {
    if (text && text?.length > 0 || data?.media?.length > 0) {
      onSubmit(text);
      setText("");
      setRows(1);
    }
  }, [text, data]);


  if (messages.loading) {
    return <Loader />;
  }
  return (
    <div className={"chat " + className}>
      {
        messages.loading ? (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            Загрузка сообщений...
          </div>
        ) : messages?.items?.length > 0 ? (
          <div className="chat-window">
            {messages.items.map((item, index) => (

              <Message
                key={index}
                {...item}
                my={item.userId === userId}
                general={general}
                admin={type != "task" && item.memberId}
              />


            ))}
          </div>

        ) : (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            {emptyText}
          </div>
        )
      }
      {userId ?
        <>
          <div className='chat-form'>
            <textarea
              rows={rows}
              value={text}
              type="text"
              placeholder={general == "general" ? "Начните общаться" : "Ваше сообщение"}
              onChange={(e) => onChangeText(e.target.value)}
              onKeyPress={onKeyPress}
            />
            {general != "general" &&
              <SimpleInputFile media={data?.media} setImage={(e) => setImage(e)} />
            }
            <button onClick={onClick} type='submit'>Отправить</button>

          </div>
        </>
        : (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            Для отправки сообщений войдите в аккаунт!
          </div>
        )
      }
    </div >
  );
});

export default Chat;