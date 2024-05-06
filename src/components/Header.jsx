import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RxChevronDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { logout } from "../services/auth";
import { getFavorites, toggleFavorite } from "../services/favorite";
import { getSearch } from "../services/search";
import SecFavorites from "./SecFavorites";
import Exit from "./svg/Exit";
import Logo from "./svg/Logo";
import ThemeToggler from "./utils/ThemeToggler";
import GameCard from "./GameCard";
import useIsMobile from '../hooks/isMobile';
import Plaix from './svg/Plaix';
import PLaixIcon from './svg/PLaixIcon';
import { RxCross1 } from "react-icons/rx";
import SupportIcon from './svg/SupportIcon';
import MenuIcon from './svg/MenuIcon';
import Joystick from '../assets/imgs/joystick.svg';
import ChatIcon from './svg/ChatIcon';
import HeartIcon from './svg/HeartIcon';
import SearchIcon from './svg/SearchIcon';
import { getImageURL } from "../helpers/all";

const Header = () => {
  const userId = useSelector(state => state.auth?.user?.id);
  const { isAuth, user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorite.items);
  // const unreadCount = useSelector((state) => state.notification.message);
  const dispatch = useDispatch();
  const [showAdvice, setShowAdvice] = useState(false);
  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);

  const isMobileLG = useIsMobile('991px');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showFav, setShowFav] = useState(false);
  const handleCloseFav = () => {
    setShowFav(false);
  }
  const handleShowFav = () => {
    setShowFav(!showFav);
    setShowSearch(false);
    setSearchTerm("");
    setShowMobileMenu(false);
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

  return (
    <>
      <header className="header" onClick={() => { setShowSearch(false), setSearchTerm(""), showFav == true && setShowFav(false); }}>
        <Container className="h-100">
          <div className="h-100 w-100 d-flex align-items-center justify-content-between">
            <Link to="/">
              <Logo />
            </Link>

            <input
              type="search"
              className="d-none d-lg-flex ms-4 ms-xxl-5 w-50"
              placeholder="Поиск по описанию"
              onChange={(event) => {
                handleSearchChange(event);
              }}
            />

            <ThemeToggler />
          </div>
        </Container>
      </header>

      {
        isMobileLG
        && <footer>
          <Container className='h-100'>
            <nav className='nav-mobile'>
              <Link to='/' onClick={() => setShowMobileMenu(false)} className='logo'>
                <img src={Joystick} alt="Joystick" />
              </Link>
              <ul>
                <li><button type="button" onClick={handleShowSearch}><SearchIcon /></button></li>
                <li><button type="button" onClick={handleShowFav}><HeartIcon /></button></li>
                <li><NavLink to='/account' end onClick={() => setShowMobileMenu(false)}><SupportIcon /></NavLink></li>
                <li><NavLink to='/account/messages' end onClick={() => setShowMobileMenu(false)}><ChatIcon /></NavLink></li>
                <li><button type='button' onClick={() => setShowMobileMenu(true)}><MenuIcon /></button></li>
              </ul>
            </nav>
          </Container>
        </footer>
      }

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

      {/* Favorites */}
      <Offcanvas
        show={showFav}
        scroll={true}
        onHide={handleCloseFav}
        onClick={handleCloseFav}
        onEscapeKeyDown={handleCloseFav}
        placement={isMobileLG ? "bottom" : "top"}
      >
        <Container className="px-0">
          <Offcanvas.Body>
            <SecFavorites favorites={favorites} onFav={onFav} />
          </Offcanvas.Body>
        </Container>
      </Offcanvas>

      {/* Search */}
      <Offcanvas
        show={showSearch}
        onHide={handleCloseSearch}
        onEscapeKeyDown={handleCloseSearch}
        placement={isMobileLG ? "bottom" : "top"}
        autoFocus={false}
        scroll={true}
      >
        <Container className="px-0">
          <Offcanvas.Body>
            <input
              type="search"
              className="d-lg-none mb-3"
              placeholder="Поиск по описанию"
              onChange={(event) => {
                handleSearchChange(event);
              }}
            />
            <section className='sec-favorites px-3'>
              {games.items.length > 0 ?
                <ul className="list-unstyled gy-3 gx-3 gx-xl-5 row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                  <GameCard param2={games.items} term={searchTerm} onSearch={() => { handleCloseSearch() }} />
                </ul>
                :
                <h5 className="text-center">Мы не смогли найти такую игру</h5>
              }
            </section>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>

      {/* Mobile Menu */}
      <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)} placement='end'>
        <Offcanvas.Body>
          <button type='button' className='close' onClick={() => setShowMobileMenu(false)}>
            <RxCross1 />
          </button>
          <div className='text-center title-font fs-20 mb-4'>LOGO-RUSH2PLAY</div>
          <ul className="offcanvas-mobile-menu" onClick={() => setShowMobileMenu(false)}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/blog">Новости</Link>
            </li>
            <li>
              <Link to="/help">Помощь</Link>
            </li>
            <li>
              <Link to="/privacy">Политика конфиденциальности</Link>
            </li>
            <li>
              <Link to="/cookie">Политика cookie</Link>
            </li>
            <li>
              <Link to="/rules">Правила</Link>
            </li>
          </ul>
          <div className='sec-promo mb-5'>
            <div className='text'>
              <h1 className='mb-0'>Играй в свое <br className='d-sm-none' />удовольствие</h1>
            </div>
            <img src="/imgs/head.png" alt="head" />
          </div>
          <a href="/" className='dev-link mx-auto'>
            <PLaixIcon />
            <span className='mx-2'>Создано в</span>
            <Plaix />
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
