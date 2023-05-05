import React from 'react';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';
import { Link } from 'react-router-dom';
import InputPassword from '../utils/InputPassword';
import LabeledInput from '../utils/LabeledInput';

const AuthorizationForm = (props) => {
  return (
    <form action="" className='mini'>
      {
        (props.title) &&
        <h4 className='mb-3'>{props.title}</h4>
      }
      <p className='mb-4 mb-sm-5'>Введите данные учётной записи</p>
      <LabeledInput className="mb-4 mb-sm-5" type="email" label={'Email'} placeholder='user@mail.com'/>

      <LabeledInput className="mb-2" type="password" label={'Пароль'} placeholder='Введите пароль'/>
      <p className='rose fs-08'>Неверный логин или пароль. Попробуйте снова или <Link to="/password" className='text-decoration-underline'>воспользуйтесь формой восстановления пароля</Link>.</p>

      <Link to='/account' className='btn-1 mt-4'>Войти</Link>
    </form>
  );
};

export default AuthorizationForm;