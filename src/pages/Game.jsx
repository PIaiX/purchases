import React, { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import ServerSwitcher from '../components/utils/ServerSwitcher';
import GameСover from '../components/svg/GameСover';
import OfferLine from '../components/OfferLine';
import useIsMobile from '../hooks/isMobile';
import FilterIcon from '../components/svg/FilterIcon'
import { Link, useParams } from 'react-router-dom';
import { getGame } from '../services/game';
import { declOfNum, getImageURL } from '../helpers/all';
import NavPagination from '../components/NavPagination';
import Loader from '../components/utils/Loader';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import { useForm, useWatch } from 'react-hook-form';
import Select from '../components/utils/Select';
import Input from '../components/utils/Input';
import { HiHeart } from "react-icons/hi";
import { toggleFavorite, getFavorites } from '../services/favorite';

const Game = () => {
  const { id } = useParams();
  const isMobileLG = useIsMobile("991px");
  const [filterShow, setFilterShow] = useState(!isMobileLG ? true : false);
  const searchParams = new URLSearchParams(location.search);
  const auth = useSelector((state) => state.auth.isAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.items);
  const [sum, setSum] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      param: parseInt(searchParams.get("catId")) ? parseInt(searchParams.get("catId")) : null,
      region: parseInt(searchParams.get("regId")) ? parseInt(searchParams.get("regId")) : null,
      categoryId: parseInt(id),
    },

  });
  useEffect(() => {
    setValue("param", (parseInt(searchParams.get("catId")) ? parseInt(searchParams.get("catId")) : null))
  }, [searchParams.get("catId")]);
  useEffect(() => {
    setValue("categoryId", parseInt(id))
  }, [id]);

  useEffect(() => {
    setValue("region", (parseInt(searchParams.get("regId")) ? parseInt(searchParams.get("regId")) : null))
  }, [searchParams.get("regId")]);

  const data = useWatch({ control });
  const [displayedProducts, setDisplayedProducts] = useState({
    loading: true,
    items: [],
    pagesCount: [],
  });
  const [games, setGames] = useState({ items: [], loading: true });
  useEffect(() => {

    getGame({ param: data.param, region: data.region, server: data.server, id, })
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));
        if (sum == 0) {
          let serverIndex = res.category.regions.findIndex(
            (e) => e.id === data.region
          );
          let servers;
          if (serverIndex > -1) {
            servers = res.category.regions[serverIndex].servers.sort((a, b) => a.priority - b.priority);
          }
          let optionsIndex = res.category.params.findIndex((e) => e.id === data.param);
          let one = res.category.params[optionsIndex].data?.one;
          let currency = res.category.params[optionsIndex].data?.currency;
          let options;
          if (optionsIndex > -1) {
            options = createTree(res.category.params[optionsIndex].options, 'id', 'parent', null).sort((a, b) => a.priority - b.priority);
          }
          reset({
            ...data,
            game: res.category,
            notDesc: currency ? currency : null,
            one: one ? one : null,
            servers: servers ? servers : null,
            options: options ? options : null,
          });
        }
        setSum(1)
      })
      .catch(() => setGames(prev => ({ ...prev, loading: false })));
  }, [data.param, data.region, data.server, id]);

  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };


  const getPage = () => {
    var onlineData
    if (data?.online) {
      onlineData = games?.items?.products?.filter(product => product.user.online.status == data.online)
    }
    var products = onlineData ? onlineData : games?.items?.products;
    var filteredData = onlineData && onlineData;
    if (data?.option) {
      filteredData = products.filter(product => {
        return data.option.every(optionId => {
          if (optionId && optionId.id != null) {

            if (optionId.max || optionId.min) {
              if ((optionId.max == "all" || !optionId.max) && (optionId.min == "all" || !optionId.min)) {
                return true;
              }
              return product.options.some(dataItem => {
                if (dataItem.optionId === optionId.id) {
                  const value = parseInt(dataItem.value);
                  if ((optionId.min == "all" || !optionId.min || value >= optionId.min) && (optionId.max == "all" || !optionId.max || value <= optionId.max)) {
                    return true;
                  }
                }
              });
            }
            else {
              return product.options.some(dataItem => {
                if (dataItem.optionId === optionId.id) {
                  return true;
                } else {
                  return data.options.some(item => {
                    const selectedOption = item.children.find(child => child.id == optionId.id);
                    return selectedOption && selectedOption.children.some(subOption => subOption.id === dataItem.optionId.id);
                  });
                }
              });
            }
          } else {
            return true;
          }
        });
      });
    }
    var totalProducts = (filteredData ?? games?.items?.products) ?? [];
    if (debouncedSearchTerm) {
      totalProducts = totalProducts.filter(item =>
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );

    }
    const productsPerPage = 30;
    var indexOfLastProduct = currentPage * productsPerPage;
    var indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setDisplayedProducts({ pagesCount: Math.ceil(totalProducts.length / productsPerPage), items: totalProducts.slice(indexOfFirstProduct, indexOfLastProduct) });
  }
  useEffect(() => {
    if (games?.items?.products) {
      getPage()
    }
  }, [games?.items?.products, currentPage, data.option, debouncedSearchTerm, data.online]);

  const createTree = (data, idProp, parentProp, parentId) =>
    data
      .filter((n) => parentId === (n[parentProp] ?? null))
      .map((n) => ({
        ...n,
        children: createTree(data, idProp, parentProp, n[idProp]),
      }));

  useEffect(() => {
    if (data.region && data.game) {
      let serverIndex = games.items.category.regions.findIndex(
        (e) => e.id === data.region
      );
      let servers = null;
      if (serverIndex > -1 && games.items.category.regions[serverIndex].servers.length > 0) {
        servers = games.items.category.regions[serverIndex].servers;
      }

      reset({
        ...data,
        server: null,
        servers: servers ? servers : null,
      });

    }
  }, [data.region]);
  useEffect(() => {
    if (data.param && data.game) {
      let optionsIndex = games.items.category.params.findIndex((e) => e.id === data.param);
      let one = games.items.category.params[optionsIndex]?.data?.one;
      let currency = games.items.category.params[optionsIndex]?.data?.currency;
      let options = null;
      if (optionsIndex > -1) {
        options = createTree(games.items.category.params[optionsIndex].options, 'id', 'parent', null).sort((a, b) => a.priority - b.priority);
      }
      reset({
        ...data,
        notDesc: currency ? currency : null,
        one: one ? one : null,
        optionId: null,
        option: null,
        child: null,
        options: options ? options : null,
      });
    }
  }, [data.param]);

  const onFav = useCallback(() => {
    dispatch(toggleFavorite({ categoryId: data.categoryId, regionId: data.region, paramId: data.param }));
    dispatch(getFavorites());
  }, [data]);

  const fav = favorite.find(el => el.categoryId == games?.items?.category?.id) ? 1 : 0;

  const image = getImageURL({ path: games?.items?.category, size: "max", type: "category" })
  const totalItems = games?.items?.category?.productCount ?? 0;
  const declension = declOfNum(totalItems, ['лот', 'лота', 'лотов']);

  console.log(data)
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
        <Container>
          <div className="page-game-top">
            <h1>{games.items?.category?.title}</h1>
            <button type='button' onClick={onFav} className='btn-primary fs-09 px-3 py-2 mx-auto mb-5'>
              {
                (fav)
                ? <span>В Избранном</span>
                : <span>Добавить в Избранное</span>
              }
              <HiHeart className='ms-2 fs-12'/>
            </button>
            {/* {auth && <BtnAddFav favo={fav} onFav={onFav} />} */}

            {games?.items?.category?.regions?.length > 0 && games?.items?.category?.regions[0].status == 1 && (
              <div className='mb-5'>
                <ServerSwitcher
                  data={data}
                  active={data.region}
                  serversArr={games.items.category.regions}
                  onChange={(e) => setValue("region", e)}
                />
              </div>
            )}
            
            <ul className='categories'>
              {games?.items?.category?.params?.length > 0 && [...games.items.category.params].sort((a, b) => a.priority - b.priority).map((param) => (
                <li key={param.id}><Link to={`/game/${data.categoryId}/?${data.region ? `regId=${data.region}&` : ''}${param.id ? `catId=${param.id}` : ''}`} className={param.id == data.param ? ' button active' : 'button'}>{param.title}</Link></li>
              ))}
            </ul>
            
            <form action="" className='filter mb-4 mb-xxl-5'>
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
                  <div className="w-100 d-flex mb-3">
                    <label className='fs-12 me-sm-4 me-md-5 mb-3'>
                      <span className='me-2'>Только продавцы онлайн</span>
                      <input type="checkbox" />
                    </label>
                    <input type="search" className='me-sm-4 me-md-5 mb-3' placeholder='Поиск по описанию' />
                  </div>
                  
                  {/* {games?.items?.category?.regions?.length > 0 && games.items.category.regions.map((param) => (

                    (param.id == regId && param?.servers?.length > 0 &&
                      <select defaultValue={param.servers.sort((a, b) => a.id - b.id)[0]?.id} onChange={(event) => handleServerChange(event.target.value)} name={param.servers.name} className=' me-sm-4 me-md-5 mb-3'>
                        {
                          param.servers.map(item => (
                            <option key={item.id} value={item.id} >{item.title}</option>
                          ))
                        }
                      </select>


                    )))} */}
                  {data?.servers && data?.servers.length > 0 && (
                    <Select
                      value={data.server}
                      title="Выберите сервер"
                      onClick={(e) => setValue("server", parseInt(e.value))}
                      data={data.servers.sort((a, b) => a.priority - b.priority).map((item) => ({
                        value: item.id,
                        title: item.title,
                      }))}
                    />
                  )}
                  {/* {games?.items?.category?.params?.length > 0 && games.items.category.params.map((param) => (

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

                      }))))} */}
                  {data?.options?.length > 0 &&
                    data.options.map((e, i) => {
                      let optionIndex = data?.optionId?.length > 0 && e?.children.findIndex((child) => child.id == data?.optionId[i])
                      var option = []
                      if (optionIndex > -1) {
                        option = e?.children[optionIndex]
                      }
                      return (
                        <>
                          { 
                            e.data?.max 
                            ? <div className='d-flex align-items-center me-4'>
                                <span>{e.title}</span>
                                <Input
                                  className="ms-2"
                                  type={"number"}
                                  placeholder="От"
                                  defaultValue={data?.option && data?.option[i]?.min}
                                  onChange={(g) => { setValue(`option[${i}].min`, g ? parseInt(g) : "all"), setValue(`option[${i}].id`, e.id) }}
                                />
                                <Input
                                  className="ms-2"
                                  type={"number"}
                                  placeholder="До"
                                  defaultValue={data?.option && data?.option[i]?.max}
                                  onChange={(g) => { setValue(`option[${i}].max`, g ? parseInt(g) : "all"), setValue(`option[${i}].id`, e.id) }}
                                />
                              </div>
                            : <Select
                              value={data?.optionId && data?.optionId[i]}
                              title={e.title}
                              onClick={(e) => {
                                setValue(`optionId[${i}]`, parseInt(e.value))
                                setValue(`child[${i}]`, null)
                                setValue(`option[${i}].id`, e.value != 'false' ? parseInt(e.value) : null)
                              }}
                              data={[
                                ...(e?.children?.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, title: item.title })))
                              ]}
                            />
                          }
                          {
                            option?.children?.length > 0 &&
                            <Select
                              value={data?.child[i]}
                              title={option.children[0].title}
                              onClick={(e) => {
                                setValue(`child[${i}]`, parseInt(e.value))
                                setValue(`option[${i}].id`, e.value !== 'false' ? parseInt(e.value) : data.optionId[i])
                              }}
                              data={option.children.sort((a, b) => a.priority - b.priority).map((item) => ({
                                value: item.id,
                                title: item.title,
                              }))}
                            />
                          }
                        </>
                      );
                    })
                  }
                </fieldset>
              }
            </form>
          </div>

          {displayedProducts?.items?.length > 0 ?
            <div className={data.servers ? "page-game-offers" : "page-game-offers-no"}>
              <div className="top">
                {data.servers && <div className="serv">Сервер</div>}
                <div className='descr'>Описание</div>
                <div className='seller'>Продавец</div>
                <div className='availability'>Наличие, шт.</div>
                <div className='price'>Цена</div>
              </div>
              <ul className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-1 g-3'>
                {displayedProducts?.items?.length > 0 && displayedProducts.items.map((item) => (
                  <li>
                    <OfferLine {...item} notDesc={data.notDesc} />
                  </li>
                ))}
              </ul>
              <NavPagination totalPages={displayedProducts.pagesCount} onPageChange={onPageChange} />
            </div>
            :
            <div className="page-game-offers d-flex align-items-center justify-content-center mt-4">
              <h3>
                Нет объявлений
              </h3>
            </div>
          }
        </Container>
      </section>
    </main >
  );
};

export default Game;