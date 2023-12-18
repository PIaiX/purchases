import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';

const OfferLine = ({ id, title, desc, price, count, server }) => {

  return (
    <div className='offer-line'>
      <div className="serv">{server.title}</div>
      <div className="descr"><Link to={`/game/lot/${id}`}>{title}</Link></div>
      {/* <div className="seller">
        <Link to='/trader'><img src={props.sellerImg} alt={props.seller} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to='/trader'>{props.seller}</Link></h5>
          <StarRating rate={props.sellerRating} />
        </div>
      </div> */}
      <div className="availability">
        <span>{count}</span>
        <span className='gray d-inline d-xl-none ms-1'>шт.</span>
      </div>
      <div className='price'>{price} <span className='rouble ms-1'>₽</span></div>
    </div>
  );
};

export default OfferLine;