import React from 'react';
import { NavLink } from 'react-router-dom';
import useIsMobile from '../../hooks/isMobile';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/auth';


const AccountMenu = (props) => {
  const isMobileLG = useIsMobile('991px')
  const dispatch = useDispatch();
  return (
    <nav className='account-nav'>
      <ul>
        <li>
          <NavLink to="/account/profile">
            <div>Профиль</div>
          </NavLink>
        </li>
        {
          (isMobileLG) &&
          <li>
            <NavLink to="/account/favs">
              <div>Избранное</div>
            </NavLink>
          </li>
        }
        <li>
          <NavLink to="/account/offers">
            <div>Мои объявления</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/purchase-history">
            <div>История покупок</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/sales-history">
            <div>История продаж</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/finance">
            <div>Финансы</div>
          </NavLink>
        </li>

        <li className='mt-sm-4 mt-lg-5'>
          <NavLink to="/account/messages">
            <div>Сообщения</div>
            {/* <span className='badge'></span> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/feedback">
            <div>Отзывы</div>
          </NavLink>
        </li>

        <li className='mt-sm-4 mt-lg-5'>
          <NavLink to="/account/callback">
            <div>Обратная связь</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/settings">
            <div>Настройки</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <div onClick={() => dispatch(logout())} >Выйти</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AccountMenu;