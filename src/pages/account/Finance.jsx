import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import NavPagination from "../../components/NavPagination";
import Operation from "../../components/Operation";
import ReturnTitle from "../../components/utils/ReturnTitle";
import { customPrice } from "../../helpers/all";
import Meta from "../../components/Meta";
import { getTransactions } from "../../services/transaction"
import Loader from '../../components/utils/Loader';

const Finance = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const { user } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getTransactions({ page: currentPage })
      .then((res) => {
        setTransactions((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setOrders((prev) => ({ ...prev, loading: false })));
  }, [currentPage]);
  const [balanceSection, setBalanceSection] = useState(2);
  if (transactions.loading) {
    return <Loader full />;
  }
  return (
    <section className="sec-finance mb-6">
      <Meta title="Финансы" />
      <ReturnTitle link="/account" title="Финансы" />

      {/* <div className="list-wrapping mb-4 mb-sm-5">
        <div className="list-wrapping-top">
          <h5 className='fw-6'>Заголовок о комиссии</h5>
        </div>
        <div className="list-wrapping-main">
          <div className='d-sm-flex align-items-center justify-content-between'>
            <p className='fs-11'>Биржа предлагает самые выгодные условия для осуществления сделок. <br/>Операции облагаются комиссией 4%.</p>
            <button type='button' className='btn-1 d-flex align-items-center ms-sm-5 mt-4 mt-sm-0'>
              <span>Подробнее</span>
              <RxChevronRight className='fs-12'/>
            </button>
          </div>
        </div>
      </div> */}

      <div className="d-xl-flex mb-4 mb-sm-5">
        <div className="balance me-xl-3 me-xxl-5 mb-4 mb-xl-0">
          <span className="fw-6 me-2 me-xxl-3">Баланс</span>
          <span className="title-font fs-20 me-1">
            {customPrice(user.cash)}
          </span>
        </div>
        <ul className="list-unstyled d-flex justify-content-between justify-content-sm-start">
          <li className="me-1 me-sm-3 me-xxl-5">
            <button
              type="button"
              className={
                balanceSection === 1
                  ? "btn-2 active h-100 px-2 px-sm-4"
                  : "btn-2 h-100 px-2 px-sm-4"
              }
              onClick={() => setBalanceSection(1)}
            >
              Пополнить баланс
            </button>
          </li>
          <li className="me-1 me-sm-3 me-xxl-5">
            <button
              type="button"
              className={
                balanceSection == 2
                  ? "btn-2 active h-100 px-2 px-sm-4"
                  : "btn-2 h-100 px-2 px-sm-4"
              }
              onClick={() => setBalanceSection(2)}
            >
              История операций
            </button>
          </li>
          <li>
            <div className="btn-2 h-100 px-2 px-sm-4">Вывести средства</div>
          </li>
        </ul>
      </div>

      {balanceSection === 1 && (
        <section>
          <h3 className="mb-4">Выберите способ оплаты</h3>
          <ul className="list-unstyled row row-cols-4">
            <li>
              <label>
                <input type="radio" name="payment-method" />
                <span>Банковская карта</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="payment-method" />
                <span>Банковская карта</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="payment-method" />
                <span>Банковская карта</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="payment-method" />
                <span>Банковская карта</span>
              </label>
            </li>
          </ul>
        </section>
      )}

      {balanceSection === 2 && (
        transactions?.pagination?.totalPages ? (
          <div className="list-wrapping">
            <div className="list-wrapping-top px-0">
              <ul className="line-operation">
                <li className="date">Дата</li>
                <li className="id">ID операции</li>
                <li className="type">Тип</li>
                <li className="stat">Статус</li>
                <li className="sum">Сумма</li>
              </ul>
            </div>
            <div className="list-wrapping-main">
              {transactions.loading ? (
                <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                  Загрузка операций...
                </div>
              ) : (
                <ul className="row row-cols-1 row-cols-md-2 row-cols-xl-1 g-4 g-xl-0">
                  {transactions?.items.map((item) => (
                    <li>
                      <Operation {...item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="list-wrapping-bottom">
              <NavPagination totalPages={transactions?.pagination?.totalPages} onPageChange={onPageChange} />
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-4">
            <h3>
              Нет операций
            </h3>
          </div>
        )
      )}
    </section>
  );
};

export default Finance;
