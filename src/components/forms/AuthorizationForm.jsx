import React from 'react';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';
import { Link } from 'react-router-dom';
import InputPassword from '../utils/InputPassword';

const AuthorizationForm = (props) => {
  return (
    <form action="" className='mini'>
      {
        (props.title) &&
        <h4 className='mb-3'>{props.title}</h4>
      }
      <p className='mb-4 mb-sm-5'>Введите данные учётной записи</p>
      <div className="labeled-input mb-4 mb-sm-5">
        <input type="email" placeholder='user@mail.com'/>
        <label>
          <span>Email</span>
          <CheckMark className="pale-blue fs-13 ms-2"/>
        </label>
      </div>

      <div className="labeled-input mb-2">
        <InputPassword placeholder='Введите пароль' />
        <label>
          <span>Пароль</span>
          <CrossMark className="rose fs-13 ms-2"/>
        </label>
      </div>
      <p className='rose fs-08'>Неверный логин или пароль. Попробуйте снова или <Link to="/password" className='text-decoration-underline'>воспользуйтесь формой восстановления пароля</Link>.</p>

      <Link to='/account' className='btn-1 mt-4'>Войти</Link>
    </form>
  );
};

export default AuthorizationForm;