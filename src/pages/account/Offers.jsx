import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from "react-icons/fi";
import GameMiniCard from '../../components/GameMiniCard';
import NavPagination from '../../components/NavPagination';
import OfferLine2 from '../../components/OfferLine2';
import Plus from '../../components/svg/Plus';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { getUserProducts } from '../../services/product';
import Loader from '../../components/utils/Loader';
import Meta from '../../components/Meta';
import Add from '../../components/svg/Add';

const Offers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
    getPage(page.selected + 1, currentGame);
  };
  const [currentGame, setCurrentGame] = useState(null)
  const [products, setProducts] = useState({
    loading: true,
    items: [],
  });
  const [showAll, setShowAll] = useState(false);
  const [numCols, setNumCols] = useState(4); // Изначальное количество колонок

  const handleResize = () => {
    if (window.innerWidth < 576) {
      setNumCols(2);
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      setNumCols(3);
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      setNumCols(4);
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      setNumCols(5);
    } else {
      setNumCols(6);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getPage = (page, game) => {
    getUserProducts({ page: page, categoryId: game })
      .then((res) => {
        if (!currentGame) {
          setCurrentGame(res?.categories[0].id)
        }
        setProducts((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setProducts((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    getPage(1, null);
  }, []);

  const onGameChange = (id) => {
    setCurrentGame(1);
    setCurrentGame(id);
    getPage(1, id);
  };
  if (products.loading) {
    return <Loader full />;
  }
  return (
    <section className='mb-6'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          <ReturnTitle link={'/account'} title={'Мои объявления'} />
          <Meta title="Мои объявления" />
          {products?.products?.pagination?.totalItems > 0 ?
            (<>
              <div className="d-flex align-items-start">
                <Link to='add' className='btn-add-offer me-3 me-md-4'>
                  <Add />
                </Link>
                <div className='flex-1'>
                  <ul className={`list-unstyled g-2 g-sm-4 row row-cols-${numCols} ${products.categories.length <= numCols ? 'mb-4 mb-sm-5' : ''}`}>
                    {products?.categories.slice(0, showAll ? products.categories.length : numCols).map((item, index) => (
                      <li key={index}>
                        <GameMiniCard {...item} currentGame={currentGame} />
                      </li>
                    ))}
                  </ul>
                  {!showAll && products.categories.length > numCols && (
                    <button
                      type='button'
                      className='d-flex flex-column align-items-center pale-blue fs-12 mx-auto mt-4 mb-4 mb-sm-5'
                      onClick={() => setShowAll(true)}
                    >
                      <span>Показать все</span>
                      <FiChevronDown className='fs-13' />
                    </button>
                  )}
                </div>
              </div>

              <div className="list-wrapping">
                <div className="list-wrapping-top">
                  <ul className='line-2'>
                    <li className='category'>Категория</li>
                    <li className='server'>Сервер</li>
                    <li className='title'>Название</li>
                    <li className='count'>Кол-во</li>
                    <li className='price'>Цена</li>
                    <li className='btns'></li>
                  </ul>
                </div>
                <div className="list-wrapping-main">
                  {products.loading ? (
                    <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                      Загрузка лотов...
                    </div>
                  ) : (
                    <ul className='g-4 g-xl-0 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-1'>
                      {products?.products?.items.map((item) => (
                        <li>
                          <OfferLine2 {...item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="list-wrapping-bottom">
                  <NavPagination totalPages={products?.products?.pagination?.totalPages} onPageChange={onPageChange} />
                </div>
              </div>
            </>
            ) : (
              <div className="notOffer">
                <img src="/imgs/NotOffer.jpg" alt="" />
                <div>
                  <h4>
                    У вас нет ни одного обьявления
                  </h4>
                  <Link to="add" type='button' className='btn-1'>Создать объявление</Link>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Offers;