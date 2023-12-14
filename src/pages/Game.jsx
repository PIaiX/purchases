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
import { useParams } from 'react-router-dom';
import { getGame } from '../services/game';
import { declOfNum, getImageURL } from '../helpers/all';
import NavPagination from '../components/NavPagination';
import Loader from '../components/utils/Loader';
import { FiHeart } from 'react-icons/fi';
import Meta from '../components/Meta';


const Game = () => {
  const { id } = useParams();
  const isMobileLG = useIsMobile('1109px');
  const [filterShow, setFilterShow] = useState((!isMobileLG) ? true : false);
  const searchParams = new URLSearchParams(window.location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [catId, setCatId] = useState(searchParams.get('catId'));
  const [regId, setRegId] = useState(searchParams.get('regId'));
  const [serverId, setServerId] = useState(1);


  const [games, setGames] = useState({ items: [], loading: true });
  useEffect(() => {
    getGame({ param: catId, region: regId, server: serverId, id, })
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));
      })
  }, [regId, catId, serverId]);

  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleParamClick = (paramId) => {
    setCatId(paramId);
  };

  const handleRegionChange = (regionId) => {
    setRegId(regionId);
  };
  const handleServerChange = (serverId) => {
    setServerId(serverId);
  };
  const handleFilterChange = (id, event) => {
    setFilters({ ...filters, [id]: event });
  };

  const totalProducts = games?.items?.products?.length;
  const productsPerPage = 10;

  const pagesCount = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = games?.items?.products?.slice(indexOfFirstProduct, indexOfLastProduct);


  const image = getImageURL({ path: games?.items?.category, size: "max", type: "category" })
  const totalItems = games?.items?.products?.pagination?.totalItems ?? 0;
  const declension = declOfNum(totalItems, ['лот', 'лота', 'лотов']);
  console.log(indexOfFirstProduct)
  if (games.loading) {
    return <Loader full />;
  }
  return (
    <main>
      <Meta title={games.items?.category?.title ?? "Игра"} />
      <Container>
        <NavBreadcrumbs title="Каталог" />
      </Container>

      <section className='page-game pb-2 pb-4 pb-md-5'>
        <Container className='mb-lg-5'>
          <div className="page-game-top">
            <div className='mb-4 mb-xxxl-5 d-flex'>
              <h1 className=' my-4 '>{games.items?.category?.title}</h1>
              <button type="button">
                <FiHeart style={{ fontSize: "60px" }} />
              </button>
            </div>
            <Row>
              <Col xs={12} xl={7}>
                {games?.items?.category?.regions?.length > 0 && (
                  <ServerSwitcher serversArr={games.items.category.regions} onChange={handleRegionChange} active={regId} />
                )}
                <ul className='categories'>
                  {games?.items?.category?.params?.length > 0 && games.items.category.params.map((param) => (
                    <li key={param.id}><button type='button' className={param.id == catId ? 'active' : ''} onClick={() => handleParamClick(param.id)}>{param.title}</button></li>
                  ))}
                  <div className="img">
                    <GameСover image={image} />
                    <div className="img-lots">
                      <div className='num'>{totalItems}</div>
                      <div>{declension}</div>
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
                      {games?.items?.category?.regions?.length > 0 && games.items.category.regions.map((param) => (

                        (param.id == regId && param?.servers?.length > 0 &&
                          <select defaultValue={param.servers.sort((a, b) => a.id - b.id)[0]?.id} onChange={(event) => handleServerChange(event.target.value)} name={param.servers.name} className=' me-sm-4 me-md-5 mb-3'>
                            {
                              param.servers.map(item => (
                                <option key={item.id} value={item.id} >{item.title}</option>
                              ))
                            }
                          </select>


                        )))}

                      {games?.items?.category?.params?.length > 0 && games.items.category.params.map((param) => (

                        (param.id == catId && param?.options?.length > 0 &&
                          param.options.map(e => {
                            let options = param.options.filter(item => (item.parent == e.id || item.id == e.id) && item.paramId == catId)
                            if (!e.parent) {
                              return <select onChange={(event) => handleFilterChange(e.id, event.target.value)} name={e.name} className=' me-sm-4 me-md-5 mb-3'>
                                {
                                  options?.length > 0 && options.map(item => (
                                    <option key={item.id} value={item.id} >{item.title}</option>
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
              {displayedProducts?.length > 0 && displayedProducts.map((item) => (
                <li>
                  <OfferLine {...item} />
                </li>
              ))}
            </ul>
            <NavPagination totalPages={pagesCount} onPageChange={onPageChange} />
          </div>
        </Container>
      </section>
    </main >
  );
};

export default Game;