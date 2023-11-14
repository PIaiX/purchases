import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';

const OfferLine = (props) => {
  const propsLot = props;
  console.log(propsLot);
  return (
    <div className='offer-line'>
      <div className="serv">{props.serv}</div>
      <div className="descr"><Link to={`/game/lot/?data=${propsLot}`}>{props.descr}</Link></div>
      <div className="seller">
        <Link to='/trader'><img src={props.sellerImg} alt={props.seller} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to='/trader'>{props.seller}</Link></h5>
          <StarRating rate={props.sellerRating} />
        </div>
      </div>
      <div className="availability">
        <span>{props.count}</span>
        <span className='gray d-inline d-xl-none ms-1'>шт.</span>
      </div>
      <div className='price'>{props.price} <span className='rouble ms-1'>₽</span></div>
    </div>
  );
};

export default OfferLine;