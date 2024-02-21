import React from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';
import { getImageURL } from '../helpers/all';

const OfferLine = ({ id, uid, desc, price, count, server, user, total, notDesc, options }) => {
  const image = getImageURL({ path: user.media, type: "user" })
  return (
    <div className={server ? 'offer-line' : 'offer-line-no'}>
      {server && <div className="serv"><Link to={`/game/lot/${uid}`}>{server?.title}</Link></div>}
      <div className="descr"><Link to={`/game/lot/${uid}`}>
        {!notDesc ?
          <>
            <span>{desc}</span>
            {options?.map((item) => (
              item?.option?.data?.desc &&
              <>
                <span className='me-2'>,</span>
                <span className={item?.value && 'me-2'}>{item?.option?.title}</span>
                {item?.value && <span>{item?.value}</span>}
              </>
            ))}

          </>
          :
          <>
            <span>{count}</span>
            <span className='gray ms-1'>шт.</span>
          </>
        }
      </Link></div>
      <div className="seller">
        <Link to='/trader'><img src={image} alt={user.nickname} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to='/trader'>{user.nickname}</Link></h5>
          <StarRating value={user.rating} />
        </div>
      </div>
      <div className='price'><Link to={`/game/lot/${uid}`}>{total}&nbsp;<span className='rouble ms-1'>₽</span></Link></div>
    </div>
  );
};

export default OfferLine;