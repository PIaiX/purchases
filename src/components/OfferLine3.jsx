import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';

const OfferLine3 = ({ id, author, user, comment, createdAt, status, total, onStatus }) => {
  const userId = useSelector(state => state.auth?.user?.id);
  const profileId = (user.id == userId) ? author.id : user.id;
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
        <Link to={`/profile/${profileId}`}><img src={image} alt="User8name" /></Link>
        <div>
          <h6 className='text-start mb-xl-1'><Link to={`/profile/${profileId}`}>{nickname}</Link></h6>
          <StarRating value={rating} />
        </div>
      </div>
      <div className="status">
        <span className='d-xl-none me-2'>Статус: </span>
        {status == "ok" ?
          <div className='blue'>Подтверждено</div>
          :
          (user.id == userId ?
            <>

              <div className='green'>в процессе</div>
              <Dropdown className="d-flex align-items-center">
                <Dropdown.Toggle
                  as={React.forwardRef(({ children, onClick }, ref) => (
                    <Link
                      ref={ref}
                      className="green py-0"
                      onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
                      }}
                    >
                      <IoEllipsisVertical size={20} />
                    </Link>
                  ))}
                />
                <Dropdown.Menu align="end">
                  <Dropdown.Item className='btn-5 py-1 px-2' onClick={() => onStatus({ id: id, status: "ok", authorId: 0 })}>
                    <div>Подтвердить</div>

                  </Dropdown.Item>
                  <Dropdown.Item className='btn-3 py-1 px-2' onClick={() => onStatus({ id: id, status: "cancel", authorId: 0 })}>
                    <div>Отменить</div>

                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
            : <button className='btn-3 py-1 px-2' onClick={() => onStatus({ id: id, status: "cancel", authorId: 1 })}>Отменить</button>
          )
        }
      </div>
      <div className="price">{total}&nbsp;&nbsp;₽</div>
    </div>
  );
};

export default OfferLine3;