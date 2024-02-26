import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Chat from "../../components/chat/Chat";
import Loader from "../../components/utils/Loader";
import socket from "../../config/socket";
import {
  createMessage,
  createMessageGeneral,
  getMessages,
  getMessagesGeneral
} from "../../services/message";
import { createTask } from '../../services/task';
import { NotificationManager } from "react-notifications";
import ReturnIcon from '../../components/svg/ReturnIcon';


const MessagesDialogue = () => {
  const { dialogId } = useParams();
  const { state } = useLocation();

  const timer = useRef(0);
  const userId = useSelector((state) => state.auth?.user?.id);

  const navigate = useNavigate();

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: state?.dialogId ?? dialogId,
    },
  });

  const data = useWatch({ control });

  const [print, setPrint] = useState(false);


  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });


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
              dialog: res.dialog,
              dialog: res.dialog,
            }));
          })
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
      // socket.on("message/print/" + data.id, () => {
      //   setPrint(true);
      //   if (timer.current === 0) {
      //     timer.current = 1;
      //     setTimeout(() => {
      //       timer.current = 0;
      //       setPrint(false);
      //     }, 5000);
      //     return () => clearTimeout(timer.current);
      //   }
      // });
      socket.on("report", (data) => {
        if (data) {
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
      return () => {
        socket.off("message");
        socket.off("report");
        // socket.off("message/print/" + data.id);
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
        createMessage(data);
      }

      reset({ id: data.id ?? dialogId });
    },
    [data, state, dialogId]
  );
  const user =
    userId == messages?.dialog?.to?.id
      ? messages?.dialog?.from
      : messages?.dialog?.to;

  const onTask = useCallback(() => {
    createTask({ type: "report", userId: user.id })
      .then(() => {
        NotificationManager.success("Жалоба отправлена");

      })
      .catch((err) => {
        NotificationManager.error(
          err?.response?.data?.error ?? "Ошибка при отправке"
        );
      });
  }, [user]);
  if (messages.loading) {
    return <Loader full />;
  }
  return (
    <section className="">
      <Meta title="Сообщения" />
      <div className="d-flex">
        <button type="button" onClick={() => navigate(-1)} className='d-flex align-items-center return-icon me-4 mb-2'>
            <ReturnIcon />
        </button>
        <h5>{
            (user)
            ? user.nickname
            : "Общий чат"
        }</h5>
      </div>
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

    </section>
  );
};

export default MessagesDialogue;