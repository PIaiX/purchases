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
import { declOfNum, getImageURL } from "../helpers/all";
import Chat from "../components/chat/Chat";
import { useSelector } from "react-redux";
import NavPagination from "../components/NavPagination";
import moment from "moment";

const Profile = () => {
  const { userId } = useParams();
  const myId = useSelector(state => state.auth?.user?.id);
  const [showShare, setShowShare] = useState(false);
  const [user, setUser] = useState({
    data: {},
    loading: true,
  });
  const [currentPageProducts, setCurrentPageProducts] = useState(1)
  const onPageChangeProducts = (page) => {
    setCurrentPageProducts(page.selected + 1);
  };
  const [currentPageReviews, setCurrentPageReviews] = useState(1)
  const onPageChangeReviews = (page) => {
    setCurrentPageReviews(page.selected + 1);
  };
  useLayoutEffect(() => {
    getUser(userId)
      .then((res) => res && setUser({
        loading: false,
        data: res.user,
        products: res.products,
        reviews: res.reviews,
      }))
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
                    <img src={getImageURL(user)} alt="userphoto" />
                    <button type="button">
                      <FiEdit />
                    </button>
                  </div>
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
                      <p className="fs-13 fw-7 ms-1 mt-2">
                        {user?.data?.createdAt ? moment(user.data.createdAt).fromNow(1) : ""} на платформе
                      </p>
                    </div>
                    <div>
                      <p className="text-success fs-13 fw-7 ms-0">Онлайн</p>
                    </div>
                    <p className="mt-2">
                      {user.data.about ?? ""}
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
                <div className="list-wrapping-top d-flex justify-content-between ">
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
                  <NavPagination totalPages={user?.products?.pagination?.totalPages} onPageChange={onPageChangeProducts} />
                </div>
              </div>

              <div className="list-wrapping mt-4 mt-sm-5">
                <div className="list-wrapping-top">
                  <h5 className="fw-6">Всего {user?.reviews?.pagination?.totalItems} {declOfNum(user?.reviews?.pagination?.totalItems, ['отзыв', 'отзыва', 'отзывов'])}</h5>
                </div>
                <div className="list-wrapping-main p-sm-4">
                  <ul className="row row-cols-1 g-3">
                    {user?.reviews?.items?.length > 0 && user.reviews.items.map(item => (
                      <li>
                        <FeedbackLine {...item} />
                      </li>
                    ))}
                  </ul>
                  <NavPagination totalPages={user?.reviews?.pagination?.totalPages} onPageChange={onPageChangeProducts} />
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <h2 className="text-center">Чат с пользователем</h2>
              {!myId ? (
                <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                  Для отправки сообщений войдите в аккаунт!
                </div>
              ) : (
                <div className="p-0 fs-09">
                  <Chat toId={user?.data?.id} />
                </div>
              )}
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
    </main >
  );
};

export default Profile;
