import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LiaRubleSignSolid } from "react-icons/lia";
import Input from '../../components/utils/Input';
import SettingsLine from '../../components/SettingsLine';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Settings = () => {
  return (
    <section className="mb-6">
      <ReturnTitle link={'/account'} title={'Настройки'}/>
      <div className="list-wrapping mb-4 mb-sm-5">
        <div className="list-wrapping-top p-0">
        <div className="settings-line fw-6">
          <div className="session fs-11">Сессия</div>
          <div className="system fs-11">Система</div>
          <div className='browser fs-11'>Браузер</div>
          <div className='ip fs-11'>IPv4-адрес</div>
          <div className='region fs-11'>Регион</div>
          <div className="btns fs-11"></div>
        </div>
        </div>
        <div className="list-wrapping-main">
          <ul className='g-3 g-md-4 g-xl-0 row row-cols-sm-2 row-cols-xl-1'>
            <li>
              <SettingsLine/>
            </li>
            <li>
              <SettingsLine/>
            </li>
            <li>
              <SettingsLine/>
            </li>
            <li>
              <SettingsLine/>
            </li>
            <li>
              <SettingsLine/>
            </li>
            <li>
              <SettingsLine/>
            </li>
          </ul>
        </div>
      </div>

      <Row>
        <Col sm={8} md={6} xxl={5}>
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

      <div className="d-xxl-flex align-items-end mt-5">
        <div className="text-center d-sm-flex align-items-center bg-blue white rounded-3 title-font py-2 px-3">
          <span className='fs-18'>Доступно для резервирования</span>
          <div className='d-flex align-items-center justify-content-center'>
            <span className='fs-18 ms-4'>14 856,78</span>
            <LiaRubleSignSolid className='ruble ms-2'/>
          </div>
        </div>
        <div className="flex-1 d-sm-flex align-items-end ms-xxl-4 mt-4 mt-xxl-0">
          <Input 
            className="flex-1"
            type={"text"} 
            label={"Зарезервировать на балансе"} 
            placeholder={'Введите сумму'}
          />
          <button className='w-xs-100 btn-1 mt-3 mt-sm-0 ms-sm-4'>Зарезервировать</button>
        </div>
      </div>
      
    </section>
  );
};

export default Settings;