import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';

const TraderLine = ({ title, desc, price, server }) => {
  return (
    <div className='trader-line'>
      <div className="serv">{server?.title}</div>
      <div className="descr">{title}</div>
      <div className='price'>{price}
        <span className='rouble ms-1'>₽</span>
      </div>
    </div>
  );
};

export default TraderLine;