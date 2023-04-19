import React from 'react';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';

const AuthorizationForm = () => {
  return (
    <form action="" className='mini'>
      <h4>Уже есть аккаунт?</h4>
      <p className='mb-4'>Введите данные учётной записи</p>
      <div className="labeled-input mb-4">
        <label>
          <span>Email</span>
          <CheckMark className="pale-blue fs-13 ms-2"/>
        </label>
        <input type="email" placeholder='user@mail.com'/>
      </div>

      <div className="labeled-input mb-1">
        <label>
          <span>Пароль</span>
          <CrossMark className="rose fs-13 ms-2"/>
        </label>
        <input type="password" placeholder='Введите пароль'/>
      </div>
      <p className='rose fs-08'>Неверный логин или пароль. Попробуйте снова или воспользуйтесь формой восстановления пароля.</p>

      <button type='submit' className='btn-1 mt-4'>Войти</button>
    </form>
  );
};

export default AuthorizationForm;