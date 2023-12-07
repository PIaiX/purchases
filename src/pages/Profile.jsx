import React, { useLayoutEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  FiAlertTriangle,
  FiChevronDown,
  FiEdit,
  FiMessageCircle,
  FiShare,
} from "react-icons/fi";
import { TbHeartHandshake } from "react-icons/tb";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import FeedbackLine from "../components/FeedbackLine";
import Meta from "../components/Meta";
import TraderLine from "../components/TraderLine";
import MyMessage from "../components/chat/MyMessage";
import UserMessage from "../components/chat/UserMessage";
import Joystick from "../components/svg/Joystick";
import ReturnIcon from "../components/svg/ReturnIcon";
import Loader from "../components/utils/Loader";
import StarRating from "../components/utils/StarRating";
import { getUser } from "../services/user";
import Input from "../components/utils/Input";

const Profile = () => {
  const { userId } = useParams();
  const [showShare, setShowShare] = useState(false);
  const [user, setUser] = useState({
    data: {},
    loading: true,
  });

  useLayoutEffect(() => {
    getUser(userId)
      .then((res) => res && setUser({ data: res, loading: false }))
      .catch(() => setUser((e) => ({ ...e, loading: false })));
  }, [userId]);

  if (user?.loading) {
    return <Loader full />;
  }
  console.log(user)
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
      <Meta title={user.data.nickname ?? "Профиль"} />
      <section className="mb-6">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="d-flex align-items-start mb-5">
                <div className="user flex-1">
                  <div className="user-photo">
                    <img src="/imgs/user2.jpg" alt="userphoto" />
                    <button type="button">
                      <FiEdit />
                    </button>
                  </div>
                  <div className="user-main">
                    <div className="title">
                      {user.data.nickname ?? "Никнейм"}
                    </div>
                    <div className="d-flex align-items-center">
                      <StarRating rate={user?.data?.options?.rating ?? 0} />
                      <span className="fs-13 fw-7 ms-2">
                        {user?.data?.options?.rating ?? 0}
                      </span>
                    </div>
                    <p className="mt-2">
                      {user.data.about ?? "Ничего не написано"}
                    </p>
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
                      <span>{0}</span>
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
                    onClick={setShowShare}
                    type="button"
                    className="d-flex dark-blue fs-15 ms-2 ms-xl-4"
                  >
                    <FiShare />
                  </button>
                  <button
                    type="button"
                    className="mt-4 d-flex dark-blue fs-15 ms-2 ms-xl-4"
                  >
                    <FiAlertTriangle />
                  </button>
                </div>
              </div>

              <h4>Предложения</h4>
              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top"></div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className="row row-cols-1 g-3">
                    <li>
                      <TraderLine
                        serv={"Airin + Blackbird"}
                        descr={
                          "Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R"
                        }
                        price={"186,97 ₽"}
                      />
                    </li>
                    <li>
                      <TraderLine
                        serv={"Airin + Blackbird"}
                        descr={
                          "Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R"
                        }
                        price={"186,97 ₽"}
                      />
                    </li>
                    <li>
                      <TraderLine
                        serv={"Airin + Blackbird"}
                        descr={
                          "Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R"
                        }
                        price={"186,97 ₽"}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top">
                  <h5 className="fw-6">Всего 193 отзыва</h5>
                </div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className="row row-cols-1 g-3">
                    {/* <li>
                      <FeedbackLine
                        user="Galadriel_90"
                        rate={4.1}
                        text="быстрое и качественное выполнение заказа, спасибо!"
                      />
                    </li>
                    <li>
                      <FeedbackLine
                        user="Galadriel_90"
                        rate={4.1}
                        text="быстрое и качественное выполнение заказа, спасибо!"
                      />
                    </li>
                    <li>
                      <FeedbackLine
                        user="Raccoon5"
                        rate={2.8}
                        text="Быстро и чётко,спасибо продавцу"
                      />
                    </li> */}
                  </ul>
                </div>
                <div className="list-wrapping-bottom">
                  <button
                    type="button"
                    className="mx-auto d-flex flex-column align-items-center pale-blue fs-11"
                  >
                    <span>Показать ещё</span>
                    <FiChevronDown className="fs-14" />
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <h2 className="text-center">Чат с пользователем</h2>
              <div className="sec-messages-chat">
                <Link
                  to="/account/messages"
                  className="d-flex align-items-center d-xl-none return-icon ms-4 mb-2"
                >
                  <ReturnIcon />
                </Link>
                <div className="chat-window">
                  <UserMessage
                    name={"User8name"}
                    time={"12:36"}
                    text={
                      "Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой"
                    }
                  />
                  <UserMessage
                    name={"Galadriel_90"}
                    time={"12:37"}
                    text={
                      "Другим отключают со временем. Как другу отключили. Хотелось бы на новый год такой подарок."
                    }
                  />
                  <MyMessage
                    name={"Weatherwax"}
                    time={"12:37"}
                    text={"Ребятааааа! Куплю аккаунты в доте"}
                  />
                  <UserMessage
                    name={"Galadriel_90"}
                    time={"12:37"}
                    text={
                      "Какая-то слишком глупая схема обмана Через рефералы Схема стара как жизнь"
                    }
                  />
                  <UserMessage
                    name={"User8name"}
                    time={"12:40"}
                    text={
                      "Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой"
                    }
                  />
                  <MyMessage
                    name={"Weatherwax"}
                    time={"12:37"}
                    text={"Ребятааааа! Куплю аккаунты в доте"}
                  />
                  <UserMessage
                    name={"User8name"}
                    time={"12:36"}
                    text={
                      "Куплю аккаунт в игре Marvel Future Fight с хорошей прокачкой"
                    }
                  />
                  <UserMessage
                    name={"Galadriel_90"}
                    time={"12:37"}
                    text={
                      "Другим отключают со временем. Как другу отключили. Хотелось бы на новый год такой подарок."
                    }
                  />
                </div>
                <form action="" className="chat-form">
                  <input type="text" placeholder="Ваше сообщение" />
                  <button type="submit" className="btn-1 fs-08 py-2 px-3">
                    Отправить
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showShare} onHide={setShowShare} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="mb-3">Поделитесь профилем</h4>
          <Input
            onClick={(e) => e.target.select()}
            readOnly
            defaultValue={`${process.env.REACT_APP_SITE_URL}/profile/${user.data.id}`}
          />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Profile;
