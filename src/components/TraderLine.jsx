import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';

const TraderLine = ({ title, desc, price }) => {
  return (
    <div className='trader-line'>
      <div className="serv">{title}</div>
      <div className="descr">{desc}</div>
      <div className='price'>{price}
        <span className='rouble ms-1'>₽</span>
      </div>
    </div>
  );
};

export default TraderLine;