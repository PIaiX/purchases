import React from 'react';
import {Link} from 'react-router-dom';
import LabeledInput from '../../components/utils/LabeledInput';
import ReturnTitle from '../../components/utils/ReturnTitle';
const PhoneVerification = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/profile'} title={'Подтверждение номера телефона'}/>
      <h2 className='d-none d-lg-block'>Подтверждение номера телефона</h2>

      <div className='row'>
        <form className='col-12 col-lg-10 col-xl-8 col-xxl-6' action="">
          <div className='row g-4 mb-5'>
            <div className="col-12 col-sm-8">
              <LabeledInput type={"tel"} label={"Номер телефона"}/>
            </div>
            <div className="col-12 col-sm-4">
              <button type='button' className='btn-1 h-100 w-100' disabled>Подтвердить</button>
            </div>
            <div className="col-12">
              <p className='black mt-4'>Введите код, отправленный на указанный номер</p>
            </div>
            <div className="col-12 col-sm-3">
              <input className='code' type="number" placeholder='0000'/>
            </div>
          </div>

          <button type='button' className='mt-5 total-black text-decoration-underline'>Отправить код повторно</button>

          <Link to="/" className='d-block link-2 mt-3'>Возникли проблемы?</Link>
        </form>
      </div>
    </section>
  );
};

export default PhoneVerification;