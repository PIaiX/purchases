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
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import TableDate from '../components/TableDate';
import { getGames } from '../services/game';


const Game = () => {
  const isMobileLG = useIsMobile('1109px');
  const [filterShow, setFilterShow] = useState((!isMobileLG) ? true : false);
  const location = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tableItems = TableDate;
  const dataItem = searchParams.get('data');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [catId, setCatId] = useState(searchParams.get('catId'));
  const [regId, setRegId] = useState(searchParams.get('regId'));

  const productsPerPage = 3;
  const totalProducts = TableDate.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = TableDate.slice(indexOfFirstProduct, indexOfLastProduct);

  const [games, setGames] = useState({ items: [], data: [], loading: true });
  useEffect(() => {
    const fetchGames = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('catId', catId);
      searchParams.set('regId', regId);
      searchParams.set('currentPage', currentPage);
      Object.keys(filters).forEach(key => {
        searchParams.set(key, filters[key]);
      });
      const newUrl = `${location.pathname}?${searchParams}`;
      navigate(newUrl);
      const gamesData = await getGames();
      if (gamesData) {
        let filteredGames = gamesData.filter(item => item.title === dataItem);
        setGames(prev => ({ ...prev, items: gamesData, data: filteredGames, loading: false }));
      }
    };

    fetchGames();
  }, [regId, catId, currentPage, filters, location.search, navigate]);
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

  return (
    <main>
      <Container>
        <NavBreadcrumbs />
      </Container>

      <section className='page-game pb-2 pb-4 pb-md-5'>
        <Container className='mb-lg-5'>
          <div className="page-game-top">
            <h1 className='mb-4 mb-xxxl-5'>{games.data[0]?.title}</h1>
            <Row>
              <Col xs={12} xl={7}>
                {games.data[0]?.regions && games.data[0]?.regions.length > 0 && (
                  <ServerSwitcher serversArr={games.data[0]?.regions} onChange={handleServerChange} active={regId} />
                )}
                <ul className='categories'>
                  {games.data[0]?.params.map((param) => (
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

                      {games.data[0]?.params.map((param) => (
                        (param.id === catId && param.options != '') &&
                        <select defaultValue={0} className='me-sm-4 me-md-5 mb-3'>
                          {param?.options?.length > 0 && [...param.options].sort((a, b) => a.id - b.id).map(item => (
                            <option onClick={(e) => handleFilterChange(item.paramId, e.target.value)} disabled={item.parent === 0} key={item.id - 1} value={item.id - 1} >{item.title}</option>
                          ))
                          }
                        </select>

                      ))}
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
                  <OfferLine serv={item.serv} descr={item.descr} seller={item.seller} sellerRating={item.sellerRating} sellerImg={item.sellerImg} count={item.count} price={item.price} />
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