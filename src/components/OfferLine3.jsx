import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';

const OfferLine3 = ({ date, descr, nickname, id, status, price, author }) => {
  date = date ? moment(date).format("DD.MM.YYYY kk:mm") : null
  const image = getImageURL({ path: author, type: "user" })
  return (
    <div className="offer-line-3">
      <div className="date">
        <time>
          <span>{moment(date).format("DD.MM.YYYY")}</span>
          <span className='ms-3 gray'>{moment(date).format("kk:mm")}</span>
        </time>
      </div>
      <div className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <div>{id}</div>
      </div>
      <div className="descr">{descr}</div>
      <div className="seller">
        <img src={image} alt="User8name" />
        <div>
          <h6 className='text-start mb-xl-1'>{nickname}</h6>
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