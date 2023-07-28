import React from 'react';
import StarRating from './utils/StarRating';
import {Link} from 'react-router-dom';

const TraderLine = (props) => {
  return (
    <div className='trader-line'>
      <div className="serv">{props.serv}</div>
      <div className="descr">{props.descr}</div>
      <div className='price'>{props.price} 
        <span className='rouble ms-1'>₽</span>
      </div>
    </div>
  );
};

export default TraderLine;