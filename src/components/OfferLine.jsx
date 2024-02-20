import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';
import { getImageURL } from '../helpers/all';

const OfferLine = ({ id, title, user, price, count, server }) => {
  const image = getImageURL({ path: user, type: "user" })
  return (
    <div className='offer-line'>
      <div className="serv">{server?.title}</div>
      <div className="descr"><Link to={`/game/lot/${id}`}>{title}1</Link></div>
      <div className="seller">
        <Link to='/trader'><img src={image} alt={user.nickname} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to='/trader'>{user.nickname}</Link></h5>
          <StarRating value={user.rating} />
        </div>
      </div>
      <div className="availability">
        <span>{count}</span>
        <span className='gray d-inline d-xl-none ms-1'>шт.</span>
      </div>
      <div className='price'>{price} <span className='rouble ms-1'>₽</span></div>
    </div>
  );
};

export default OfferLine;