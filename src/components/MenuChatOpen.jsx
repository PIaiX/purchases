import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import close from '../assets/imgs/close.svg';
import socket from '../config/socket';
import DialogPreviewMini from '../pages/account/DialogPreviewMini';
import { createMessage, createMessageGeneral, getDialogs, getMessages, getMessagesGeneral, getSystemNotification } from '../services/message';
import { updateNotification } from '../store/reducers/notificationSlice';
import Chat from './chat/Chat';
import ReturnIcon from './svg/ReturnIcon';
import Loader from './utils/Loader';
import LogoMess from './svg/LogoMess';
import Logo from './svg/Logo';

const MenuChatOpen = ({ chatOpen, setChatOpen, id, setId }) => {
  const timer = useRef(0);
  const userId = useSelector(state => state.auth?.user?.id);

  const unreadDate = useSelector((state) => state.notification.messageDate);
  const [search, setSearch] = useState('');

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: id,
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
  const dispatch = useDispatch();
  const onLoadDialogsHash = (data) => {
    getDialogs({ page: data, search: search, size: 50 })
      .then((res) => {
        setDialogs((prev) => ({
          ...prev,
          loading: false,
          items: [...prev.items, ...res.dialogs],
          hasMore: res.dialogs.length > 49 ? true : false,
          count: res.countOnline,
          countSystem: res.countSystem,
        }))
      }
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  const onLoadDialogs = (data) => {
    getDialogs({ page: data, search: search, size: 50 })
      .then((res) => {
        setDialogs((prev) => ({
          ...prev,
          loading: false,
          items: [...res.dialogs],
          hasMore: res.dialogs.length > 49 ? true : false,
          count: res.countOnline,
          countSystem: res.countSystem,
        }))
        dispatch(updateNotification({ message: -1 }))
      }
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    onLoadDialogs();
  }, [unreadDate]);

  useEffect(() => {
    if (id) {
      setValue("id", id);
      setMessages(() => ({ items: [], loading: true }))
    }
    else {
      reset();
      setMessages(() => ({ items: [], loading: true }))
    }
  }, [id]);
  const onLoadChat = (chatPage) => {
    onLoadDialogs();
    setMessages((prev) => ({ ...prev, load: false }))
    if (data?.id == "general") {
      getMessagesGeneral({ page: chatPage, size: 50 })
        .then((res) =>
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: [...messages.items, ...res.messages.items],
            hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : res.messages.pagination.totalPages > 1 ? true : false,
            load: true,
          }))
        )
        .catch(() =>
          setMessages((prev) => ({ ...prev, loading: false, load: true, }))
        );
    } else if (data?.id == "system") {
      getSystemNotification({ page: chatPage, size: 50 })
        .then((res) =>
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: [...messages.items, ...res.messages.items],
            hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : res.messages.pagination.totalPages > 1 ? true : false,
            load: true,
          }))
        )
        .catch(() =>
          setMessages((prev) => ({ ...prev, loading: false, load: true, }))
        );
    } else {
      getMessages({ ...data, page: chatPage, size: 50 })
        .then((res) => {
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: [...messages.items, ...res.messages.items],
            hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : res.messages.pagination.totalPages > 1 ? true : false,
            dialog: res.dialog,
            load: true,
          }));
        })
        .catch(() =>
          setMessages((prev) => ({ ...prev, loading: false, load: true, }))
        );
    }
  };
  useEffect(() => {
    if (data?.id) {
      onLoadChat();
    }
  }, [data?.id]);

  useEffect(() => {
    const handleMessage = (data) => {
      setPrint(false);
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
    };


    if (data?.id) {
      if (data.id == "system") {
        socket.emit("createRoom", "system/" + userId);
        socket.on("system", handleMessage);
        socket.on("report", handleMessage);

        return () => {
          socket.emit("removeRoom", "system/" + userId);
          socket.off("system", handleMessage);
          socket.off("report", handleMessage);
        };
      } else {
        socket.emit("createRoom", "message/" + data.id);
        socket.on("message", handleMessage);
        socket.on("report", handleMessage);

        return () => {
          socket.emit("removeRoom", "message/" + data.id);
          socket.off("message", handleMessage);
          socket.off("report", handleMessage);
        };
      }
    }
  }, [data?.id]);


  const onNewMessage = useCallback(
    (text) => {
      if (data?.id === "general" || id === "general") {
        createMessageGeneral({ ...data, text });
      } else {
        createMessage(data);
      }

      reset({ id: data.id ?? id });
    },
    [data, id]
  );
  const onKeyPress1 = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDialogs((prev) => ({
        ...prev,
        items: "",
      }))
      onLoadDialogs();
    }
  };
  const user = (userId == messages?.dialog?.to?.id ? messages?.dialog?.from : messages?.dialog?.to);
  return (
    <nav className='full-menu-chat'>

      <div className='full-menu-chat-block'>

        <div className='top'>
          {id ?
            <div className="d-flex mt-2 mb-2">
              <button type="button" onClick={() => { setId(false), setChatOpen(true) }} className='d-flex align-items-center return-icon ms-2 me-2 fs-15'>
                <ReturnIcon />
              </button>
              {data.id == "general" ?
                <div>
                  <h5 className="fw-7 mb-0">Общий чат</h5>
                  <p className="text-muted">
                    <span className="fw-7 mb-0">{dialogs.count} </span>
                    <span className="text-success"> Онлайн</span>
                  </p>
                </div>
                :
                data.id == "system" ?
                  <div>
                    <h5 className="fw-7 mb-0"><Logo /></h5>
                  </div>
                  :
                  <div>
                    <h5 className="fw-7 mb-0"><Link to={`/trader/${user?.id}`}>{user?.nickname}</Link></h5>
                    <p className="fs-08 gray">
                      {print ? (
                        "Печатает сообщение..."
                      ) : user?.online?.status ? (
                        <span className="text-success">Онлайн</span>
                      ) : user?.online?.end ? (
                        "Был(-а) в сети " +
                        moment(user?.online?.end).fromNow()
                      ) : (
                        "Оффлайн"
                      )}
                    </p>
                  </div>
              }
            </div>

            :
            <form action="" className='p-2 p-sm-3'>
              <input
                type="search"
                placeholder="Поиск пользователя"
                className="p-blue"
                onChange={e => setSearch(e.target.value)}
                onKeyPress={(e) => onKeyPress1(e)}
              />
            </form>
          }
          <button type='button' onClick={() => (setId(false), setChatOpen(false))}><img src={close} alt="" /></button>
        </div>

        {id ? messages.items.length > 0 ?
          <Chat
            general={data.id}
            onLoadChat={onLoadChat}
            onTask={(e) => onTask(e)}
            messages={messages}
            emptyText="Нет сообщений"
            onSubmit={(e) => onNewMessage(e)}
            onChange={(e) => setValue("text", e)}
            data={data}
            setImage={(e) => setValue("media", Array.from(e))}
          />
          :
          <Loader className="load" />
          :
          <ul id="scrollableDiv" >
            <InfiniteScroll
              useWindow={false}
              pageStart={1}
              loadMore={onLoadDialogsHash}
              hasMore={dialogs.hasMore}
              loader={<Loader className="load" />}
              getScrollParent={() => document.getElementById('scrollableDiv')}
            >
              <li>
                <div onClick={() => setId("system")} className='preview'>
                  <img src="/imgs/system.png" alt="user" className='me-3' />
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <LogoMess />
                    {dialogs?.countSystem > 0 && <div className='count'></div>}
                  </div>
                </div>
              </li>
              <li>
                <div onClick={() => setId("general")} className='general-chat'>
                  <div className="count">
                    <div class="fs-13">{dialogs.count}</div>
                    <div>online</div>
                  </div>
                  <h6>Общий чат</h6>
                </div>
              </li>
              {dialogs?.items?.length > 0 ? (
                dialogs.items.map((dialog) => (
                  <li>
                    <DialogPreviewMini {...dialog} userId={userId} setId={setId} />
                  </li>
                ))) : (
                <p className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                  В данный момент нет диалогов
                </p>
              )}
            </InfiniteScroll>
          </ul>}


      </div >
      {/* <div ref={cut} id="cut" onClick={() => setChatOpen(!chatOpen)} className={(chatOpen) ? 'opened' : ''}><img src={Arrow} alt="arrow" /></div> */}
    </nav >
  );
};

export default MenuChatOpen;