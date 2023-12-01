import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import LanguageSwitcher from "./utils/LanguageSwitcher";
import { Link } from "react-router-dom";
import SecFavorites from "./SecFavorites";
import Logo from "./svg/Logo";
import { RxChevronDown } from "react-icons/rx";
import Exit from "./svg/Exit";
import { logout } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggler from "./utils/ThemeToggler";

const Header = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showAdvice, setShowAdvice] = useState(false);
  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);

  const [showFav, setShowFav] = useState(false);
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);

  return (
    <>
      <Container>
        <header>
          <div className="h-100 d-flex align-items-center justify-content-between">
            <Link to="/">
              <Logo />
            </Link>
            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle as="a">
                  <span>Информация</span>
                  <RxChevronDown className="fs-12 ms-1" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as="button"
                    onClick={handleShowFav}
                    className="d-xl-none"
                  >
                    <Link to="/">Избранное</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/">Информация</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/help">Помощь</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/rules">Правила</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/feedback">Обратная связь</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button
                type="button"
                onClick={handleShowFav}
                className="d-flex align-items-center ms-lg-4 ms-xxl-5"
              >
                <span className="d-none d-xl-inline">Избранное</span>
              </button>
            </div>
            <div className="d-none d-lg-flex align-items-center">
              <input
                type="search"
                className="d-none d-lg-flex ms-4 ms-xxl-5"
                placeholder="Поиск по описанию"
              />
              {isAuth ? (
                <>
                  <span className="ms-4">
                    <LanguageSwitcher />
                  </span>
                  <Link
                    to="/account"
                    className="profile-link ms-4 ms-xxl-5"
                  // onClick={handleShowAdvice}
                  >
                    <img src="/imgs/user.jpg" alt="user" />
                    <span>{user?.nickname}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => dispatch(logout())}
                    className="blue fs-15 ms-4"
                  >
                    <Exit />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/registration" className="ms-4">
                    Регистрация
                  </Link>
                  <Link to="/login" className="btn-1 ms-4">
                    Войти
                  </Link>
                </>
              )}
            </div>
            <ThemeToggler />
          </div>
        </header>
      </Container>

      <Modal show={showAdvice} onHide={handleCloseAdvice} size={"lg"} centered>
        <Modal.Header closeButton>
          <img
            src="/imgs/icons/warning.png"
            alt="warning"
            className="warning"
          />
        </Modal.Header>
        <Modal.Body>
          <h2 className="mb-0">Пожалуйста, войдите или зарегистрируйтесь</h2>
          <p>
            Добавлять игры в избранное могут только авторизованные пользователи.
          </p>
          <Link to="login" className="btn-3 mt-4">
            Войти
          </Link>
        </Modal.Body>
      </Modal>

      <Offcanvas
        show={showFav}
        onHide={handleCloseFav}
        placement="top"
        className="fav-modal"
      >
        <Container className="px-0">
          <Offcanvas.Body>
            <SecFavorites />
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </>
  );
};

export default Header;
