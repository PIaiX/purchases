import moment from "moment";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { IoChevronForwardOutline, IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Chat from "../../components/chat";
import Meta from "../../components/Meta";
import Loader from "../../components/UI/Loader";
import socket from "../../config/socket";
import { deliveryData, paymentData } from "../../helpers/order";
import {
  createMessage,
  getDialogs,
  getMessages,
  viewMessages,
} from "../../services/message";

const DialogItem = memo(({ item, active }) => {
  return (
    <Link
      to={"/dialogs/" + item.adminId}
      state={{ adminId: item.adminId }}
      className={
        "dialog d-block py-2" + (item.adminId == active ? " active" : "")
      }
    >
      <Row className="m-0 align-items-center">
        <Col md={3} xxl={2} className="pe-0">
          <img src="/images/avatar.png" width={40} />
        </Col>
        <Col md={9} xxl={10}>
          <div className="d-flex justify-content-between aling-items-center">
            <div>
              <b className="fs-09 d-flex align-items-center">
                {item?.user?.firstName?.length > 0
                  ? item.user.firstName
                  : item?.user?.email?.length > 0
                  ? item.user.email
                  : item?.user?.phone?.length > 0
                  ? item.user.phone
                  : "Клиент"}
                {item?.user?.online?.status && (
                  <div className="online ms-2 mt-1 align-self-center" />
                )}
              </b>
            </div>
            <div className="fs-07 text-muted d-flex align-items-center justify-content-end">
              {moment(item.createdAt).format("kk:mm")}
            </div>
          </div>
          <div className="d-flex justify-content-between aling-items-center">
            <p className="d-block text-nowrap text-muted fs-08">{item.text}</p>
            {!item.memberId && !item.view && (
              <div className="dialog-new align-self-center" />
            )}
          </div>
        </Col>
      </Row>
    </Link>
  );
});

const OrderItem = memo((item) => {
  return (
    <Link
      to={"/order/" + item.id}
      className="dialog-order d-block p-2 px-3 border-top"
    >
      <div className="d-flex justify-content-between aling-items-center">
        <div>
          <b className="fs-09">
            {moment(item.createdAt).format("DD.MM.YYYY kk:mm")}
          </b>
        </div>
        <div className="fs-07 text-muted d-flex align-items-center justify-content-end">
          {item?.statuses[0]?.status?.name ?? "Нет статуса"}
        </div>
      </div>
      <div className="d-flex justify-content-between aling-items-center">
        <div>
          <p className="d-block text-nowrap text-muted fs-08">
            id {item.id} - {paymentData(item.payment).text} -{" "}
            {deliveryData(item.delivery).text}
          </p>
          {item.delivery == "delivery" && (
            <p className="d-block text-nowrap text-muted fs-08">
              {item.street} {item.home}
            </p>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <IoChevronForwardOutline color="#999" size={20} />
        </div>
      </div>
    </Link>
  );
});

const Dialogs = () => {
  const brand = useSelector((state) => state.brand.active);
  const { adminId } = useParams();
  const { state } = useLocation();
  const timer = useRef(0);
  const message = useSelector((state) => state.notification.message);

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      adminId: state?.adminId ?? adminId,
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
          ...res,
        }))
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    onLoadDialogs();
  }, [message, brand]);

  useEffect(
    () =>
      (state?.adminId || adminId) &&
      setValue("adminId", state?.adminId ?? adminId),
    [state?.adminId, adminId]
  );

  useEffect(() => {
    if (data?.adminId) {
      viewMessages(data);
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
  }, [data?.adminId, brand]);

  useEffect(() => {
    if (data?.adminId) {
      socket.on("message/user/" + data.adminId, (data) => {
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
      socket.on("message/view/" + data.adminId, (data) => {
        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: prev.items.map((e) => {
            if (e?.memberId && data == "client") {
              e.view = true;
            }
            return e;
          }),
        }));
      });
      socket.on("message/online/" + data.adminId, (online) => {
        setMessages((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            online,
          },
        }));
        onLoadDialogs();
      });
      socket.on("message/print/admin/" + data.adminId, () => {
        setPrint(true);
        if (timer.current === 0) {
          timer.current = 1;
          setTimeout(() => {
            timer.current = 0;
            setPrint(false);
          }, 5000);
        }
      });
      return () => {
        socket.off("message/user/" + data.adminId);
        socket.off("message/view/" + data.adminId);
        socket.off("message/print/admin/" + data.adminId);
      };
    }
  }, [data?.adminId, brand]);

  useEffect(() => {
    if (timer.current === 0 && data?.text?.length > 0) {
      timer.current = 1;
      socket.emit("message/print", { adminId: data.adminId });
      setTimeout(() => {
        timer.current = 0;
      }, 3000);
    }
  }, [data?.text]);

  const onNewMessage = useCallback(
    (text) => {
      createMessage({ ...data, text });
      reset({ adminId: data.adminId });
    },
    [data, state, adminId]
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

            {dialogs.items.map((item) => (
              <DialogItem item={item} active={data?.adminId} />
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
              {!data?.adminId ? (
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
              <h5 className="fw-7 p-3 pb-3 d-flex justify-content-between align-items-center">
                Заказы
                <Badge bg="secondary">{messages?.order?.length ?? 0}</Badge>
              </h5>

              {messages?.order?.length > 0 &&
                messages.order.map((item) => <OrderItem {...item} />)}
            </Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default Dialogs;
