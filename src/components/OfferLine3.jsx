import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';
import { useSelector } from 'react-redux';

const OfferLine3 = ({ id, author, user, comment, createdAt, status, total }) => {
  const userId = useSelector(state => state.auth?.user?.id);
  const nickname = (user.id == userId) ? author.nickname : user.nickname;
  const rating = (user.id == userId) ? author.rating : user.rating;
  const image = getImageURL({ path: ((user.id == userId) ? author : user), type: "user" })

  return (
    <div className="offer-line-3">
      <div className="date">

        <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
        <span className='ms-3 gray'>{moment(createdAt).format("kk:mm")}</span>

      </div>
      <div className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <div>{id}</div>
      </div>
      <div className="descr">{comment}</div>
      <div className="seller">
        <img src={image} alt="User8name" />
        <div>
          <h6 className='text-start mb-xl-1'>{nickname}</h6>
          <StarRating value={rating} />
        </div>
      </div>
      <div className="status">
        <span className='d-xl-none me-2'>Статус: </span>
        {status == "ok" ?
          <div className='blue'>Подтверждено</div>
          :
          <button type='button' className='btn-5 py-1 px-2'>{status}</button>
        }
      </div>
      <div className="price">{total}&nbsp;&nbsp;₽</div>
    </div>
  );
};

export default OfferLine3;