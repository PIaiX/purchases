import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckMark from '../components/svg/CheckMark';
import CrossMark from '../components/svg/CrossMark';

const Registration = () => {
  return (
    <main>
      <Container>
        <section className='sec-registration mb-6'>
          <Row className='justify-content-center'>
            <Col lg={10}>
              <div className="title">
                <h1 className='h2 mb-0'>Регистрация нового пользователя</h1>
                <img src="imgs/head2.png" alt="head" />
              </div>
              <div className='box mt-4'>
                <form action="" className='midi'>
                  <Row className='g-4'>
                    <Col md={8}>
                      <div className="labeled-input">
                        <label>
                          <span>Имя / ник</span>
                          <CheckMark className="pale-blue fs-13 ms-2"/>
                        </label>
                        <input type="email" placeholder='user@mail.com'/>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="labeled-input">
                        <label>
                          <span>E-mail</span>
                          <CheckMark className="pale-blue fs-13 ms-2"/>
                        </label>
                        <input type="email" placeholder='user@mail.com'/>
                      </div>
                    </Col>
                    <Col md={4}>
                      <button type='button' className='btn-1 h-100 w-100'>Подтвердить</button>
                    </Col>
                  </Row>
                  <p className='my-4'>Введите код, отправленный на указанную электронную почту</p>

                  <Row className='g-4 mb-5'>
                    <Col md={4}>
                      <input type="number" placeholder='0000'/>
                    </Col>
                    <Col md={4}><button type='button' className='btn-1 h-100'>Отправить</button></Col>
                  </Row>

                  <Row className='g-4'>
                    <Col md={8}>
                      <div className="labeled-input">
                        <label>
                          <span>Пароль</span>
                          <CrossMark className="rose fs-13 ms-2"/>
                        </label>
                        <input type="password" placeholder='Введите пароль'/>
                      </div>
                      <p className='rose'>Слишком короткий пароль</p>
                    </Col>
                    <Col md={8}>
                      <div className="labeled-input">
                        <label>
                          <span>Подтверждение пароля</span>
                          <CheckMark className="pale-blue fs-13 ms-2"/>
                        </label>
                        <input type="password" placeholder='Введите пароль'/>
                      </div>
                    </Col>
                  </Row>
                  <p className='mt-1'>Пароль должен содержать не менее 6 символов, и среди них должны быть заглавные и строчные буквы, цифры, специальные символы (т. е. *, %, &,!)</p>
                 
                  <p className='pale-blue mt-3'>Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия Пользовательского соглашения и соглашаетесь с Политикой конфиденциальности</p>
                  <button type='submit' disabled className='btn-1 mt-4'>Зарегистрироваться</button>
                </form>

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
                      <CheckMark className="pale-blue fs-13 ms-2"/>
                    </label>
                    <input type="password" placeholder='Введите пароль'/>
                  </div>
                  <p className='rose fs-08'>Неверный логин или пароль. Попробуйте снова или воспользуйтесь формой восстановления пароля.</p>

                  <button type='submit' className='btn-1 mt-4'>Войти</button>
                </form>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;