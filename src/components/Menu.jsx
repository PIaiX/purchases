import React, { useRef, useState } from 'react';
import { FiHeart, FiList, FiMessageCircle, FiSettings, FiUser } from 'react-icons/fi';
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
import Plaix from './svg/Plaix';

const Menu = ({ full, setFull }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const unreadCount = useSelector((state) => state.notification.message);
  const cut = useRef(null);
  const dispatch = useDispatch();
  return (
    <nav className='menu-nav'>
      <div className={(full) ? 'wrap full' : 'wrap'}>
        {isAuth &&

          <div className='menu-nav-top'>
            <div className={!full ? "user justify-content-center align-items-center" : "user"}>
              <Link to={"/account/profile"}>
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
              </Link>
              {full &&
                <>
                  <div className='rating'>
                    <StarIcon />
                    {/* <StarRating value={products?.items?.user?.rating} /> */}
                    <span className='ms-1'>{user?.rating != null ? parseFloat(user?.rating).toFixed(1) : "0.0"}</span>
                  </div>
                  <span className='nickname'>{user.nickname}</span>

                </>}
            </div>
            {full && <hr />}
            {full && <div className='info'>
              <Link to="account/sales-history">
                <p>Сделки</p>
                <span>{user.orderSale}</span>
              </Link>
              <Link to="account/offers">
                <p>Лоты</p>
                <span>{user.product}</span>
              </Link>
              <Link to="account/feedback">
                <p>Отзывы</p>
                <span>{user.review}</span>
              </Link>
            </div>
            }
          </div>

          // <div className='menu-nav-login'>
          //   {full ?
          //     <>
          //       <h6>Добро пожаловать!</h6>

          //       <NavLink to="/login" className="button btn-1 py-1 px-2">
          //         Войти
          //       </NavLink>

          //       <NavLink to="/registration">
          //         <div>Еще нет аккаунта?</div>
          //       </NavLink>
          //     </>
          //     :
          //     <NavLink to="/login" className="icon">
          //       <Key />
          //     </NavLink>
          //   }


          // </div>
        }

        <div className={(full) ? 'scroll full' : 'scroll'}>
          <div className={(full) ? 'content full' : 'content'}>
            {isAuth &&
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
                  <NavLink to="account/messages" className={!full ? "justify-content-center" : "justify-content-between"}>
                    <div>
                      <LuMails className="svg me-2" />
                      {!full && unreadCount > 0 && <div className="indicator blue"></div>}
                      {full && <span>Сообщения</span>}
                    </div>
                    {full && unreadCount > 0 && <span className='badge'>+{unreadCount}</span>}
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
                  <NavLink to="account/favs" className={!full && "justify-content-center"}>
                    <div>
                      <FiHeart className="svg me-2" />
                      {full && <span>Избранное</span>}
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

            }
            {full &&
              <ul className='menu-nav-block'>
                <li>
                  <NavLink to="/help">
                    <div>Информация</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog">
                    <div>Новости</div>
                  </NavLink>
                </li>
                {!isAuth &&
                  <li>
                    <NavLink to="/callback">
                      <div>Обратная связь</div>
                    </NavLink>
                  </li>
                }
                <li>
                  <NavLink to="/docs">
                    <div>Правовая информация</div>
                  </NavLink>
                </li>
                <li>
                  <div className='dev-link'>
                    <div>©2024 Rush to play</div>
                    <div className='note' />
                    <Link to={"https://plaix.ru/"}>
                      <div>Создано в</div>
                      <Plaix />
                    </Link>
                  </div>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Menu;