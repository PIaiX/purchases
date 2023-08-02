import React from 'react';
import { FiTrash } from "react-icons/fi";
import {Link} from 'react-router-dom';
import ReturnIcon from './svg/ReturnIcon';

const SecFavorites = () => {
  return (
    <section className='sec-favorites px-3 px-xxxl-4'>
      <div className="d-lg-none d-flex align-items-center mb-4 mb-lg-0">
        <Link to='/account' className='d-flex return-icon me-2 me-sm-4'><ReturnIcon/></Link>
        <h1 className='h2 mb-0'>Избранное</h1>
      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 g-xxxl-5'>
        <div>
          <div className="fav-item">
            <img src="/imgs/img5.jpg" alt="AFK Arena" />
            <h5>World of Warcraft®: Wrath of the Lich King® Classic</h5>
            <button type="button">
              <FiTrash/>
            </button>
          </div>
        </div>
        <div>
          <div className="fav-item">
            <img src="/imgs/img5.jpg" alt="Critical Strike" />
            <h5>Critical Strike</h5>
            <button type="button">
              <FiTrash/>
            </button>
          </div>
        </div>
        <div>
          <div className="fav-item">
            <img src="/imgs/img5.jpg" alt="Critical Strike" />
            <h5>Critical Strike</h5>
            <button type="button">
              <FiTrash/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecFavorites;