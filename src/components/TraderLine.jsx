import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';

const TraderLine = ({ desc, count, total, server, param, uid }) => {
  return (
    <Link to={`/game/lot/${uid}`} className='trader-line'>
      <div className="category">{param?.title}</div>
      <div className="server">{server?.title}</div>
      <div className="title">{desc}</div>
      <div className="count">{count}</div>
      <div className='price'>{total}
        <span className='rouble ms-1'>₽</span>
      </div>
    </Link>
  );
};

export default TraderLine;