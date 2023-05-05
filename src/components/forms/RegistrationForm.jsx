import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckMark from '../svg/CheckMark';
import CrossMark from '../svg/CrossMark';
import InputPassword from '../utils/InputPassword';
import LabeledInput from '../utils/LabeledInput';

const RegistrationForm = () => {
  return (
    <form action="" className='midi'>
      <Row className='g-3 g-sm-4'>
        <Col md={8}>
          <LabeledInput type="text" label={'Имя / ник'} placeholder='Имя'/>
        </Col>
        <Col md={8}>
          <LabeledInput type="email" label={'E-mail'} placeholder='user@mail.com'/>
        </Col>
        <Col md={4}>
          <button type='button' className='btn-1 h-100 w-100'>Подтвердить</button>
        </Col>
      </Row>

      <p className='my-4'>Введите код, отправленный на указанную электронную почту</p>
      <Row className='g-3 g-sm-4 mb-5'>
        <Col md={4}>
          <input className='code' type="number" placeholder='0000'/>
        </Col>
        <Col md={4}><button type='button' className='btn-1 h-100 w-100'>Отправить</button></Col>
      </Row>

      <Row className='g-4'>
        <Col md={8}>
          <LabeledInput type="password" label={'Пароль'} placeholder='Придумайте пароль'/>
          <p className='rose'>Слишком короткий пароль</p>
        </Col>
        <Col md={8}>
          <LabeledInput type="password" label={'Подтверждение пароля'} placeholder='Повторите пароль'/>
        </Col>
      </Row>
      <p className='mt-1'>Пароль должен содержать не менее 6 символов, и среди них должны быть заглавные и строчные буквы, цифры, специальные символы (т. е. *, %, &,!)</p>
      
      <p className='pale-blue mt-3'>Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия Пользовательского соглашения и соглашаетесь с Политикой конфиденциальности</p>
      <button type='submit' disabled className='btn-1 mt-4'>Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;