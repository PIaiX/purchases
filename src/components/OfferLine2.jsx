import React, { useMemo } from 'react';
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OfferLine2 = ({ category, uid, param, status, title, desc, price, server, options, count }) => {

  return (
    <div className="offer-line-2">
      <Link to={`/game/lot/${uid}`} className='d-flex align-items-center'>
        <div className="category">
          {param?.title}
        </div>
        <div className="server">
          {server?.title}
        </div>
      </Link>
      <Link to={`/game/lot/${uid}`} className='title'>{title}</Link>

      <div className='d-flex align-items-center'>
        <Link to={`/game/lot/${uid}`} className='count'>{count}</Link>
        <Link to={`/game/lot/${uid}`} className='price'>{price} ₽</Link>
        <div className="btns">
          <button type='button'><Link to={`edit/${uid}`} >
            <FiEdit />
          </Link></button>
        </div>
      </div>

    </div >
  );
};

export default OfferLine2;