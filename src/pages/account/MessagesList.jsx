import React, { useCallback, useEffect, useState } from "react";
import DialogPreview from './DialogPreview';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  createMessage,
  getDialogs,
  getMessages,
  viewMessages,
} from "../../services/message";
import socket from "../../config/socket";
import { getImageURL } from "../../helpers/all";
import { useForm, useWatch } from "react-hook-form";
import Loader from "../../components/utils/Loader";

const MessagesList = () => {
  const { dialogId } = useParams();
  const { state } = useLocation();
  // const timer = useRef(0);
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
        getMessagesGeneral(data)
          .then((res) =>
            setMessages((prev) => ({
              ...prev,
              loading: false,
              ...res,
            }))
          )
          .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
      } else {
        getMessages(data)
          .then((res) =>
            setMessages((prev) => ({
              ...prev,
              loading: false,
              ...res,
            }))
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
                if (e?.memberId) {
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
      // socket.on("message/print/admin/" + data.id, () => {
      //   setPrint(true);
      //   if (timer.current === 0) {
      //     timer.current = 1;
      //     setTimeout(() => {
      //       timer.current = 0;
      //       setPrint(false);
      //     }, 5000);
      //   }
      // });
      return () => {
        socket.off("message");
        // socket.off("message/view/" + data.id);
        // socket.off("message/print/admin/" + data.id);
      };
    }
  }, [data?.id]);

  // useEffect(() => {
  //   if (timer.current === 0 && data?.text?.length > 0) {
  //     timer.current = 1;
  //     socket.emit("message/print", { userId: data.id });
  //     setTimeout(() => {
  //       timer.current = 0;
  //     }, 3000);
  //   }
  // }, [data?.text]);

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

  return (
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
              <DialogPreview {...dialog} />
            </li>
          ))) : (
          <p className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            В данный момент нет диалогов. . . .
          </p>
        )
        }
      </ul>
    </div>
  );
};

export default MessagesList;