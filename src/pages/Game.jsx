import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import ServerSwitcher from '../components/utils/ServerSwitcher';
import GameСover from '../components/svg/GameСover';
import OfferLine from '../components/OfferLine';
import useIsMobile from '../hooks/isMobile';
import FilterIcon from '../components/svg/FilterIcon'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import TableDate from '../components/TableDate';
import { getGame } from '../services/game';


const Game = () => {
  const { id } = useParams();
  const isMobileLG = useIsMobile('1109px');
  const [filterShow, setFilterShow] = useState((!isMobileLG) ? true : false);
  const searchParams = new URLSearchParams(window.location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [catId, setCatId] = useState(searchParams.get('catId'));
  const [regId, setRegId] = useState(searchParams.get('regId'));

  const productsPerPage = 3;
  const totalProducts = TableDate.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = TableDate.slice(indexOfFirstProduct, indexOfLastProduct);
  const [games, setGames] = useState({ items: [], loading: true });
  useEffect(() => {
    searchParams.set('catId', catId);
    searchParams.set('regId', regId);
    searchParams.set('currentPage', currentPage);
    Object.keys(filters).forEach(key => {
      searchParams.set(key, filters[key]);
    });

    getGame({ catId: catId, regId: regId, page: currentPage, filters: filters, id })
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));
      })
  }, [regId, catId, currentPage, filters]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleParamClick = (paramId) => {
    setCatId(paramId);
  };

  const handleServerChange = (regionId) => {
    setRegId(regionId);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  console.log(filters)
  return (
    <main>
      <Container>
        <NavBreadcrumbs />
      </Container>

      <section className='page-game pb-2 pb-4 pb-md-5'>
        <Container className='mb-lg-5'>
          <div className="page-game-top">
            <h1 className='mb-4 mb-xxxl-5'>{games.items?.category?.title}</h1>
            <Row>
              <Col xs={12} xl={7}>
                {games?.items?.category?.regions && games.items.category.regions.length > 0 && (
                  <ServerSwitcher serversArr={games.items.category.regions} onChange={handleServerChange} active={regId} />
                )}
                <ul className='categories'>
                  {games?.items?.category?.params?.length > 0 && games.items.category.params.map((param) => (
                    <li key={param.id}><button type='button' className={param.id == catId ? 'active' : ''} onClick={() => handleParamClick(param.id)}>{param.title}</button></li>
                  ))}
                  <div className="img">
                    <GameСover />
                    <div className="img-lots">
                      <div className='num'>856</div>
                      <div>лотов</div>
                    </div>
                  </div>
                </ul>

                <form action="" className='filter mb-4 mb-xxxl-5'>
                  {
                    (isMobileLG) &&
                    <button onClick={() => setFilterShow(!filterShow)} type='button' className='dark-blue fs-12 fw-5'>
                      <span className='me-2'>Фильтры</span>
                      <FilterIcon className="fs-12" />
                    </button>
                  }
                  {
                    (filterShow) &&
                    <fieldset>
                      <label className='fs-12 me-sm-4 me-md-5 mb-3'>
                        <span className='me-2'>Только продавцы онлайн</span>
                        <input type="checkbox" />
                      </label>
                      <input type="search" className='me-sm-4 me-md-5 mb-3' placeholder='Поиск по описанию' />


                      {games?.items?.category?.params?.length > 0 && games.items.category.params.map((param) => (

                        (param.id === catId &&
                          param.options.map(e => {
                            let options = param.options.filter(item => (item.parent == e.id || item.id == e.id) && item.paramId == catId)
                            console.log(options, 124124124)
                            if (!e.parent) {
                              return <select name={e.name} className=' me-sm-4 me-md-5 mb-3'>
                                {
                                  options?.length > 0 && options.map(item => (
                                    <option onClick={(e) => handleFilterChange(item.id, e.target.value)} key={item.id - 1} value={item.id - 1} >{item.title}</option>
                                  ))
                                }
                              </select>
                            }

                          }))))}

                    </fieldset>

                  }
                </form>
              </Col>
            </Row>
          </div>

          <div className="page-game-offers">
            <div className="top">
              <div className="serv">Сервер</div>
              <div className='descr'>Описание</div>
              <div className='seller'>Продавец</div>
              <div className='availability'>Наличие, шт.</div>
              <div className='price'>Цена</div>
            </div>
            <ul className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-1 g-3'>
              {currentProducts.map((item) => (
                <li>
                  <OfferLine id={item.id} serv={item.serv} descr={item.descr} seller={item.seller} sellerRating={item.sellerRating} sellerImg={item.sellerImg} count={item.count} price={item.price} />
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </Container>
      </section>
    </main >
  );
};

export default Game;