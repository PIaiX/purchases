import React, { useEffect, useState } from 'react';
import NavPagination from '../../components/NavPagination';
import OfferLine3 from '../../components/OfferLine3';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { getOrders } from "../../services/order"
import Loader from '../../components/utils/Loader';
import Meta from '../../components/Meta';

const PurchaseHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [orders, setOrders] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getOrders({ page: currentPage, authorId: 0 })
      .then((res) => {
        setOrders((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setOrders((prev) => ({ ...prev, loading: false })));
  }, [currentPage]);
  if (orders.loading) {
    return <Loader full />;
  }
  return (
    <section className='mb-6'>
      <Meta title="История покупок" />
      <ReturnTitle link={'/account'} title={'История покупок'} />
      {orders?.pagination?.totalItems > 0 ? (
        < div className="list-wrapping">
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

            {orders.loading ? (
              <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                Загрузка историй...
              </div>
            ) : (
              <ul className='row row-cols-1 row-cols-sm-2 row-cols-xl-1 g-4 g-xl-0'>
                {orders?.items.map((item) => (
                  <li>
                    <OfferLine3 {...item} />
                  </li>
                ))}
              </ul>
            )}

          </div>
          <div className="list-wrapping-bottom">
            <NavPagination totalPages={orders?.pagination?.totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-4">
          <h3>
            Нет покупок
          </h3>
        </div>
      )
      }
    </section >
  );
};

export default PurchaseHistory;