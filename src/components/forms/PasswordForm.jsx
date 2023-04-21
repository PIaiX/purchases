import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';
import InputPassword from '../utils/InputPassword';

const PasswordForm = () => {
  return (
    <form action="" className='mini'>
      <p className='mb-5'>Введите адрес электронной почты, которую вы вводили при регистрации</p>

      <Row>
        <Col md={8}>
          <div className="labeled-input">
            <label>
              <span>E-mail</span>
              <CrossMark className="rose fs-13 ms-2"/>
            </label>
            <input type="email" placeholder='user@mail.com'/>
          </div>
        </Col>
        <Col md={4}>
          <button type='button' className='btn-1 h-100 w-100'>Восстановить</button>
        </Col>
      </Row>
      <p className="rose">Пользователь с такими данными не зарегистрирован</p>

      <p className='mt-4 mb-3'>Введите код, отправленный на указанную электронную почту</p>
      <Row className='g-4 mb-5'>
        <Col md={4}>
          <input className='code' type="number" placeholder='0000'/>
        </Col>
        <Col md={4}><button type='button' className='btn-1 h-100'>Отправить</button></Col>
      </Row>

      <Row>
        <Col md={8}>
          <div className="labeled-input mb-2">
            <label>
              <span>Новый пароль</span>
              <CheckMark className="pale-blue fs-13 ms-2"/>
            </label>
            <InputPassword placeholder='Придумайте пароль' />
          </div>
        </Col>
      </Row>
      <p className='rose fs-08'>Слишком короткий пароль</p>
      <p className='fs-08'>Пароль должен содержать не менее 6 символов, и среди них должны быть заглавные и строчные буквы, цифры, специальные символы (т. е. *, %, &,!)</p>
      
      <Row className='mt-4'>
        <Col md={8}>
          <div className="labeled-input mb-2">
            <label>
              <span>Подтверждение пароля</span>
              <CheckMark className="pale-blue fs-13 ms-2"/>
            </label>
            <InputPassword placeholder='Повторите пароль' />
          </div>
        </Col>
      </Row>

      <button type='submit' className='btn-1 mt-4'>Сохранить</button>
    </form>
  );
};

export default PasswordForm;