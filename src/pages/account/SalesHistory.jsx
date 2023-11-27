import React, { useEffect, useState } from 'react';
import NavPagination from '../../components/NavPagination';
import OfferLine3 from '../../components/OfferLine3';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { getOrders } from "../../services/order"

const SalesHistory = () => {
  const [orders, setOrders] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getOrders({ authorId: true })
      .then((res) => {
        setOrders((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
      })
      .catch(() => setOrders((prev) => ({ ...prev, loading: false })));
  }, []);
  return (
    <section className='mb-6'>
      <ReturnTitle link={'/account'} title={'История Продаж'} />

      <div className="list-wrapping">
        <div className="list-wrapping-top px-0">
          <ul className='line-3'>
            <li className="date">Дата</li>
            <li className="id">ID заказа</li>
            <li className="descr">Детали</li>
            <li className="seller">Покупатель</li>
            <li className="status">Статус</li>
            <li className="price">Цена</li>
          </ul>
        </div>
        <div className="list-wrapping-main">
          {orders.loading ? (
            <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
              Загрузка историй...
            </div>
          ) : (
            <ul className='row row-cols-1 row-cols-sm-2 row-cols-xl-1 g-4 g-xl-0'>
              {orders?.items.map((item) => (
                <li>
                  <OfferLine3 date={item.createdAt} descr={item.comment} seller={item.user.nickname} id={item.id} status={item.status} price={item.total} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="list-wrapping-bottom">
          <NavPagination />
        </div>
      </div>
    </section>
  );
};

export default SalesHistory;