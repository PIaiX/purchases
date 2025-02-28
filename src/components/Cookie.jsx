import React, { useState } from 'react';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCookiePolice } from '../store/reducers/cookieSlice';

const Cookie = () => {
  const cookiePolice = useSelector(state => state.cookiePolice.value);
  const dispatch = useDispatch();
  console.log(cookiePolice)
  const toggleCookie = (e) => {
    dispatch(setCookiePolice(false));
  };
  if (cookiePolice) {
    return (
      <div class="cookie-policy">
        <div class="cookie-policy-message">
          Продолжая использовать {process.env.REACT_APP_SITE_URL}, вы соглашаетесь на использование файлов cookie. Более подробную информацию можно найти в
          <Link to="/docs/cookie" class="">
            <span class="text-nowrap">Политике cookie файлов</span>
          </Link>.
        </div>
        <button onClick={toggleCookie}>
          <RxCross2 />
        </button>
      </div>
    );
  }
};

export default Cookie;