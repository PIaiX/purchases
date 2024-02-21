import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RxChevronDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { logout } from "../services/auth";
import { getFavorites, toggleFavorite } from "../services/favorite";
import { getSearch } from "../services/search";
import SecFavorites from "./SecFavorites";
import Exit from "./svg/Exit";
import Logo from "./svg/Logo";
import ThemeToggler from "./utils/ThemeToggler";
import GameCard from "./GameCard";

const Header = () => {
  const userId = useSelector(state => state.auth?.user?.id);
  const { isAuth, user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorite.items);
  // const unreadCount = useSelector((state) => state.notification.message);
  const dispatch = useDispatch();
  const [showAdvice, setShowAdvice] = useState(false);
  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);

  const [showFav, setShowFav] = useState(false);
  const handleCloseFav = () => {
    setShowFav(false);
  }
  const handleShowFav = () => {
    setShowFav(!showFav);
    setShowSearch(false)
    setSearchTerm("")
  }

  const [showSearch, setShowSearch] = useState(false);
  const handleCloseSearch = () => { setShowSearch(false), setSearchTerm(""), setShowFav(false); };
  const handleShowSearch = () => setShowSearch(true);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 900);

  const [games, setGames] = useState({ items: [], loading: true });;
  useEffect(() => {
    if (!searchTerm) {
      handleCloseSearch();
    }
  }, [searchTerm]);
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 0) {
      getSearch(debouncedSearchTerm)
        .then((res) => {
          setGames(prev => ({
            ...prev,
            items: res,
            loading: false
          }));
        })
        .catch(() => setGames((prev) => ({ ...prev, loading: false })));
      handleShowSearch();
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (showFav) {
      dispatch(getFavorites());
    }
  }, [showFav]);
  const onFav = useCallback((e) => {
    dispatch(toggleFavorite({ categoryId: e, }));
    dispatch(getFavorites());
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(games.items)

  return (
    <>
      <header className="header" onClick={() => { setShowSearch(false), setSearchTerm(""), showFav == true && setShowFav(false); }}>
        <Container className="h-100">
          <div className="h-100 w-100 d-flex align-items-center justify-content-between">
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
                  {userId &&
                    <Dropdown.Item
                      as="button"
                      onClick={handleShowFav}
                      className="d-xl-none"
                    >
                      <Link to="/">Избранное</Link>
                    </Dropdown.Item>
                  }
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
                onClick={(isAuth) ? handleShowFav : handleShowAdvice}
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
                onChange={(event) => {
                  handleSearchChange(event);
                }}
              />
              {isAuth ? (
                <>
                  {/* <span className="ms-4">
                    <LanguageSwitcher />
                  </span> */}
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
        </Container>
      </header>


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
          <Link to="login" className="btn-3 mt-4" onClick={handleCloseAdvice}>
            Войти
          </Link>
        </Modal.Body>
      </Modal>

      <Offcanvas
        show={showFav}
        scroll={true}
        onHide={handleCloseFav}
        onClick={handleCloseFav}
        onEscapeKeyDown={handleCloseFav}
        placement="top"
        className="fav-modal"
      >
        <Container className="px-0">
          <Offcanvas.Body>
            <SecFavorites favorites={favorites} onFav={onFav} />
          </Offcanvas.Body>
        </Container>
      </Offcanvas>

      <Offcanvas
        show={showSearch}
        onHide={handleCloseSearch}
        onEscapeKeyDown={handleCloseSearch}
        placement="top"
        autoFocus={false}
        className="fav-modal"
        scroll={true}
      >
        <Offcanvas.Body className="p-0">
          <Container className="px-0">
            <section className='sec-favorites'>
              {games.items.length > 0 ?
                <ul className="list-unstyled gy-3 gx-3 gx-xl-5 row row-cols-lg-4 row-cols-md-3 row-cols-2">
                  <GameCard param2={games.items} term={searchTerm} onSearch={() => { handleCloseSearch() }} />
                </ul>
                :
                <h5 className="text-center">Мы не смогли найти такую игру</h5>
              }
            </section>
          </Container>
        </Offcanvas.Body>
      </Offcanvas >
    </>
  );
};

export default Header;
