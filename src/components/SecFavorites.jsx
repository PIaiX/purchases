import React from 'react';
import { FiTrash } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReturnIcon from './svg/ReturnIcon';

const SecFavorites = ({ favorites }) => {
  return (
    <section className='sec-favorites px-3 px-xxxl-4'>
      <div className="d-lg-none d-flex align-items-center mb-4 mb-lg-0">
        <Link to='/account' className='d-flex return-icon me-2 me-sm-4'><ReturnIcon /></Link>

        {favorites && favorites.length > 0 ?
          <h1 className='h2 mb-0'>Избранное</h1>
          :
          <h5 >Вы пока не добавили себе избранных игр.</h5>
        }

      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 g-xxxl-5'>
        <div>
          {favorites && favorites.length > 0 && favorites?.map((item) => {
            return (
              <div key={item.id}>
                <div className="fav-item">
                  <h5><Link to={`/${item?.categoryId}/?${item.regionId ? `region=${item.regionId}&` : ''}${item.paramId ? `param=${item.paramId}` : ''}`} className='title'>{item?.category?.title}</Link></h5>
                  <button type="button" onClick={() => onFav(item.categoryId)} >
                    <FiTrash />

                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecFavorites;