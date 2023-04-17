import React from 'react';
import StarRating from './utils/StarRating';

const OfferLine = (props) => {
  return (
    <div className='offer-line'>
      <div className="serv">{props.serv}</div>
      <div className="descr">{props.descr}</div>
      <div className="seller">
        <img src={props.sellerImg} alt={props.seller} />
        <div>
          <h5>{props.seller}</h5>
          <StarRating rate={props.sellerRating}/>
        </div>
      </div>
      <div className="count">{props.count}</div>
      <div className='price'>{props.price} ₽</div>
    </div>
  );
};

export default OfferLine;