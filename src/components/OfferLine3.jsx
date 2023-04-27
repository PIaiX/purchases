import React from 'react';
import StarRating from './utils/StarRating';

const OfferLine3 = () => {
  return (
    <div className="offer-line-3">
      <div className="date"><span>04.04.2023</span> <span className='ms-xxl-2 gray'>16:36</span></div>
      <div className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <span>15296</span>
      </div>
      <div className="descr">Сервер Airin + Blackbird ,Тяж, Лайт, Маг Сэт Ада Пустые</div>
      <div className="seller">
        <img src="imgs/user.jpg" alt="User8name" />
        <div>
          <h6 className='text-start mb-xl-1'>User8name</h6>
          <p className='gray fs-08'>ваша оценка</p>
          <StarRating rate={4}/>
        </div>
      </div>
      <div className="status">
        <span className='d-xl-none me-2'>Статус: </span>
        <button type='button' className='btn-5 py-1 px-2'>Подтвердить</button>
      </div>
      <div className="price">186,97&nbsp;&nbsp;₽</div>
    </div>
  );
};

export default OfferLine3;