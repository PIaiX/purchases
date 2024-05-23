import React, { useMemo } from 'react';
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OfferLine2 = ({ category, uid, status, title, desc, price, server, options }) => {
  console.log(options)
  const renderOptions = useMemo(() => {

    return options.map((item, i) => {
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
  }, [options]);
  return (
    <div className="offer-line-2">
      <div className="descr">
        {server && <span className='me-2'>{server.title},</span>}
        {title && <span className='me-2'>{title},</span>}
        {desc && <span className='me-2'>{desc},</span>}
        {options && options?.length > 0 && renderOptions}
      </div>
      <div className='d-flex align-items-center'>
        <div className='price'>{price} ₽</div>
        <div className="btns">
          <button type='button'><Link to={`edit/${uid}`} >
            <FiEdit />
          </Link></button>
        </div>
      </div>
    </div>
  );
};

export default OfferLine2;