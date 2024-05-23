import React, { useCallback, useEffect } from 'react';
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavorites, toggleFavorite } from '../../services/favorite';
import { Container } from 'react-bootstrap';
import NavBreadcrumbs from '../../components/NavBreadcrumbs';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorite.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorites());
  }, []);
  const onFav = useCallback((e) => {
    dispatch(toggleFavorite({ categoryId: e, }));
  }, []);
  return (
    <section className='sec-favorites px-3 px-xxxl-4'>
      <Container>
        <NavBreadcrumbs title="Избранное" />
      </Container>
      <h1>Избранное</h1>
      {!favorites || !favorites.length > 0 &&
        <h5 className='mb-3' >Вы пока не добавили себе избранных игр.</h5>
      }
      <ul className='list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 g-md-4 g-xxxl-5'>
        {favorites && favorites.length > 0 && favorites?.map((item) => {
          return (
            <li key={item.id}>
              <div className="fav-item">
                <h5><Link to={`/${item?.categoryId}/?${item.regionId ? `region=${item.regionId}&` : ''}${item.paramId ? `param=${item.paramId}` : ''}`} className='title'>{item?.category?.title}</Link></h5>
                <button type="button" onClick={() => onFav(item.categoryId)} >
                  <FiTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Favorites;