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


const Chat = () => {


  const userId = useSelector(state => state.auth.user.id);
  const { dialogId } = useParams();
  console.log(dialogId);
  const toId = 2;
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
  useEffect(() => {
    socket.emit('createRoom', 'message/' + dialogId);
    getMessages({ fromId: userId, toId: toId, id: dialogId })
      .then((res) =>
        setMessages((prev) => ({
          ...prev,
          loading: false,
          ...res,
        }))

      )
      .catch(() => setMessages((prev) => ({ ...prev, loading: false })));

  }, [userId, toId, dialogId]);

  useEffect(() => {
    if (data?.userId) {
      socket.on("message", (data) => {
        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: [
            data,
            ...prev.items,
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
      createMessage({ ...data, toId: toId, id: dialogId, text });
      reset({ userId: data.userId });
    },
    [data, state, userId, dialogId, toId]
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
  console.log(messages.items)
  return (
    <div className="chat">

      {
        messages.loading ? (
          <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            Загрузка сообщений...
          </div>
        ) : messages.items.length > 0 ? (
          <div className="chat-window">
            {messages.items.map((item) => (

              <Message
                my={item.userId === auth.user.id}
                name="Альберт"
                time={item.createdAt}
                text={item.text}
                admin={item.memberId}
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
};

export default Chat;