import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";

const OfferLine3 = ({ date, descr, seller, id, status, price }) => {
  date = moment(date).format("DD MMMM YYYY kk:mm")

  return (
    <div className="offer-line-3">
      <div className="date"><span>{date}</span>
      </div>
      <div className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <div>{id}</div>
      </div>
      <div className="descr">{descr}</div>
      <div className="seller">
        <img src="/imgs/user.jpg" alt="User8name" />
        <div>
          <h6 className='text-start mb-xl-1'>{seller}</h6>
          <p className='gray fs-08'>ваша оценка</p>
          <StarRating rate={4} />
        </div>
      </div>
      <div className="status">
        <span className='d-xl-none me-2'>Статус: </span>
        <button type='button' className='btn-5 py-1 px-2'>Подтвердить</button>
      </div>
      <div className="price">{price}&nbsp;&nbsp;₽</div>
    </div>
  );
};

export default OfferLine3;