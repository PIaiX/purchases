import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';

const OfferLine3 = ({ uid, id, author, user, product, createdAt, status, total, onStatus, price }) => {
  const userId = useSelector(state => state.auth?.user?.id);
  const profileId = (user.id == userId) ? author.id : user.id;
  const nickname = (user.id == userId) ? author.nickname : user.nickname;
  const rating = (user.id == userId) ? author.rating : user.rating;
  const image = getImageURL({ path: ((user.id == userId) ? author : user), type: "user" })
  const coly = user.id == userId ? total : price;
  return (
    <div className="offer-line-3">
      <div className="date">

        <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
        <span className='ms-3 gray'>{moment(createdAt).format("kk:mm")}</span>

      </div>
      <div className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <div>{uid.toUpperCase()}</div>
      </div>
      <div className="descr"><Link to={`/game/lot/${product.uid}`}>{product.title}</Link></div>
      <div className="seller">
        <Link to={`/trader/${profileId}`}><img src={image} alt="User8name" /></Link>
        <div>
          <h6 className='text-start mb-xl-1'><Link to={`/trader/${profileId}`}>{nickname}</Link></h6>
          <StarRating value={rating} />
        </div>
      </div>
      <div className="status">
        <span className='d-xl-none me-2'>Статус: </span>
        {status == "ok" ?
          <div className='blue'>Подтверждено</div>
          : status == "cancel" ?
            <div className='blue'>Отменено</div>
            :
            (user.id == userId ?
              <button className='btn-5 py-1 px-2' onClick={() => onStatus({ id: id, status: "ok" })}>Подтвердить</button>
              : <button className='btn-3 py-1 px-2' onClick={() => onStatus({ id: id, status: "cancel" })}>Отменить</button>
            )
        }
      </div>
      <div className="price">{coly}&nbsp;&nbsp;₽</div>
    </div>
  );
};

export default OfferLine3;