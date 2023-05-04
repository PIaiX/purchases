import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiList, FiMessageCircle, FiMail } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { MdCurrencyRuble } from "react-icons/md";
import { TbBusinessplan, TbChartInfographic } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const AccountMenu = () => {
  return (
    <nav className='account-nav'>
      <div className='account-nav-balance'>
        <h6 className='mb-2'>Баланс</h6>
        <div>
          <span>14 856,78</span>
          <MdCurrencyRuble/>
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="profile">
            <FiUser/>
            <div>Профиль</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="offers">
            <FiList/>
            <div>Мои объявления</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="purchase-history">
            <RxCounterClockwiseClock/>
            <div>История покупок</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="sales-history">
            <TbChartInfographic/>
            <div>История продаж</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="finance">
            <TbBusinessplan/>
            <div>Финансы</div>
          </NavLink>
        </li>
        
        <li className='mt-sm-4 mt-lg-5'>
          <NavLink to="messages">
            <FiMail/>
            <div>Сообщения</div>
            <span className='badge'>+32</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="feedback">
            <FiMessageCircle/>
            <div>Отзывы</div>
          </NavLink>
        </li>

        <li className='mt-sm-4 mt-lg-5'>
          <NavLink to="callback">
            <TfiHeadphoneAlt/>
            <div>Обратная связь</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AccountMenu;