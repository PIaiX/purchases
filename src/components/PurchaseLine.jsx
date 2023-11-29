import React from 'react';
import { Link } from 'react-router-dom';
import { RxChevronRight } from "react-icons/rx";
import moment from 'moment';
import { getImageURL } from '../helpers/all';

const PurchaseLine = ({ createdAt, comment, author, id }) => {
  const image = getImageURL({ path: author, type: "user" })
  return (
    <div className="purchase-line">
      <time>
        <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
        <span className='ms-3 gray'>{moment(createdAt).format("kk:mm")}</span>
      </time>
      <div className='purchase-line-text'>{comment}</div>
      <div className='purchase-line-user'>
        <img src={image} alt="user" className='me-2' />
        <div>
          <h6 className='mb-1'>{author.nickname}</h6>
          <Link to={`add/${id}`} className='btn-6 px-3 py-2'>Оценить</Link>
        </div>
        <button type='button' className='blue fs-14 ms-4'><RxChevronRight /></button>
      </div>
    </div>
  );
};

export default PurchaseLine;