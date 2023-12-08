import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Message from './Message';
import SimpleInputFile from '../utils/SimpleInputFile';
import { useSelector } from "react-redux";
import socket from "../../config/socket";
import {
  createMessageGeneral,
  getMessagesGeneral,
  viewMessagesGeneral,
} from "../../services/message";
import { useLocation, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import Loader from "../utils/Loader";


const ChatGeneral = memo(() => {


  const userId = useSelector(state => state.auth?.user?.id);

  const { state } = useLocation();
  const timer = useRef(0);
  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });
  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      userId: state?.userId ?? userId,
    },
  });
  const data = useWatch({ control });
  const getPage = () => {
    getMessagesGeneral()
      .then((res) =>
        setMessages((prev) => ({
          ...prev,
          loading: false,
          ...res.messages,
          count: res.countOnline
        })),
      )
      .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
  }
  useEffect(() => {

    // viewMessages({ fromId: userId, toId: toId, id: dialogId });
    getPage()

  }, []);

  useEffect(() => {
    if (data?.userId) {
      socket.emit('createRoom', 'message/general');

      socket.on("message", (data) => {

        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: [
            data,
            ...prev.items.map((e) => {
              if (e?.userId) {
                e.view = true;
              }
              return e;
            }),
          ],
        }));
      });

      return () => {
        socket.off("message");
      };
    }
  }, [data?.userId]);

  useEffect(() => {
    if (timer.current === 0 && data?.text?.length > 0) {
      timer.current = 1;
      socket.emit("message/print", { userId: data.userId });
      setTimeout(() => {
        timer.current = 0;
      }, 3000);
    }
  }, [data?.text]);

  const onNewMessage = useCallback(
    (text) => {
      createMessageGeneral({ ...data, text }).then(() => messages.items.length === 0 && getPage());
      reset({ userId: data.userId });
    },
    [data, state, userId]
  );
  const emptyText = "Нет сообщений";
  const auth = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    setText(e);
    setValue("text", e)
  };

  const onClick = useCallback(() => {
    if (text.length > 0) {
      onNewMessage(text);
      setText("");
    }
  }, [text, onNewMessage]);
  const [receivedData, setReceivedData] = useState('');

  function onDataReceived(data) {
    setReceivedData(data);
  }
  if (messages.loading) {
    return <Loader />;
  }
  return (

    <div className="chat">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2>Общий чат</h2>
        <div className="sec-chat-count">
          <div className="num">{messages.count}</div>
          <div className="text">участника online</div></div>
      </div>

      {
        messages.loading ? (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            Загрузка сообщений...
          </div>
        ) : messages.items.length > 0 ? (
          <div className="chat-window">
            {messages.items.map((item) => (


              < Message
                my={item.userId === auth.user.id}
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
      {userId ?
        <>
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

export default ChatGeneral;