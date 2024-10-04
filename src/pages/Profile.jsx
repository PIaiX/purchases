import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import {
  FiAlertTriangle,
  FiCheck,
  FiMessageCircle,
  FiShare
} from "react-icons/fi";
import { TbHeartHandshake } from "react-icons/tb";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FeedbackLine from "../components/FeedbackLine";
import GameMiniCard from "../components/GameMiniCard";
import Meta from "../components/Meta";
import NavPagination from "../components/NavPagination";
import TraderLine from "../components/TraderLine";
import Chat from "../components/chat/Chat";
import Joystick from "../components/svg/Joystick";
import Input from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import StarRating from "../components/utils/StarRating";
import Textarea from "../components/utils/Textarea";
import socket from "../config/socket";
import { declOfNum, getImageURL } from "../helpers/all";
import { createMessage, getMessages } from "../services/message";
import { getUser } from "../services/user";
import useIsMobile from "../hooks/isMobile";
import Select from "../components/utils/Select";
import { titles } from "../helpers/titles";

const Profile = () => {
  const { userId } = useParams();
  const myId = useSelector(state => state.auth?.user?.id);
  const [showAlert, setShowAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMobileXL = useIsMobile('1400px');
  const [scrollOff, setScrollOff] = useState(isMobileXL ? true : false);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: userId,
  });
  const data = useWatch({ control });
  const handleSubmitComplaint = () => {
    setSubmitted(true);
  };
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = `${process.env.REACT_APP_SITE_URL} /trader/${user.id}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
  };
  const handleClose = () => {
    setShowShare(false);
    setCopied(false);
  };
  const [user, setUser] = useState({
    data: {},
    loading: true,
  });
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    onLoadCurrentPage(page.selected + 1)
  };
  const [currentGame, setCurrentGame] = useState("")
  const onGameChange = (game) => {
    onLoadPage(game);
  };

  const onLoadPage = (curGame) => {
    getUser({ id: userId, page: 1, categoryId: curGame })
      .then((res) => {
        setUser({
          loading: false,
          data: res.user,
          products: res.products,
          reviews: res.reviews,
          categories: res.categories,
        })
        setCurrentGame(curGame ? curGame : res.categories && res.categories[0].id);
      })

      .catch(() => setUser((e) => ({ ...e, loading: false })));
  };
  useEffect(() => {
    onLoadPage();
  }, [userId]);
  const onLoadCurrentPage = (page) => {
    getUser({ id: userId, page: page, categoryId: currentGame })
      .then((res) => {
        setUser({
          loading: false,
          data: res.user,
          products: res.products,
          reviews: res.reviews,
          categories: res.categories,
        })
        setCurrentPage(page);
      })

      .catch(() => setUser((e) => ({ ...e, loading: false })));
  };


  const {
    reset: resetMessage,
    control: controlMessage,
    register: registerMessage,
    formState: { errors: errorsMessage, isValid: isValidMessage },
    setValue: setValueMessage,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });

  const dataMessage = useWatch({ control: controlMessage });
  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });


  const onLoadChat = (chatPage) => {
    setMessages((prev) => ({ ...prev, load: false }))
    getMessages({ ...dataMessage, page: chatPage, size: 50 })
      .then((res) => {
        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: [...messages.items, ...res.messages.items],
          hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : res.messages.pagination.totalPages > 1 ? true : false,
          dialog: res.dialog,
          load: true,
        }));
        setValueMessage("id", res.dialog.id);
      })
      .catch(() => {
        setMessages((prev) => ({ ...prev, loading: false, load: true, }))
      });
  };
  useEffect(() => {
    if (userId != myId) {
      resetMessage({
        fromId: myId,
        toId: userId,
      })
      setMessages(() => ({ items: [], loading: true }))
    }
  }, [userId]);
  useEffect(() => {
    if (dataMessage.toId) {
      onLoadChat();
    }
  }, [dataMessage.toId]);
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

    if (dataMessage?.id) {
      socket.emit("createRoom", "message/" + dataMessage.id);
      socket.on("message", handleMessage);
      socket.on("report", handleMessage);

      return () => {
        socket.off("message", handleMessage);
        socket.off("report", handleMessage);
        socket.emit("removeRoom", "message/" + dataMessage.id);
      };
    }
  }, [dataMessage?.id]);


  const onNewMessage = useCallback(
    (text) => {
      createMessage({ ...dataMessage, text });
    },
    [dataMessage]
  );

  if (user?.loading) {
    return <Loader full />;
  }
  if (user && user.data.status === 0) {
    return (
      <main className="d-flex justify-content-center flex-column align-items-center">
        <Container>
          <section className="sec-registration d-flex justify-content-center flex-column align-items-center mb-6">
            <img src="/imgs/icons/warning.png" className="mb-4" />
            <h1 className="h2 text-center mb-3">Пользователь заблокирован</h1>
            <p className="text-muted">
              Пользователь заблокирован или удален по причине нарушения правил
              сайта
            </p>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Meta title={user?.data?.nickname ?? "Профиль"} />
      <section className="mb-6 ps-3 pe-3">
        <Row className="trader">
          <Col xxl={userId != myId ? 7 : 12}>
            <div className="d-flex align-items-start mb-5">
              <div className="user">
                <div className="user-photo-1">
                  <img src={getImageURL({ path: user.data.media, type: "user", size: "mini", })} alt="userphoto" />
                </div>
                <div className="flex-1 flex-column">
                  <div>
                    <div className="user-main-1">
                      <div className="title">
                        {user.data.nickname ?? "Никнейм"}
                      </div>
                      <div className="d-flex align-items-center">
                        <StarRating value={user?.data?.rating ?? 0} />
                        <span className="fs-13 fw-7 ms-2">
                          {user?.data?.rating != null ? parseFloat(user?.data?.rating).toFixed(1) : "0.0"}
                        </span>
                      </div>
                      <div>
                        <p className="mt-2">
                          {user?.data?.createdAt ? moment(user.data.createdAt).fromNow(1) : ""} на платформе
                        </p>
                      </div>

                    </div>
                    <div className="status">

                      {user?.data?.online?.status ? (
                        <span className="online">online</span>
                      ) : user?.data?.online?.end ? (
                        <p className="was">Offline {moment(user?.data?.online?.end).fromNow(true)}</p>
                      ) : (
                        <p className="offline">offline</p>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="user-info">
                  <li>
                    <div>
                      <TbHeartHandshake className="svg" />
                      <span>Сделок:</span>
                    </div>
                    <span>{user.data?.orderSale ?? 0}</span>
                  </li>
                  <li>
                    <div>
                      <Joystick className="path" />
                      <span>Лотов:</span>
                    </div>
                    <span>{user?.data?.product ?? 0}</span>
                  </li>
                  <li>
                    <div>
                      <FiMessageCircle className="svg" />
                      <span>Отзывов:</span>
                    </div>
                    <span>{user.data?.review ?? 0}</span>
                  </li>
                </ul>
                <QRCode
                  className="qr-code ms-3 ms-xl-5"
                  size={100}
                  value={`${process.env.REACT_APP_SITE_URL}/trader/${user.data.id}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div>
                <button
                  onClick={() => setShowShare(true)}
                  type="button"
                  className="d-flex dark-blue fs-15 ms-2 ms-xl-4"
                >
                  <FiShare />
                </button>
                {userId != myId &&
                  <button
                    onClick={() => setShowAlert(true)}
                    type="button"
                    className="mt-4 d-flex dark-blue fs-15 ms-2 ms-xl-4"
                  >
                    <FiAlertTriangle />
                  </button>
                }
              </div>
            </div>

            <h4>Предложения</h4>
            <div className="d-flex align-items-start">
              <div className='flex-1'>
                <ul className='list-unstyled g-2 g-sm-4 row row-cols-sm-2 row-cols-md-3 row-cols-xxl-4'>
                  {user?.categories?.length > 0 && user.categories.map(item => (
                    <li><GameMiniCard {...item} onGameChange={onGameChange} currentGame={currentGame} /></li>
                  ))}
                </ul>
                {/* <button type='button' className='d-flex flex-column align-items-center pale-blue fs-12 mx-auto mt-4 mb-4 mb-sm-5' onClick={handleShowAll}>
                    <span>Показать все</span>
                    <FiChevronDown className='fs-13' />
                  </button> */}
              </div>
            </div>
            <div className="list-wrapping mt-4 mt-sm-5">
              <div className="list-wrapping-top">
                <ul className='line-1'>
                  <li className='category'>Категория</li>
                  <li className="server">Сервер</li>
                  <li className='title'>Название</li>
                  <li className='count'>Кол-во</li>
                  <li className='price'>Цена</li>
                </ul>
              </div>
              <div className="list-wrapping-main p-sm-4">
                <ul className="row row-cols-1 g-3 mb-4">
                  {user?.products?.items?.length > 0 && user.products.items.map(item => (
                    <li>
                      <TraderLine {...item} />
                    </li>
                  ))}
                </ul>
                <NavPagination totalPages={user?.products?.pagination?.totalPages} onPageChange={onPageChange} />
              </div>
            </div>

            <div className="list-wrapping mt-4 mt-sm-5">
              <div className="list-wrapping-top">
                <h5 className="fw-6">Всего {user?.data?.review} {declOfNum(user?.data?.review, ['отзыв', 'отзыва', 'отзывов'])}</h5>
              </div>
              <div className="list-wrapping-main p-sm-4">
                <ul className="row row-cols-1 g-3">
                  {user?.reviews?.length > 0 && user.reviews.map(item => (
                    <li>
                      <FeedbackLine {...item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          {userId != myId &&
            <Col xxl={4} className="chat-container">
              <h2 className="text-center">Чат с пользователем</h2>
              {!myId ? (
                <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                  Для отправки сообщений войдите в аккаунт!
                </div>
              ) : (
                <div className="p-0 fs-09">
                  <Chat
                    onLoadChat={onLoadChat}
                    setScrollOff={setScrollOff}
                    scrollOff={scrollOff}
                    messages={messages}
                    emptyText="Нет сообщений"
                    onSubmit={(e) => onNewMessage(e)}
                    onChange={(e) => setValueMessage("text", e)}
                  />
                </div>
              )}
            </Col>
          }
        </Row>
      </section>
      <Modal show={showShare} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="mb-3">Поделитесь профилем</h4>
          {copied ? (
            <div className="mb-3 text-success">
              <FiCheck /> Ссылка скопирована!
            </div>
          ) : (
            <div>
              <Input
                onClick={(e) => e.target.select()}
                readOnly
                defaultValue={`${process.env.REACT_APP_SITE_URL}/trader/${user.data.id}`}
              />
              <Button onClick={handleCopyLink} className="mt-3">Скопировать ссылку</Button>
            </div>
          )
          }
        </Modal.Body>
      </Modal>
      <Modal show={showAlert} onHide={handleCloseAlert} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="mb-3">Пожаловаться</h4>
          {!submitted ? (
            <div>
              <div className="mb-4">
                <div className="mb-4">
                  <Select
                    value={data.title}
                    title="Выберите тему жалобы"
                    label="Тема"
                    onClick={e => { setValue(e.value) }}
                    data={titles}
                  />
                </div>
                <Textarea
                  className="col-md-6"
                  type={"text"}
                  label={"Описание"}
                  onChange={e => setValue("text", e)}
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button onClick={handleSubmit(handleSubmitComplaint)} className="mr-3">Отправить жалобу</Button>
                <Button onClick={handleCloseAlert} className="mr-3">Закрыть</Button>
              </div>
            </div>
          ) : (
            <div className="mb-3 text-success">
              Жалоба отправлена!
            </div>
          )}
        </Modal.Body>
      </Modal>
    </main >
  );
};

export default Profile;
