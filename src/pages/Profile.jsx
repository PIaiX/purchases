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

const Profile = () => {
  const { userId } = useParams();
  const myId = useSelector(state => state.auth?.user?.id);
  const [showAlert, setShowAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    textField.innerText = `${process.env.REACT_APP_SITE_URL} /profile/${user.id}`;
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
    setCurrentPage(page.selected + 1);
  };
  const [currentGame, setCurrentGame] = useState("")
  const onGameChange = (game) => {
    setCurrentGame(game);
  };
  useEffect(() => {
    if (currentGame) {
      setCurrentPage(1)
      getUser({ id: userId, page: currentPage, categoryId: currentGame })
        .then((res) => res && setUser({
          loading: false,
          data: res.user,
          products: res.products,
          reviews: res.reviews,
          categories: res.categories,
        }))
        .catch(() => setUser((e) => ({ ...e, loading: false })));
    }
    else {
      getUser({ id: userId, page: currentPage })
        .then((res) => res && setUser({
          loading: false,
          data: res.user,
          products: res.products,
          reviews: res.reviews,
          categories: res.categories,
        }))
        .catch(() => setUser((e) => ({ ...e, loading: false })));
    }
  }, [userId, currentPage, currentGame]);


  const {
    control: controlMessage,
    register: registerMessage,
    formState: { errors: errorsMessage, isValid: isValidMessage },
    setValue: setValueMessage,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      fromId: myId,
      toId: userId,
    },
  });

  const dataMessage = useWatch({ control: controlMessage });
  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });



  useEffect(() => {
    getMessages(dataMessage)
      .then((res) => {
        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: res.messages.items,
          dialogId: res.dialog.id
        }))
      }
      )
      .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
  }, []);
  useEffect(() => {
    setValueMessage("id", messages.dialogId);
  }, [messages.dialogId]);
  useEffect(() => {
    if (dataMessage?.id) {
      socket.emit("createRoom", "message/" + dataMessage.id);

      socket.on("message", (dataMessage) => {

        if (dataMessage) {
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: [
              dataMessage,
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
      return () => {
        socket.off("message");
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
      <section className="mb-6">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="d-flex align-items-start mb-5">
                <div className="user flex-1">
                  <div className="user-photo">
                    <img src={getImageURL(user)} alt="userphoto" />
                  </div>
                  <div className="flex-1 flex-column">
                    <div className="user-main">
                      <div className="title">
                        {user.data.nickname ?? "Никнейм"}
                      </div>
                      <div className="d-flex align-items-center">
                        <StarRating value={user?.data?.rating ?? 0} />
                        <span className="fs-13 fw-7 ms-2">
                          {user?.data?.rating ?? 0}
                        </span>
                      </div>
                      <div>
                        <p className="mt-2">
                          {user?.data?.createdAt ? moment(user.data.createdAt).fromNow(1) : ""} на платформе
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted">
                        {user?.data?.online?.status ? (
                          <span className="text-success">Онлайн</span>
                        ) : user?.data?.online?.end ? (
                          "Был(-а) в сети " +
                          moment(user?.data?.online?.end).fromNow()
                        ) : (
                          "Оффлайн"
                        )}
                      </p>
                    </div>
                  </div>

                  <ul className="user-info">
                    <li>
                      <div>
                        <TbHeartHandshake className="svg" />
                        <span>Сделок:</span>
                      </div>
                      <span>{user.data?.order ?? 0}</span>
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
                    value={`${process.env.REACT_APP_SITE_URL}/profile/${user.id}`}
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
                  <button
                    onClick={() => setShowAlert(true)}
                    type="button"
                    className="mt-4 d-flex dark-blue fs-15 ms-2 ms-xl-4"
                  >
                    <FiAlertTriangle />
                  </button>
                </div>
              </div>

              <h4>Предложения</h4>
              <div className="d-flex align-items-start">
                <div className='flex-1'>
                  <ul className='list-unstyled g-2 g-sm-4 row row-cols-sm-2 row-cols-md-3 row-cols-xxl-4'>
                    {user?.categories?.length > 0 && user.categories.map(item => (
                      <li><GameMiniCard {...item} onGameChange={onGameChange} /></li>
                    ))}
                  </ul>
                  {/* <button type='button' className='d-flex flex-column align-items-center pale-blue fs-12 mx-auto mt-4 mb-4 mb-sm-5' onClick={handleShowAll}>
                    <span>Показать все</span>
                    <FiChevronDown className='fs-13' />
                  </button> */}
                </div>
              </div>
              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top d-flex justify-content-between ms-4 me-4">
                  <div className="serv">Сервер</div>
                  <div className='descr'>Описание</div>
                  <div className='price'>Цена</div>
                </div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className="row row-cols-1 g-3">
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
            <Col className="chat-container" lg={4}>
              <h2 className="text-center">Чат с пользователем</h2>
              {!myId ? (
                <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                  Для отправки сообщений войдите в аккаунт!
                </div>
              ) : (
                <div className="p-0 fs-09">
                  <Chat
                    messages={messages}
                    emptyText="Нет сообщений"
                    onSubmit={(e) => onNewMessage(e)}
                    onChange={(e) => setValueMessage("text", e)}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
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
                defaultValue={`${process.env.REACT_APP_SITE_URL}/profile/${user.id}`}
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
                <select value={data.title} onClick={e => setValue('title', e.value)} className="mb-3">
                  <option value="">Выберите тему жалобы</option>
                  <option value="spam">Спам</option>
                  <option value="inappropriate">Неуместное содержимое</option>
                  <option value="other">Другое</option>
                </select>
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
