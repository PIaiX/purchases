import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import Loader from "../utils/Loader";
import SimpleInputFile from '../utils/SimpleInputFile';
import Message from './Message';


const Chat = memo(({ general, messages, emptyText, onChange, className, onSubmit, type, setImage, data, scrollOff, setScrollOff, onLoadChat }) => {
  const userId = useSelector((state) => state.auth?.user?.id);
  const [text, setText] = useState();
  const [rows, setRows] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const chatWindowRef = useRef(null);
  const { ref: loaderRef, inView, entry } = useInView({
    threshold: 0.5, //  Наблюдать  при  50%  видимости  loader
    rootMargin: '200px', //  Дополнительный  отступ  (200px  до  loader)
  });

  useEffect(() => {
    const textareaElement = document.querySelector('textarea');
    if (textareaElement) {
      document.documentElement.style.setProperty('--textarea-height', `${textareaElement?.scrollHeight}px`);
    }
  }, [rows]);

  useEffect(() => {

    //  Загружаем  следующую  страницу,  когда  loader  становится  видимым
    if (inView == true && messages?.hasMore && messages?.load && !messages?.loading) {

      onLoadChat(currentPage + 1);
      setCurrentPage(currentPage + 1)
    }
  }, [inView, messages?.hasMore]);
  const onChangeText = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
    const textarea = e.target;
    setRows(Math.min(Math.max(textarea.value.split('\n').length, 1), 4));
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  const onClick = useCallback(() => {
    if (text && text?.length > 0 || data?.media?.length > 0) {
      onSubmit(text);
      setText("");
      setRows(1);
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
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
          <div ref={chatWindowRef} className={"chat-window" + (scrollOff ? " off" : "")}>

            {scrollOff &&
              <>
                <button type="button" className='scroll-button' onClick={() => setScrollOff(false)}>Показать ещё</button>
              </>
            }
            {messages.items.map((item, index) => (
              <>

                <Message
                  key={index}
                  {...item}
                  my={item.userId === userId}
                  general={general}
                  admin={type != "task" && item.memberId}
                />

              </>
            ))}
            {!inView && messages?.hasMore && messages?.load && < div ref={loaderRef}>
              <Loader />
            </div>
            }
          </div>

        ) : (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            {emptyText}
          </div>
        )
      }
      {
        general != "system" && (userId ?
          <>
            < div className='chat-form' >
              <textarea
                rows={rows}
                value={text}
                type="text"
                placeholder={general == "general" ? "Начните общаться" : "Ваше сообщение"}
                onChange={(e) => onChangeText(e)}
                onKeyPress={onKeyPress}
              />
              {general != "general" &&
                <SimpleInputFile media={data?.media} setImage={(e) => setImage(e)} />
              }
              <button onClick={onClick} type='submit'>Отправить</button>

            </div >
          </>
          : (
            <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
              Для отправки сообщений войдите в аккаунт!
            </div>
          ))
      }
    </div >
  );
});

export default Chat;