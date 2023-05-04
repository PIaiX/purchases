import React from 'react';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';
import NavPagination from '../../components/NavPagination';
import OfferLine3 from '../../components/OfferLine3';

const SalesHistory = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <div className="d-flex align-items-center mb-4 mb-lg-5">
        <Link to='/account' className='d-flex d-lg-none fs-20 blue me-4'>
          <ReturnIcon/>
        </Link>
        <h1 className='h2 mb-0'>История Продаж</h1>
      </div>

      <div className="list-wrapping">
            <div className="list-wrapping-top">
              <ul className='line-3'>
                <li className="date">Дата</li>
                <li className="id">ID заказа</li>
                <li className="descr">Детали</li>
                <li className="seller">Продавец</li>
                <li className="status">Статус</li>
                <li className="price">Цена</li>
              </ul>
            </div>
            <div className="list-wrapping-main">
              <ul className='row row-cols-1 row-cols-sm-2 row-cols-xl-1 g-3'>
                <li>
                  <OfferLine3/>
                </li>
                <li>
                  <OfferLine3/>
                </li>
                <li>
                  <OfferLine3/>
                </li>
                <li>
                  <OfferLine3/>
                </li>
                <li>
                  <OfferLine3/>
                </li>
                <li>
                  <OfferLine3/>
                </li>
              </ul>
            </div>
            <div className="list-wrapping-bottom">
              <NavPagination/>
            </div>
          </div>
    </section>
  );
};

export default SalesHistory;