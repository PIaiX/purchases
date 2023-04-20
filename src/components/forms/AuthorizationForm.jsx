import React from 'react';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';
import { Link } from 'react-router-dom';

const AuthorizationForm = (props) => {
  return (
    <form action="" className='mini'>
      {
        (props.title) &&
        <h4 className='mb-3'>{props.title}</h4>
      }
      <p className='mb-5'>Введите данные учётной записи</p>
      <div className="labeled-input mb-5">
        <label>
          <span>Email</span>
          <CheckMark className="pale-blue fs-13 ms-2"/>
        </label>
        <input type="email" placeholder='user@mail.com'/>
      </div>

      <div className="labeled-input mb-2">
        <label>
          <span>Пароль</span>
          <CrossMark className="rose fs-13 ms-2"/>
        </label>
        <input type="password" placeholder='Введите пароль'/>
      </div>
      <p className='rose fs-08'>Неверный логин или пароль. Попробуйте снова или <Link to="/password" className='text-decoration-underline'>воспользуйтесь формой восстановления пароля</Link>.</p>

      <button type='submit' className='btn-1 mt-4'>Войти</button>
    </form>
  );
};

export default AuthorizationForm;