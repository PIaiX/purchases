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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getGame } from '../services/game';
import { declOfNum, getImageURL, removeDescendants } from '../helpers/all';
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
  const isMobileLG = useIsMobile("1109px");
  const [filterShow, setFilterShow] = useState(!isMobileLG ? true : false);
  const searchParams = new URLSearchParams(location.search);
  const auth = useSelector((state) => state.auth.isAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.items);
  const [sum, setSum] = useState(0);
  const [fav, setFav] = useState();
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
    },

  });
  useEffect(() => {
    setValue("param", (parseInt(searchParams.get("catId")) ? parseInt(searchParams.get("catId")) : null))
    setSelectedValues({});
  }, [searchParams.get("catId")]);


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
  const [selectedValues, setSelectedValues] = useState({});
  const [opt, setOpt] = useState();

  const onSaveOption = (option) => {
    setValue('option', removeDescendants(data, option));
  };


  console.log(data.servers)
  const maxOption = (tree) => {
    return (
      <div className='d-flex align-items-center me-4'>
        <span>{tree.title}</span>
        <Input
          className="ms-2"
          type={"number"}
          placeholder="От"
          value={data.option && data.option.find(e => e.parent == tree.id) && data.option.find(e => e.parent == tree.id).min}
          onChange={(g) => { onSaveOption({ ...tree, min: g !== "" ? parseInt(g) : "all" }) }}
        />
        <Input
          className="ms-2"
          type={"number"}
          placeholder="До"
          value={data.option && data.option.find(e => e.parent == tree.id) && data.option.find(e => e.parent == tree.id).max}
          onChange={(g) => { onSaveOption({ ...tree, max: g !== "" ? parseInt(g) : "all" }) }}
        />
      </div>

    );
  };
  const renderSelects = (tree) => {
    if (tree.children && tree.children.length > 0) {
      if (tree.children.length == 1 && !data.option.find(e => e.parent == tree.id)) {
        onSaveOption(tree.children[0])

      }
      if (tree.children[0].data?.max) {
        return tree.children.map(child =>
          maxOption(child)
        );
      }
      else {
        return (
          <>

            <Select
              value={data.option != null && data.option.find(e => e.parent == tree.id) && data.option.find(e => e.parent == tree.id).id}
              title={tree?.title}
              onClick={(e) => onSaveOption(e.data)}
              data={[
                { value: null, data: tree, title: tree.title },
                ...(tree?.children?.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, data: item, title: item.title })))
              ]}
            />
            {data.option && data.option.find(e => e.parent == tree.id) &&
              renderSelects(data.option.find(e => e.parent == tree.id))
            }
          </>
        );
      }
    }
    return null;
  };
  useEffect(() => {

    getGame({ param: data.param, region: data.region, server: data.server, id, })
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));

        let servers;
        if (!data.param) {
          const sortedParams = [...res?.category?.params]?.sort((a, b) => a.priority - b.priority);
          const firstParamId = sortedParams[0]?.id;
          const regionId = res.category.regions?.length > 0 ? [...res.category.regions].sort((a, b) => a.priority - b.priority)[0].id : '';
          navigate(`/game/${id}/?${regionId ? `regId=${regionId}&` : ''}${firstParamId ? `catId=${firstParamId}` : ''}`);
        }
        let optionsIndex = res.category.params.findIndex((e) => e.id === data.param);
        let param = res.category.params[optionsIndex];
        let one = param.data?.one;
        let currency = param.data?.currency;
        let serverView = param.data?.serverView;
        let options = createTree(param.options, 'id', 'parent', null).sort((a, b) => a.id - b.id);


        if (!serverView) {
          let serverIndex = res.category.regions.findIndex(
            (e) => e.id === data.region
          );

          if (serverIndex > -1) {
            servers = res.category.regions[serverIndex].servers.sort((a, b) => a.priority - b.priority);
          }
        }

        reset({
          ...data,
          categoryId: res.category.id,
          uid: res.category.uid,
          game: res.category,
          notDesc: currency ? currency : null,
          serverView: serverView ? serverView : null,
          one: one ? one : null,
          servers: servers ? servers : null,
          options: options ? options : null,
          option: null,
        });
        setOpt(param.options);
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
                  let parent = opt.find((e) => e.id === dataItem.optionId);
                  while (parent.parent) {
                    if (parent.parent === optionId.id) {
                      return true;
                    }
                    parent = opt.find((e) => e.id === parent.parent);
                  }
                  return false;
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

  useEffect(() => {
    if (selectedValues) {
      setValue("selectedValues", selectedValues)
    }
  }, [selectedValues]);

  const createTree = (data, idProp, parentProp, parentId) =>
    data
      .filter((n) => parentId === (n[parentProp] ?? null))
      .map((n) => ({
        ...n,
        children: createTree(data, idProp, parentProp, n[idProp]),
      }));

  const onFav = useCallback(() => {
    dispatch(toggleFavorite({ categoryId: data?.categoryId, regionId: [...data?.game?.regions].sort((a, b) => a.priority - b.priority)[0]?.id, paramId: [...data?.game?.params].sort((a, b) => a.priority - b.priority)[0]?.id }));
  }, [data, id]);

  useEffect(() => {
    setFav(favorite?.find(el => el.categoryId == games?.items?.category?.id) ? 1 : 0);
  }, [favorite, data.game]);
  const navigate = useNavigate();

  if (games.loading) {
    return <Loader full />;
  }
  return (
    <main>
      <Meta title={games.items?.category?.title ?? "Игра"} />

      <NavBreadcrumbs title="Каталог" />


      <section className='page-game pb-2 pb-4 pb-md-5'>
        <div className="page-game-top">
          <h1>{games.items?.category?.title}</h1>
          <button type='button' onClick={onFav} className='btn-primary fs-09 px-3 py-2 mx-auto mb-4 mb-md-5'>
            {
              (fav)
                ? <span>В Избранном</span>
                : <span>Добавить в Избранное</span>
            }
            <HiHeart className='ms-2 fs-12' />
          </button>
          {/* {auth && <BtnAddFav favo={fav} onFav={onFav} />} */}

          {games?.items?.category?.regions?.length > 0 && [...games?.items?.category?.regions].sort((a, b) => a.priority - b.priority)[0].status ? (
            <div className='mb-4 mb-md-5'>
              <ServerSwitcher
                data={data}
                id={id}
                active={data.region}
                serversArr={games.items.category.regions.sort((a, b) => a.priority - b.priority)}
              />
            </div>
          ) : ""}

          <ul className='categories'>
            {games?.items?.category?.params?.length > 0 && [...games.items.category.params].sort((a, b) => a.priority - b.priority).map((param) => (
              <li key={param.id}><Link to={`/game/${id ?? data.categoryId}/?${data.region ? `regId=${data.region}&` : ''}${param.id ? `catId=${param.id}` : ''}`} className={param.id == data.param ? ' button active' : 'button'}>{param.title}</Link></li>
            ))}
          </ul>

          <form action="" className='filter mb-4 mb-xxl-5'>

            <div className="filter-top">
              <input type="search" placeholder='Поиск по описанию' />
              <label className='fs-12'>
                <span className='me-2'>Только продавцы онлайн</span>
                <input type="checkbox" />
              </label>
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

            {data?.options?.length > 0 &&
              data.options.map((e, i) => {
                return (
                  <>
                    {e.data?.max ?
                      maxOption(e, i)
                      :
                      renderSelects(e, i)
                    }
                  </>
                )
              })
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
              {displayedProducts?.items?.length > 0 && displayedProducts.items.reverse().map((item) => (
                <li>
                  <OfferLine {...item} notDesc={data.notDesc} data={data} />
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
      </section>
    </main >
  );
};

export default Game;