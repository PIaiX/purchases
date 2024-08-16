import React, { useCallback, useEffect, useState } from 'react';
import NavPagination from '../../components/NavPagination';
import OfferLine3 from '../../components/OfferLine3';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { editOrder, getOrders } from "../../services/order"
import Loader from '../../components/utils/Loader';
import Meta from '../../components/Meta';
import { NotificationManager } from 'react-notifications';

const SalesHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [orders, setOrders] = useState({
    loading: true,
    items: [],
  });
  const getPage = () => {
    getOrders({ page: currentPage, authorId: 1, size: 10 })
      .then((res) => {
        setOrders((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setOrders((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    getPage();
  }, [currentPage]);
  const onStatus = useCallback((status) => {
    editOrder(status)
      .then((res) => {
        getPage();
        NotificationManager.success("Сделка отменена");
      })
      .catch((err) => {
        NotificationManager.error(
          err?.response?.data?.error ?? "Неизвестная ошибка при отправке"
        );
      });

  }, []);
  if (orders.loading) {
    return <Loader full />;
  }
  return (
    <section className='mb-6'>
      <Meta title="История продаж" />
      <ReturnTitle link={'/account'} title={'История Продаж'} />
      {orders?.pagination?.totalItems > 0 ? (
        <div className="list-wrapping">
          <div className="list-wrapping-top">
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
                    <OfferLine3 {...item} onStatus={onStatus} />
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
            Нет продаж
          </h3>
        </div>
      )
      }
    </section>
  );
};

export default SalesHistory;