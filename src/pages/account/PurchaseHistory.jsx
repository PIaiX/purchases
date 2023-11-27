import React, { useEffect, useState } from 'react';
import NavPagination from '../../components/NavPagination';
import OfferLine3 from '../../components/OfferLine3';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { useSelector } from "react-redux";
import { getOrders } from "../../services/order"

const PurchaseHistory = () => {
  const userId = useSelector(state => state.auth?.user?.id);
  const [orders, setOrders] = useState();
  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders((prev) => ({
          prev,
          ...res,
        }))
      })
  }, []);
  return (
    <section className='mb-6'>
      <ReturnTitle link={'/account'} title={'История покупок'} />

      <div className="list-wrapping">
        <div className="list-wrapping-top px-0">
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
          <ul className='row row-cols-1 row-cols-sm-2 row-cols-xl-1 g-4 g-xl-0'>
            {orders?.items.map((item) => (
              <li>
                <OfferLine3 date={item.createdAt} descr={item.comment} seller={item.author.nickname} id={item.id} status={item.status} price={item.total} />
              </li>
            ))}
          </ul>
        </div>
        <div className="list-wrapping-bottom">
          <NavPagination />
        </div>
      </div>
    </section>
  );
};

export default PurchaseHistory;