import React, { useMemo } from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';
import { customPrice, getImageURL, treeAll } from '../helpers/all';

const OfferLine = ({ title, uid, desc, servers, count, server, user, total, notDesc, options, data, opt }) => {
  const image = useMemo(() => getImageURL({ path: user?.media }), [user?.media]);


  const renderOptions = useMemo(() => {

    return options.map((item, i) => {
      const option = item.option;
      const key = option.id || i;
      if (!option || !option.data || !option.data.desc) return null; // Проверка наличия данных

      const titleOption = option.title || '';
      const valueOption = item.value || '';

      return (
        <React.Fragment key={key}>
          <span className={valueOption && 'me-2'}>{titleOption}</span>
          {valueOption && <span>{valueOption}</span>}
          {options?.length != (i + 1) && < span className="me-2">,</span>}
        </React.Fragment >
      );
    });
  }, [options, desc]);


  return (
    <div className={data?.servers ? 'offer-line' : 'offer-line-no'}>
      {server && <Link to={`/game/lot/${uid}`} className="serv">{server?.title}</Link>}
      <Link to={`/game/lot/${uid}`} className="descr">
        {title && <span className='clamp-on'>{title}</span>}
        {desc && <span className='clamp-on'>, {desc}<br /></span>}
        {options && options?.length > 0 && <div className='clamp-on'>, {renderOptions}</div>}
      </Link>
      <div className="seller">
        <Link to={`/trader/${user.id}`}><img src={image} alt={user.nickname} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to={`/trader/${user.id}`}>{user.nickname}</Link></h5>
          <StarRating value={user.rating} />
        </div>
      </div>
      <Link to={`/game/lot/${uid}`} className="availability">
        <span>{count}</span>
        <span className='gray d-inline d-xl-none ms-1'>шт.</span>
      </Link>
      <Link to={`/game/lot/${uid}`} className='price'> {customPrice(Math.round(parseFloat(total) * 10000) / 10000)}</Link>
    </div >
  );
};

export default OfferLine;