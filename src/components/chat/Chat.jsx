import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleInputFile from '../utils/SimpleInputFile';
import Message from './Message';
import Loader from "../utils/Loader";


const Chat = memo(({ general, messages, emptyText, onChange, className, onSubmit }) => {

  const userId = useSelector(state => state.auth?.user?.id);
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    setText(e);
    onChange(e);
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const textarea = e.target.value;
      const cursorPosition = textarea.selectionStart;
      const textBefore = textarea.value.substring(0, cursorPosition);
      const textAfter = textarea.value.substring(cursorPosition, textarea.value.length);
      textarea.value = textBefore + '\n' + textAfter;
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
    } else if (e.key === 'Enter' && !e.shiftKey) {
      onClick();
    }
  };

  const onClick = useCallback(() => {
    if (text.length > 0) {
      onSubmit(text);
      setText("");
    }
  }, [text]);
  if (messages.loading) {
    return <Loader />;
  }
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
                general={general}
                id={item.userId}
                user={item.user}
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
      {userId ?
        <>
          <div className='chat-form'>
            <input
              value={text}
              type="text"
              placeholder='Ваше сообщение'
              onChange={(e) => onChangeText(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <button onClick={onClick} type='submit' className="btn-1 fs-08 py-2 px-3">Отправить</button>
            {general != "general" &&
              <SimpleInputFile className="mx-3" />
            }
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