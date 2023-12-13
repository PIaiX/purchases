import React from 'react';
import { FiTrash } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReturnIcon from './svg/ReturnIcon';

const SecFavorites = () => {
  const favorites = useSelector((state) => state.auth.user.favorites);
  const removeFromFavorites = (item) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
    setFavorites(updatedFavorites);
  };
  return (
    <section className='sec-favorites px-3 px-xxxl-4'>
      <div className="d-lg-none d-flex align-items-center mb-4 mb-lg-0">
        <Link to='/account' className='d-flex return-icon me-2 me-sm-4'><ReturnIcon /></Link>
        <h1 className='h2 mb-0'>Избранное</h1>

      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 g-xxxl-5'>
        <div>
          {favorites?.map((item) => (
            <div key={item.id}>
              <div className="fav-item">
                <h5>{item.name}</h5>
                <button type="button" onClick={() => removeFromFavorites(item)}>
                  <FiTrash />

                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecFavorites;