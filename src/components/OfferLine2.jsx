import React from 'react';
import { FiEdit } from "react-icons/fi";

const OfferLine2 = ({ id, desc, price }) => {
  return (
    <div className="offer-line-2">
      <div className="descr">{desc}</div>
      <div className='d-flex align-items-center'>
        <div className='price'>{price} ₽</div>
        <div className="btns">
          <button type='button'><FiEdit /></button>
        </div>
      </div>
    </div>
  );
};

export default OfferLine2;