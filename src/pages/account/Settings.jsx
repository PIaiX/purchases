import React from 'react';
import OfferLine2 from '../../components/OfferLine2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LiaRubleSignSolid } from "react-icons/lia";
import LabeledInput from '../../components/utils/LabeledInput';

const Settings = () => {
  return (
    <section className="mb-6">
      <div className="list-wrapping mb-5">
        <div className="list-wrapping-top">
          <ul className='line-2'>
            <li className='descr'>Описание</li>
            <li className='price'>Цена</li>
            <li className='btns'></li>
          </ul>
        </div>
        <div className="list-wrapping-main">
          <ul>
            <li>
              <OfferLine2/>
            </li>
            <li>
              <OfferLine2/>
            </li>
            <li>
              <OfferLine2/>
            </li>
            <li>
              <OfferLine2/>
            </li>
            <li>
              <OfferLine2/>
            </li>
            <li>
              <OfferLine2/>
            </li>
          </ul>
        </div>
      </div>

      <Row>
        <Col md={5}>
          <label htmlFor="" className='mb-3'>
            <span>Получать уведомления на почту</span>
            <input type="checkbox" className='switch'/>
          </label>
          <label htmlFor="">
            <span>Получать уведомления в Telegram</span>
            <input type="checkbox" className='switch'/>
          </label>
        </Col>
      </Row>

      <div className="d-flex align-items-end mt-5">
        <div className="bg-blue white rounded-3 title-font py-2 px-3">
          <span className='fs-20'>Доступно для резервирования</span>
          <span className='fs-20'>14 856,78</span>
          <LiaRubleSignSolid className='ruble'/>
        </div>
        <LabeledInput 
          className="flex-1 ms-4"
          type={"text"} 
          label={"Зарезервировать на балансе"} 
          placeholder={'Введите сумму'}
        />
        <button className='btn-1 ms-4'>Зарезервировать</button>
      </div>
      
    </section>
  );
};

export default Settings;