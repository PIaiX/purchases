import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LabeledInput from '../../components/utils/LabeledInput';

const Profile = () => {
  return (
    <section className='mb-5'>
      <Row className='mb-5'>
        <Col md={8}></Col>
        <Col md={2}>
          <img src="imgs/qr-code.svg" alt="qr-code" className='img-fluid'/>
        </Col>
        <Col md={2}>
          <button type="button" className='post'>
            <img src="imgs/plusx2.png" alt="plusx2" />
            <div>Разместить объявление</div>
          </button>
        </Col>
      </Row>
      <Row className='gy-5 mb-5'>
        <Col md={9}>
          <h3 className='mb-5'>Основное</h3>
          <form action="">
            <Row md={2} className='gx-5'>
              <Col>
                <LabeledInput className="mb-5" type={"text"} label={"Имя/Ник"}/>
                <LabeledInput className="mb-4" type={"email"} label={"E-mail"}/>
                <label className='mb-3'>
                  <input type="checkbox" className='switch'/>
                  <span className='ms-3'>Получать уведомления на почту</span>
                </label>
                <label>
                  <input type="checkbox" className='switch'/>
                  <span className='ms-3'>Получать уведомления в Telegram</span>
                </label>
              </Col>
              <Col>
                <LabeledInput className="mb-3" type={"tel"} label={"Номер телефона"}/>
                <p className='rose'>Только верифицированные пользовтаели могут публиковать объявления на бирже Game.</p>
                <button type='button' className='btn-3 mt-4'>Пройти верификацию</button>
              </Col>
            </Row>
            <button type='submit' disabled className='btn-1 mt-4'>Сохранить изменения</button>
          </form>
        </Col>
        <Col md={10}>
          <h3 className='mb-5'>Изменить пароль</h3>
          <form action="">
            <Row md={3}>
              <Col>
                <LabeledInput type={"password"} label={"Старый пароль"}/>
              </Col>
              <Col>
                <LabeledInput type={"password"} label={"Новый пароль"}/>
              </Col>
              <Col>
                <LabeledInput type={"password"} label={"Подтверждение пароля"}/>
              </Col>
            </Row>
            <button type='submit' className='btn-1 mt-4'>Изменить</button>
          </form>
        </Col>
      </Row>
    </section>
  );
};

export default Profile;