import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';
import { declOfNum } from '../helpers/all';

const OfferCard = ({ title, user, param, desc, price, id }) => {
  const declension = declOfNum(user.length, ['отзыв', 'отзыва', 'отзывов']);
  return (
    <div className="offer-card">
      <div className="offer-card-top">
        <h5>{user.nickname}</h5>
        <div className='d-flex align-items-center'>
          <span className='fw-3 me-4'>{declension}</span>
          <StarRating value={user.rating} />
        </div>
      </div>

      <div className='offer-card-main'>
        <h5>{title}</h5>
        <div className='d-xl-flex text-end align-items-baseline ms-3'>
          <div className='fs-12'>Платформа</div>
          <div className='fw-3 ms-xl-3'>{param?.title}</div>
        </div>
      </div>

      <div className='offer-card-text'>
        <h5>Описание</h5>
        <p>{desc}</p>
      </div>

      <div className="offer-card-bottom">
        <h5 className='fw-7'>{price} <span className='rouble'>₽</span></h5>
        <button type='button' className='btn-1'><Link to={`/game/lot/${id}`}>К объявлению</Link></button>
      </div>
    </div>
  );
};

export default OfferCard;