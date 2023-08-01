import React from 'react';
import {Link} from 'react-router-dom';
import { RxChevronLeft } from "react-icons/rx";
import ReturnTitle from '../../components/utils/ReturnTitle';
import Chat from '../../components/chat/Chat';

const CallbackChat = () => {
  return (
    <section className='sec-appeal mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/callback'} title={'Обращение ID-15296'}/>

      <div className="row">
        <div className="col-xxl-10">
          <div className="top">
            <h4>Тема: <span className='fw-4'>Не получается совершить покупку</span></h4>
            <Link to="/account/callback" className='blue d-flex align-items-center'>
              <RxChevronLeft className='fs-13'/>
              <span>Назад</span>
            </Link>
          </div>
          <div className="box p-0">
            <Chat/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallbackChat;