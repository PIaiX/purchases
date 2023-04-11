import React from 'react';
import StarRating from './utils/StarRating';

const OfferCard = () => {
  return (
    <div className="offer-card">
      <div className="offer-card-top">
        <h5>laprad</h5>
        <div className='d-flex align-items-center'>
          <span className='fw-3 me-4'>2 отзыва</span>
          <StarRating rate={4.4}/>
        </div>
      </div>

      <div className='offer-card-main'>
        <h5>Услуги Cyberpunk 2077</h5>
        <div className='d-xl-flex text-end align-items-baseline ms-3'>
          <div className='fs-12'>Платформа</div>
          <div className='fw-3 ms-xl-3'>Xbox</div>
        </div>
      </div>

      <div className='offer-card-text'>
        <h5>Описание</h5>
        <p>Утилита более 30 функций-БЕССМЕРТИЕ,БЕСКОНЕЧНЫЕ КРЕДИТЫ,ОПЫТ И МНОГОЕ ДРУГОЕ</p>
      </div>

      <div className="offer-card-bottom">
        <h5 className='fw-7'>105,91 <span className='rouble'>₽</span></h5>
        <button type='button' className='btn-1'>К объявлению</button>
      </div>
    </div>
  );
};

export default OfferCard;