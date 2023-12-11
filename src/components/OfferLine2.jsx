import React from 'react';
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OfferLine2 = ({ id, desc, price }) => {
  return (
    <div className="offer-line-2">
      <div className="descr">{desc}</div>
      <div className='d-flex align-items-center'>
        <div className='price'>{price} ₽</div>
        <div className="btns">
          <button type='button'><Link to={`edit/${id}`} >
            <FiEdit />
          </Link></button>
        </div>
      </div>
    </div>
  );
};

export default OfferLine2;