import React, { useMemo } from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';

const OfferLine3 = ({ uid, id, author, user, product, createdAt, status, total, onStatus, price, }) => {
  const userId = useSelector(state => state.auth?.user?.id);
  const profileId = (user.id == userId) ? author.id : user.id;
  const nickname = (user.id == userId) ? author.nickname : user.nickname;
  const rating = (user.id == userId) ? author.rating : user.rating;
  const image = getImageURL({ path: ((user.id == userId) ? author?.media : user?.media), type: "user", size: "mini" })
  const coly = user.id == userId ? total : price;
  const renderOptions = useMemo(() => {

    return product.options?.map((item, i) => {
      const option = item.option;
      if (!option || !option.data || !option.data.desc) return null; // Проверка наличия данных
      const key = option.id || i; // Использование уникального идентификатора или индекса
      const titleOpt = option.title || '';
      const value = item.value || '';

      return (
        <React.Fragment key={key}>
          <span className={value && 'me-2'}>{titleOpt}</span>
          {value && <span>{value}</span>}
          {/* {options?.length != (i + 1) && options[i + 1]?.option?.data?.desc &&  */}
          < span className="me-2">,</span>
        </React.Fragment >
      );
    });
  }, [product]);
  return (
    <div className="offer-line-3">
      <Link to={`/account/order/${uid}`} className="date">

        <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
        <span className='ms-3 gray'>{moment(createdAt).format("kk:mm")}</span>

      </Link>
      <Link to={`/account/order/${uid}`} className="id">
        <span className='d-xl-none me-2'>ID заказа:</span>
        <div>{uid.toUpperCase()}</div>
      </Link>
      <Link to={`/account/order/${uid}`} className="descr">
        {product.serverTitle && <span className='me-2'>{product.serverTitle},</span>}
        {product.title && <span className='me-2'>{product.title},</span>}
        {product.desc && <span className='me-2'>{product.desc},</span>}
        {product.options && product.options?.length > 0 && renderOptions}
      </Link>
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
              <button className='btn-5 py-1 px-2' onClick={() => onStatus({ id: id, status: "ok", authorId: 0 })}>Подтвердить</button>
              : <button className='btn-3 py-1 px-2' onClick={() => onStatus({ id: id, status: "cancel", authorId: 1 })}>Отменить</button>
            )
        }
      </div>
      <Link to={`/account/order/${uid}`} className="price">{coly}&nbsp;&nbsp;₽</Link>
    </div>
  );
};

export default OfferLine3;