import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from 'react-router-dom';
import Meta from "../../components/Meta";
import Chat from "../../components/chat/Chat";
import ReturnIcon from '../../components/svg/ReturnIcon';
import Loader from "../../components/utils/Loader";
import ReturnTitle from '../../components/utils/ReturnTitle';
import socket from "../../config/socket";
import {
  createMessage,
  createMessageGeneral,
  getDialogs,
  getMessages,
  getMessagesGeneral
} from "../../services/message";
import DialogPreview from './DialogPreview';


const Messages = ({ isMobileXL }) => {
  const { dialogId } = useParams();
  const { state } = useLocation();
  const timer = useRef(0);
  const userId = useSelector(state => state.auth?.user?.id);
  // const message = useSelector((state) => state.notification.message);

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: state?.dialogId ?? dialogId,
    },
  });

  const data = useWatch({ control });

  const [print, setPrint] = useState(false);

  const [dialogs, setDialogs] = useState({
    loading: true,
    items: [],
  });

  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });

  const onLoadDialogs = () => {
    getDialogs()
      .then((res) =>
        setDialogs((prev) => ({
          ...prev,
          loading: false,
          items: res.dialogs,
          count: res.countOnline,
        }))
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    onLoadDialogs();
  }, [messages]);

  useEffect(() => {
    (state?.dialogId || dialogId) &&
      setValue("id", state?.dialogId ?? dialogId);
  }, [state?.dialogId, dialogId]);

  useEffect(() => {
    if (data?.id) {
      // viewMessages(data);
      if (data?.id == "general") {
        getMessagesGeneral()
          .then((res) =>
            setMessages((prev) => ({
              ...prev,
              loading: false,
              items: res.messages.items,
            }))
          )
          .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
      } else {
        getMessages(data)
          .then((res) => {
            setMessages((prev) => ({
              ...prev,
              loading: false,
              items: res.messages.items,
              dialog: res.dialog
            }))
          }
          )
          .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
      }
    }
  }, [data?.id]);

  useEffect(() => {
    if (data?.id) {
      socket.emit("createRoom", "message/" + data.id);

      socket.on("message", (data) => {

        if (data) {
          setPrint(false);

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
        }
      });
      // socket.on("message/view/" + data.id, (data) => {
      //   setMessages((prev) => ({
      //     ...prev,
      //     loading: false,
      //     items: prev.items.map((e) => {
      //       if (e?.memberId && data == "client") {
      //         e.view = true;
      //       }
      //       return e;
      //     }),
      //   }));
      // });
      // socket.on("message/online/" + data.id, (online) => {
      //   setMessages((prev) => ({
      //     ...prev,
      //     user: {
      //       ...prev.user,
      //       online,
      //     },
      //   }));
      //   onLoadDialogs();
      // });
      socket.on("message/print/" + data.id, () => {
        setPrint(true);
        if (timer.current === 0) {
          timer.current = 1;
          setTimeout(() => {
            timer.current = 0;
            setPrint(false);
          }, 5000);
          return () => clearTimeout(timer.current);
        }
      });
      return () => {
        socket.off("message");
        // socket.off("message/view/" + data.id);
        socket.off("message/print/" + data.id);
      };
    }

  }, [data?.id]);

  useEffect(() => {
    if (timer.current === 0 && data?.text?.length > 0) {
      timer.current = 1;
      setPrint(true);
      socket.emit("message/print", { adminId: data.id });
      setTimeout(() => {
        timer.current = 0;
        setPrint(false);
      }, 5000);
      return () => clearTimeout(timer.current);
    }
  }, [data?.text]);

  const onNewMessage = useCallback(
    (text) => {
      if (data?.id === "general" || dialogId === "general") {
        createMessageGeneral({ ...data, text });
      } else {
        createMessage({ ...data, text });
      }

      reset({ id: data.id ?? dialogId });
    },
    [data, state, dialogId]
  );

  if (dialogs.loading) {
    return <Loader full />;
  }
  const user = (userId == messages?.dialog?.to?.id ? messages?.dialog?.from : messages?.dialog?.to);
  return (
    <>
      <Meta title="Сообщения" />
      <ReturnTitle link={'/account'} title={'Сообщения'} />
      <section className='sec-messages'>
        <div className='sec-messages-list'>
          <form action="" className='p-2 p-sm-3'>
            <input type="search" placeholder='Поиск пользователя' className='p-blue' />
          </form>
          <ul>
            <li>
              <Link to="general" className='general-chat'>
                <div className="count">
                  <div class="fs-13">{dialogs.count}</div>
                  <div>online</div>
                </div>
                <h6>Общий чат</h6>
              </Link>
            </li>
            {dialogs?.items?.length > 0 ? (
              dialogs.items.map((dialog) => (
                <li>
                  <DialogPreview {...dialog} userId={userId} />
                </li>
              ))) : (
              <p className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                В данный момент нет диалогов
              </p>
            )
            }
          </ul>
        </div>
        {!isMobileXL &&
          <div className="sec-messages-chat">
            <Link to='/account/messages' className='d-flex align-items-center d-xl-none return-icon ms-4 mb-2'>
              <ReturnIcon />
            </Link>
            <div className="p-3 pr-0">
              <div>
                <div className="p-3 pt-0">
                  {!data?.id ? (
                    <div className="chat d-flex align-items-center justify-content-center flex-column">
                      <h2 className="mb-3">Выберите диалог</h2>
                      <p className="text-gray">
                        В данный момент нет диалогов. Возможно вы не выбрали
                        конкретный диалог.
                      </p>
                    </div>
                  ) : messages.loading ? (
                    <div className="chat d-flex align-items-center justify-content-center flex-column">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {data?.id == 'general' ? (
                        <div className="dialog-preview">

                          <div className="text">
                            <h5 className="fw-7 mb-0">Общий чат</h5>
                            <p className="text-muted">
                              <span className="fw-7 mb-0">{dialogs.count} </span>
                              <span className="text-success"> Онлайн</span>

                            </p>
                          </div>

                        </div>
                      ) : (
                        user && (


                          <div className="dialog-preview">
                            <img src="/imgs/user.jpg" alt="user" />
                            <div className="text">
                              <h5 className="fw-7 mb-0">{user.nickname}</h5>
                              <p className="text-muted fs-07">
                                {print ? (
                                  "Печатает сообщение..."
                                ) : user.online?.status ? (
                                  <span className="text-success">Онлайн</span>
                                ) : user.online?.end ? (
                                  "Был(-а) в сети " +
                                  moment(user.online?.end).fromNow()
                                ) : (
                                  "Оффлайн"
                                )}
                              </p>
                            </div>
                          </div>

                        ))}
                      <Chat
                        messages={messages}
                        emptyText="Нет сообщений"
                        onSubmit={(e) => onNewMessage(e)}
                        onChange={(e) => setValue("text", e)}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </>
  );
};

export default Messages;