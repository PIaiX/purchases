import moment from "moment";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { IoChevronForwardOutline, IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Chat from "../../components/chat/Chat1";
import Meta from "../../components/Meta";
import Loader from "../../components/utils/Loader";
import socket from "../../config/socket";
import {
  createMessage,
  createMessageGeneral,
  getDialogs,
  getMessages,
  getMessagesGeneral,
  viewMessages,
} from "../../services/message";
import DialogPreview from "./DialogPreview";

const DialogItem = memo(({ item, active }) => {
  return (
    <Link
      to={"/dialogs/" + item.id}
      state={{ dialogId: item.id }}
      className={"dialog d-block py-2" + (item.id == active ? " active" : "")}
    >
      <Row className="m-0 align-items-center">
        <Col md={3} xxl={2} className="pe-0">
          <img src="/images/avatar.png" width={40} />
        </Col>
        <Col md={9} xxl={10}>
          <div className="d-flex justify-content-between aling-items-center">
            <div>
              <b className="fs-09 d-flex align-items-center">
                {item?.from?.firstName
                  ? item.from.firstName
                  : item.from.nickname}{" "}
                с {item?.to?.firstName ? item.to.firstName : item.to.nickname}
                {/* {item?.user?.online?.status && (
                  <div className="online ms-2 mt-1 align-self-center" />
                )} */}
              </b>
            </div>
            <div className="fs-07 text-muted d-flex align-items-center justify-content-end">
              {moment(item.message.createdAt).format("kk:mm")}
            </div>
          </div>
          <div className="d-flex justify-content-between aling-items-center">
            <p className="d-block text-nowrap text-muted fs-08">
              {item?.message?.text ?? "Нет сообщений"}
            </p>
            {/* {!item.memberId && !item.view && (
              <div className="dialog-new align-self-center" />
            )} */}
          </div>
        </Col>
      </Row>
    </Link>
  );
});



const Dialogs = () => {
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
          items: res,
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
    <>
      <Meta title="Диалоги" />
      <Card className="mb-3 dialog">
        <Row className="m-0">
          <Col
            md={3}
            className="p-0 list chat-container position-relative border-right"
          >
            <div className="bg-white py-3 px-0 position-sticky top-0">
              <h5 className="fw-7 px-3 d-flex justify-content-between align-items-center">
                Диалоги{" "}
                <Badge bg="secondary">{dialogs.items.length ?? 0}</Badge>
              </h5>
            </div>
            <Link
              to="/dialogs/general"
              state={{ dialogId: "general" }}
              className="dialog d-block py-2"
            >
              <Row className="m-0 align-items-center">
                <Col md={3} xxl={2} className="pe-0">
                  <img src="/images/general-chat.svg" width={40} />
                </Col>
                <Col md={9} xxl={10}>
                  <div className="d-flex justify-content-between aling-items-center">
                    <div>
                      <b className="fs-09 d-flex align-items-center">
                        Общий чат
                        {/* {item?.user?.online?.status && (
                  <div className="online ms-2 mt-1 align-self-center" />
                )} */}
                      </b>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between aling-items-center">
                    <p className="d-block text-nowrap text-muted fs-08">
                      Чат со всеми пользователями
                    </p>
                    {/* {!item.memberId && !item.view && (
              <div className="dialog-new align-self-center" />
            )} */}
                  </div>
                </Col>
              </Row>
            </Link>
            {dialogs?.items?.length > 0 && dialogs.items.map((item) => (
              <DialogPreview item={item} />
            ))}
          </Col>
          <Col className="p-0 chat-container">
            <div className="p-3 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-7 mb-0">Чат</h5>
                {messages?.user && (
                  <p className="text-muted fs-07">
                    {print ? (
                      "Печатает сообщение..."
                    ) : messages?.user?.online?.status ? (
                      <span className="text-success">Онлайн</span>
                    ) : messages?.user?.online?.end ? (
                      "Был(-а) в сети " +
                      moment(messages?.user?.online?.end).fromNow()
                    ) : (
                      "Оффлайн"
                    )}
                  </p>
                )}
              </div>
              <div>
                <IoEllipsisVertical size={22} />
              </div>
            </div>
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
                <Chat
                  data={messages.items}
                  emptyText="Нет сообщений"
                  onSubmit={(e) => onNewMessage(e)}
                  onChange={(e) => setValue("text", e)}
                />
              )}
            </div>
          </Col>
          {messages?.user && (
            <Col
              md={3}
              className="p-0 list chat-container position-relative border-left"
            >
              <div className="bg-white border-bottom py-3 px-3 position-sticky top-0">
                <div className="d-flex align-items-center mb-3 justify-content-between">
                  <div>
                    <p className="mb-1">
                      {messages?.user?.status ? (
                        <Badge className="badge-small" bg="success">
                          Активный
                        </Badge>
                      ) : (
                        <Badge className="badge-small" bg="danger">
                          Не подтвержден
                        </Badge>
                      )}
                    </p>
                    <h5>{messages?.user?.firstName ?? "Клиент"}</h5>
                  </div>
                  <div>
                    <Link
                      to={"/user/" + messages.user.id}
                      className="btn btn-light"
                    >
                      <IoChevronForwardOutline size={18} />
                    </Link>
                  </div>
                </div>
                <p className="fs-08 mb-1">
                  <span className="text-muted">id:</span>{" "}
                  <b>{messages?.user?.id}</b>
                </p>
                {messages?.user?.email && (
                  <p className="fs-08 mb-1">
                    <span className="text-muted">Email:</span>{" "}
                    <b>{messages.user.email}</b>
                  </p>
                )}
                {messages?.user?.phone && (
                  <p className="fs-08 mb-1">
                    <span className="text-muted">Телефон:</span>{" "}
                    <b>{messages.user.phone}</b>
                  </p>
                )}
                {messages?.user?.birthday && (
                  <p className="fs-08 mb-1">
                    <span className="text-muted">День рождения:</span>{" "}
                    <b>{moment(messages.user.birthday).calendar()}</b>
                  </p>
                )}
                {messages?.user?.sex && (
                  <p className="fs-08 mb-1">
                    <span className="text-muted">Пол:</span>{" "}
                    <b>{messages.user.sex == "man" ? "Мужской" : "Женский"}</b>
                  </p>
                )}
              </div>

            </Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default Dialogs;
