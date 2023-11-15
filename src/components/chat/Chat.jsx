import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import MyMessage from './MyMessage';
import UserMessage from './UserMessage';
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

  // const [messages, setMessages] = useState({
  //   loading: true,
  //   items: [],
  // });

  // const onLoadDialogs = () => {
  //   getDialogs()
  //     .then((res) =>
  //       setDialogs((prev) => ({
  //         ...prev,
  //         loading: false,
  //         ...res,
  //       }))
  //     )
  //     .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  // };
  // useEffect(() => {
  //   onLoadDialogs();
  // }, [message, brand]);

  // useEffect(
  //   () =>
  //     (state?.userId || userId) &&
  //     setValue("userId", state?.userId ?? userId),
  //   [state?.userId, userId]
  // );

  // useEffect(() => {
  //   viewMessages(data);
  //   getMessages(data)
  //     .then((res) =>
  //       setMessages((prev) => ({
  //         ...prev,
  //         loading: false,
  //         ...res,
  //       }))
  //     )
  //     .catch(() => setMessages((prev) => ({ ...prev, loading: false })));

  // }, [brand]);

  // useEffect(() => {
  //   if (data?.userId) {
  //     socket.on("message/user/" + data.userId, (data) => {
  //       if (data) {
  //         setPrint(false);
  //         setMessages((prev) => ({
  //           ...prev,
  //           loading: false,
  //           items: [
  //             data,
  //             ...prev.items.map((e) => {
  //               if (e?.memberId) {
  //                 e.view = true;
  //               }
  //               return e;
  //             }),
  //           ],
  //         }));
  //       }
  //     });
  //     socket.on("message/view/" + data.userId, (data) => {
  //       setMessages((prev) => ({
  //         ...prev,
  //         loading: false,
  //         items: prev.items.map((e) => {
  //           if (e?.memberId && data == "client") {
  //             e.view = true;
  //           }
  //           return e;
  //         }),
  //       }));
  //     });
  //     socket.on("message/online/" + data.userId, (online) => {
  //       setMessages((prev) => ({
  //         ...prev,
  //         user: {
  //           ...prev.user,
  //           online,
  //         },
  //       }));
  //       onLoadDialogs();
  //     });
  //     socket.on("message/print/admin/" + data.userId, () => {
  //       setPrint(true);
  //       if (timer.current === 0) {
  //         timer.current = 1;
  //         setTimeout(() => {
  //           timer.current = 0;
  //           setPrint(false);
  //         }, 5000);
  //       }
  //     });
  //     return () => {
  //       socket.off("message/user/" + data.userId);
  //       socket.off("message/view/" + data.userId);
  //       socket.off("message/print/admin/" + data.userId);
  //     };
  //   }
  // }, [data?.userId, brand]);

  // useEffect(() => {
  //   if (timer.current === 0 && data?.text?.length > 0) {
  //     timer.current = 1;
  //     socket.emit("message/print", { userId: data.userId });
  //     setTimeout(() => {
  //       timer.current = 0;
  //     }, 3000);
  //   }
  // }, [data?.text]);

  // const onNewMessage = useCallback(
  //   (text) => {
  //     createMessage({ ...data, text });
  //     reset({ userId: data.userId });
  //   },
  //   [data, state, userId]
  // );

  // if (dialogs.loading) {
  //   return <Loader full />;
  // }



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
          (myName === item?.name) && (
            < MyMessage name={item.name} time={item.time} text={item.text} />
          ) ||
          (myName != item?.name) && (
            <UserMessage name={item.name} time={item.time} text={item.text} />
          )
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