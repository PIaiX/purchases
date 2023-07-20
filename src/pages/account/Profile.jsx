import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LabeledInput from '../../components/utils/LabeledInput';
import StarRating from '../../components/utils/StarRating';
import Joystick from '../../components/svg/Joystick';
import { TbHeartHandshake } from "react-icons/tb";
import { FiMessageCircle, FiEdit, FiShare } from "react-icons/fi";
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';

const Profile = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <div className="d-lg-none d-flex align-items-center mb-4 mb-lg-0">
        <Link to='/account' className='d-flex return-icon me-2 me-sm-4'><ReturnIcon/></Link>
        <h1 className='h2 mb-0'>Профиль</h1>
      </div>
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
        </div>
        <img src="imgs/qr-code.svg" alt="qr-code" className='qr-code ms-5'/>
        <button type='button' className='fs-15 dark-blue ms-4'>
          <FiShare/>
        </button>
      </div>
      <Row className='gy-5 mb-md-5'>
        <Col xs={12} xxl={9}>
          <h3 className='mb-4 mb-sm-5'>Основное</h3>
          <form action="">
            <Row xs={1} md={2} className='gx-xl-5 gy-5 gy-lg-0'>
              <Col>
                <LabeledInput className="mb-4 mb-sm-5" type={"text"} label={"Имя/Ник"}/>
                <LabeledInput className="mb-4" type={"email"} label={"E-mail"}/>
              </Col>
              <Col>
                <LabeledInput className="mb-3" type={"tel"} label={"Номер телефона"}/>
                <p className='rose'>Только верифицированные пользовтаели могут публиковать объявления на бирже Game.</p>
                <Link to="phone" className='btn-3 mt-4'>Пройти верификацию</Link>
              </Col>
            </Row>
            <Link to="email" className='btn-1 mt-4'>Сохранить изменения</Link>
          </form>
        </Col>
        <Col xs={12} xxl={10}>
          <h3 className='mb-4 mb-sm-5'>Изменить пароль</h3>
          <form action="">
            <Row xs={1} xl={3} className='g-4'>
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