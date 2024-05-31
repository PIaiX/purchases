import React, { useMemo } from 'react';
import StarRating from './utils/StarRating';
import { Link } from 'react-router-dom';
import { getImageURL } from '../helpers/all';

const OfferLine = ({ title, uid, desc, servers, count, server, user, total, notDesc, options, data, opt }) => {
  const image = getImageURL({ path: user.media, type: "user" })
  const renderOptions = useMemo(() => {

    return options.map((item, i) => {
      const option = item.option;
      const key = option.id || i;
      if (option?.parent && opt) {
        let spanOpt = treeAll(option, opt);
        if (spanOpt[0].data?.desc) {
          return spanOpt.map((item, index) => (
            <React.Fragment key={item.id}>
              <span className={index !== spanOpt.length - 1 && 'me-2'}>{item.title}</span>
              {options?.length !== index + 1 && options[index + 1]?.option?.data?.desc && index === spanOpt.length - 1 && (
                <span className="me-2">,</span>
              )}
            </React.Fragment>
          ));
        }
      }


      if (!option || !option.data || !option.data.desc) return null; // Проверка наличия данных

      const title = option.title || '';
      const value = item.value || '';

      return (
        <React.Fragment key={key}>
          <span className={value && 'me-2'}>{title}</span>
          {value && <span>{value}</span>}
          {options?.length != (i + 1) && < span className="me-2">,</span>}
        </React.Fragment >
      );
    });
  }, [options, desc]);

  return (
    <div className={server ? 'offer-line' : 'offer-line-no'}>
      {server && <Link to={`/game/lot/${uid}`} className="serv">{server?.title}</Link>}
      <Link to={`/game/lot/${uid}`} className="descr">{title}</Link>
      <div className="seller">
        <Link to={`/trader/${user.id}`}><img src={image} alt={user.nickname} /></Link>
        <div>
          <h5 className='mb-xl-1'><Link to={`/trader/${user.id}`}>{user.nickname}</Link></h5>
          <StarRating value={user.rating} />
        </div>
      </div>
      <div className="availability">
        <Link to={`/game/lot/${uid}`}>
          <span>{count}</span>
          <span className='gray d-inline d-xl-none ms-1'>шт.</span>
        </Link>
      </div>
      <div className='price'><Link to={`/game/lot/${uid}`}> {Math.round(parseFloat(total) * 10000) / 10000}&nbsp;<span className='rouble ms-1'>₽</span></Link></div>
    </div>
  );
};

export default OfferLine;