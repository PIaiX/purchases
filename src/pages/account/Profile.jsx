import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LabeledInput from '../../components/utils/LabeledInput';
import StarRating from '../../components/utils/StarRating';
import Joystick from '../../components/svg/Joystick';
import { TbHeartHandshake } from "react-icons/tb";
import { FiMessageCircle, FiEdit, FiShare } from "react-icons/fi";
import {Link} from 'react-router-dom';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Profile = () => {
  return (
    <section className='sec-profile mb-6'>
      <ReturnTitle link={'/account'} title={'Профиль'}/>
      <div className="d-flex align-items-start mb-5">
        <div className='user flex-1'>
          <div className="user-photo">
            <img src="imgs/user2.jpg" alt="userphoto" />
            <button type='button'><FiEdit/></button>
          </div>
          <div className="user-main">
            <div className='title'>Weatherwax</div>
            <div className="d-flex align-items-center">
              <StarRating rate={5}/> 
              <span className='fs-13 fw-7 ms-2'>5</span>
            </div>
            <p className='mt-2'>3 года на платформе</p>
          </div>
          <ul className="user-info">
            <li>
              <div>
                <TbHeartHandshake className='svg'/>
                <span>Сделок:</span>
              </div>
              <span>1033</span>
            </li>
            <li>
              <div>
                <Joystick className='path'/>
                <span>Лотов:</span>
              </div>
              <span>336</span>
            </li>
            <li>
              <div>
                <FiMessageCircle className='svg'/>
                <span>Отзывов:</span>
              </div>
              <span>193</span>
            </li>
          </ul>
          <img src="imgs/qr-code.svg" alt="qr-code" className='qr-code ms-3 ms-xl-5'/>
        </div>
        
        <button type='button' className='share-btn ms-2 ms-xl-4'>
          <FiShare/>
        </button>
      </div>
      <Row className='gy-5 mb-md-5'>
        <Col xs={12} xxl={10}>
          <h3 className='mb-4 mb-sm-5'>Основное</h3>
          <form action="">
            <Row className='g-4 gy-xl-5'>
              <Col md={6} xl={4}>
                <LabeledInput type={"text"} label={"Имя/Ник"}/>
              </Col>
              <Col md={6} xl={{ span: 4, offset: 1 }}>
                <LabeledInput type={"tel"} label={"Номер телефона"}/>
              </Col>
              <Col md={6} xl={4}>
                <LabeledInput type={"email"} label={"E-mail"}/>
              </Col>
              <Col md={6} xl={{ span: 6, offset: 1 }}>
                <p className='rose'>Только верифицированные пользовтаели могут публиковать объявления на бирже Game.</p>
              </Col>
              <Col md={6} xl={4}>
                <button type="submit" className='btn-1'>Сохранить изменения</button>
              </Col>
              <Col md={6} xl={{ span: 4, offset: 1 }}>
                <Link to="phone" className='btn-3'>Пройти верификацию</Link>
              </Col>
            </Row>
          </form>
        </Col>
        <Col xs={12} xxl={10}>
          <h3 className='mb-4 mb-sm-5'>Изменить пароль</h3>
          <form action="">
            <Row xs={1} md={2} xl={3} className='g-4'>
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