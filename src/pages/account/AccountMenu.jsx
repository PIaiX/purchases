import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiList } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { MdCurrencyRuble } from "react-icons/md";

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
            <span>Профиль</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="offers">
            <FiList/>
            <span>Мои объявления</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="history">
            <RxCounterClockwiseClock/>
            <span>История покупок</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AccountMenu;