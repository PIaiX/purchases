import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LuMails } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Arrow from '../assets/imgs/2arrow.svg';
import close from '../assets/imgs/close.svg';
import { getImageURL } from '../helpers/all';
import useIsMobile from '../hooks/isMobile';
import { createMessage, createMessageGeneral, getDialogs, getMessages, getMessagesGeneral } from '../services/message';
import { Badge } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './utils/Loader';
import { updateNotification } from '../store/reducers/notificationSlice';
import DialogPreview from '../pages/account/DialogPreview';
import DialogPreviewMini from '../pages/account/DialogPreviewMini';
import socket from '../config/socket';
import ReturnIcon from './svg/ReturnIcon';
import Chat from './chat/Chat';
import moment from 'moment';

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
    }
    else {
      reset();
      setMessages(() => ({ items: [], loading: true }))
    }
  }, [id]);

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
              ...prev.items,
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
      if (data?.id === "general" || id === "general") {
        createMessageGeneral({ ...data, text });
      } else {
        createMessage({ ...data, text });
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
        <InfiniteScroll
          pageStart={1}
          loadMore={onLoadDialogs}
          hasMore={dialogs.hasMore}
          loader={<Loader />}
        >
          <div className='top'>
            {id ?
              <div className="d-flex mt-2 mb-2">
                <button type="button" onClick={() => setId(false)} className='d-flex align-items-center return-icon ms-2 me-2 fs-15'>
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

          {id ?
            <Chat
              print={print}
              onTask={(e) => onTask(e)}
              account="true"
              general={data.id}
              user={user}
              messages={messages}
              emptyText="Нет сообщений"
              onSubmit={(e) => onNewMessage(e)}
              onChange={(e) => setValue("text", e)}
              data={data}
              setImage={(e) => setValue("media", Array.from(e))}
            />
            :
            <ul>
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
            </ul>}

        </InfiniteScroll>
      </div >
      {/* <div ref={cut} id="cut" onClick={() => setChatOpen(!chatOpen)} className={(chatOpen) ? 'opened' : ''}><img src={Arrow} alt="arrow" /></div> */}
    </nav >
  );
};

export default MenuChatOpen;