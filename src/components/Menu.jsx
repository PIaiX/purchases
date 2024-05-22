import React, { useRef, useState } from 'react';
import { FiList, FiMessageCircle, FiSettings, FiUser } from 'react-icons/fi';
import { LuCoins, LuFileClock, LuLogOut, LuMails, LuSettings } from "react-icons/lu";
import { RiHistoryLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { customPrice, getImageURL } from '../helpers/all';
import useIsMobile from '../hooks/isMobile';
import HeadPhones from './svg/HeadPhones';
import StarIcon from './svg/StarIcon';
import Key from './svg/Key';
import { logout } from '../services/auth';
import Arrow from './svg/Arrow';

const Menu = ({ full, setFull }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const cut = useRef(null);
  const dispatch = useDispatch();
  return (
    <nav className='menu-nav'>
      <div className={(full) ? 'scroll full' : 'wrap'}>
        <div className={(full) ? 'wrap full' : 'wrap'}>
          {isAuth ?
            <>
              <div className='menu-nav-top'>
                <div className={!full ? "user justify-content-center align-items-center" : "user"}>
                  <img
                    src={getImageURL({
                      path: user?.media,
                      size: "mini",
                      type: "user",
                    })
                    }
                    className={!full && "img-small"}
                    alt="userphoto"
                  />
                  {full &&
                    <>
                      <div className='rating ms-2'>
                        <StarIcon />
                        {/* <StarRating value={products?.items?.user?.rating} /> */}
                        <span className='ms-1'>{user?.rating != null ? parseFloat(user?.rating).toFixed(1) : "0.0"}</span>
                      </div>
                      <span className='nickname ms-2'>{user.nickname}</span>

                    </>}
                </div>
                {full && <hr />}
                {full && <div className='info'>
                  <div>
                    <p>Сделки</p>
                    <span>{user.orderSale}</span>
                  </div>
                  <div>
                    <p>Лоты</p>
                    <span>{user.product}</span>
                  </div>
                  <div>
                    <p>Отзывы</p>
                    <span>{user.review}</span>
                  </div>
                </div>
                }
              </div>

              <ul className='menu-nav-block'>
                {full &&
                  <li>
                    <div className="menu-nav-balance">
                      <span className="fw-6 me-2 me-xxl-3">Баланс</span>
                      <span className="title-font fs-13">
                        {customPrice(user.cash)}
                      </span>
                    </div>
                  </li>
                }
                <li>
                  <NavLink to="account/profile" className={!full && "justify-content-center"}>
                    <div>
                      <FiUser className={"svg me-2"} />
                      {full && <span>Профиль</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="account/offers" className={!full && "justify-content-center"}>
                    <div>
                      <FiList className="svg me-2" />
                      {full && <span>Мои объявления</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="account/purchase-history" className={!full && "justify-content-center"}>
                    <div>
                      <RiHistoryLine className="svg me-2" />
                      {full && <span>История покупок</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="account/sales-history" className={!full && "justify-content-center"}>
                    <div>
                      <LuFileClock className="svg me-2" />
                      {full && <span>История продаж</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="account/finance" className={!full && "justify-content-center"}>
                    <div>
                      <LuCoins className="svg me-2" />
                      {full && <span>Финансы</span>}
                    </div>
                  </NavLink>
                </li>

                <li className='mt-sm-4 mt-lg-5'>
                  <NavLink to="account/messages" className={!full && "justify-content-center"}>
                    <div>
                      <LuMails className="svg me-2" />
                      {full && <span>Сообщения</span>}
                    </div>
                    {/* <span className='badge'></span> */}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="account/feedback" className={!full && "justify-content-center"}>
                    <div>
                      <FiMessageCircle className="svg me-2" />
                      {full && <span>Отзывы</span>}
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="account/callback" className={!full && "justify-content-center"}>
                    <div>
                      <HeadPhones className="svg me-2" />
                      {full && <span>Обратная связь</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/account/settings" className={!full && "justify-content-center"}>
                    <div>
                      <FiSettings className="svg me-2" />
                      {full && <span>Настройки</span>}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <Link to="/" onClick={() => dispatch(logout())} className={!full && "justify-content-center"}>
                    <div >
                      <LuLogOut className="svg me-2" />
                      {full && <span>Выйти</span>}
                    </div>
                  </Link>

                </li>
              </ul>
            </>


            :
            <div className='menu-nav-login'>
              {full ?
                <>
                  <h6>Добро пожаловать!</h6>

                  <NavLink to="/login" className="button btn-1">
                    Войти
                  </NavLink>

                  <NavLink to="/registration">
                    <div>Еще нет аккаунта?</div>
                  </NavLink>
                </>
                :
                <NavLink to="/login" className="icon">
                  <Key />
                </NavLink>
              }


            </div>
          }
          {full &&
            <ul className='menu-nav-block'>
              <li>
                <NavLink to="/help">
                  <div>Информация</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="account/favs">
                  <div>Избранное</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy">
                  <div>Политика</div>
                </NavLink>
              </li>
            </ul>
          }
          <div ref={cut} id="cut" onClick={() => setFull(!full)} className={(full) ? 'opened' : ''}><Arrow className="img" /> </div>
        </div>
      </div>
    </nav >
  );
};

export default Menu;