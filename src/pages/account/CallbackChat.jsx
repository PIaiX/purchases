import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxChevronLeft } from "react-icons/rx";
import ReturnTitle from '../../components/utils/ReturnTitle';
import Chat from '../../components/chat/Chat';
import { useForm, useWatch } from 'react-hook-form';
import { createMessage, getMessages } from '../../services/message';
import Loader from '../../components/utils/Loader';
import socket from "../../config/socket";
import { titles } from '../../helpers/titles';

const CallbackChat = () => {
  const { state } = useLocation();



  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: state?.dialogId,
    },
  });

  const data = useWatch({ control });

  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });

  useEffect(() => {
    if (data?.id) {
      getMessages(data)
        .then((res) => {
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: res.messages.items,
          }));
        })
        .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
    }
  }, [data?.id]);
  useEffect(() => {
    if (data?.id) {
      socket.emit("createRoom", "message/" + data.id);

      socket.on("message", (data) => {
        if (data) {
          setMessages(prev => {
            if (data.status) {
              return {
                ...prev,
                loading: false,
                items: [data, ...prev.items],
              };
            } else {
              const messageIndex = prev.items.findIndex(item => item.id === data.id);

              if (messageIndex !== -1) {
                const updatedMessages = [...prev.items];
                updatedMessages[messageIndex] = data;

                return {
                  ...prev,
                  loading: false,
                  items: updatedMessages,
                };
              }

              return prev;
            }
          });
        }
      });
      return () => {
        socket.off("message");
        socket.emit("removeRoom", "message/" + data.id);
      };
    }
  }, [data?.id]);


  const onNewMessage = useCallback(
    (text) => {

      createMessage({ ...data, text });

    },
    [data]
  );


  if (messages.loading) {
    return <Loader full />;
  }
  return (
    <section className='sec-appeal mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/callback'} title={'Обращение ID-' + state.id} />

      <div className="row">
        <div className="col-xxl-10">
          <div className="top">
            <h4>Тема: <span className='fw-4'>{titles.find(e => e.value == state.title).title}</span></h4>
            <Link to="/account/callback" className='blue d-flex align-items-center'>
              <RxChevronLeft className='fs-13' />
              <span>Назад</span>
            </Link>
          </div>
          <div className="box p-0">
            <Chat
              type={state.type}
              data={data}
              setImage={(e) => setValue("media", Array.from(e))}
              messages={messages}
              emptyText="Нет сообщений"
              onSubmit={(e) => onNewMessage(e)}
              onChange={(e) => setValue("text", e)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallbackChat;