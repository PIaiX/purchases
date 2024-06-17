import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import close from '../assets/imgs/close.svg';
import socket from '../config/socket';
import DialogPreviewMini from '../pages/account/DialogPreviewMini';
import { createMessage, getDialogs, getMessages } from '../services/message';
import { updateNotification } from '../store/reducers/notificationSlice';
import Chat from './chat/Chat';
import ReturnIcon from './svg/ReturnIcon';
import Loader from './utils/Loader';

const MenuChatOpen = ({ chatOpen, setChatOpen, id, setId }) => {
  const timer = useRef(0);
  const userId = useSelector(state => state.auth?.user?.id);

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
  const onLoadDialogs = (data) => {
    dispatch(updateNotification({ message: -1 }))
    getDialogs({ page: data, search: search, size: 7 })
      .then((res) => {
        setDialogs((prev) => ({
          ...prev,
          loading: false,
          items: [...prev.items, ...res.dialogs],
          hasMore: res.dialogs.length > 6 ? true : false,
          count: res.countOnline,
        }))
      }
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    onLoadDialogs();
  }, []);

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
    setMessages((prev) => ({ ...prev, load: false }))
    getMessages({ ...data, page: chatPage, size: 10 })
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
      .catch(() => {
        setMessages((prev) => ({ ...prev, loading: false }))
      });
  };
  useEffect(() => {
    if (data?.id) {
      onLoadChat();
    }
  }, [data?.id]);

  useEffect(() => {
    const handleMessage = (data) => {

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
      socket.emit("createRoom", "message/" + data.id);
      socket.on("message", handleMessage);
      socket.on("report", handleMessage);

      return () => {
        socket.off("message", handleMessage);
        socket.off("report", handleMessage);
        socket.emit("removeRoom", "message/" + data.id);
      };
    }
  }, [data?.id]);


  const onNewMessage = useCallback(
    (text) => {
      createMessage({ ...data, text });
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
          <ul>
            <InfiniteScroll
              pageStart={1}
              loadMore={onLoadDialogs}
              hasMore={dialogs.hasMore}
              loader={<Loader className="load" />}
            >
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