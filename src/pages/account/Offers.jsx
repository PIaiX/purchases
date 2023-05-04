import React from 'react';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';
import { FiChevronDown } from "react-icons/fi";
import GameMiniCard from '../../components/GameMiniCard';
import NavPagination from '../../components/NavPagination';
import OfferLine2 from '../../components/OfferLine2';

const Offers = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          <div className="d-md-flex align-items-center mb-5">
            <div className="d-flex align-items-center">
              <Link to='/account' className='d-lg-none d-flex fs-20 blue me-4'><ReturnIcon/></Link>
              <h1 className='h2 mb-0'>Мои объявления</h1>
            </div>
            <Link to='add' className='mt-4 mt-md-0 ms-md-4 ms-xl-5 btn-4 fs-15 fw-7 flex-1 justify-content-end'>+ новое объявление</Link>
          </div>

          <h4 className='mb-3 mb-sm-4'>Игры</h4>
          <ul className='list-unstyled g-2 g-sm-4 row row-cols-2 row-cols-md-3 row-cols-xxl-4'>
            <li>
              <GameMiniCard/>
            </li>
            <li><GameMiniCard/></li>
            <li><GameMiniCard/></li>
            <li><GameMiniCard/></li>
          </ul>
          <button type='button' className='d-flex flex-column align-items-center pale-blue fs-12 mx-auto mt-4 mb-4 mb-sm-5'>
            <span>Показать все</span>
            <FiChevronDown className='fs-13'/>
          </button>

          <div className="list-wrapping">
            <div className="list-wrapping-top">
              <ul className='line-2'>
                <li className='descr'>Описание</li>
                <li className='price'>Цена</li>
                <li className='btns'></li>
              </ul>
            </div>
            <div className="list-wrapping-main">
              <ul className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-1 g-3'>
                <li>
                  <OfferLine2/>
                </li>
                <li>
                  <OfferLine2/>
                </li>
                <li>
                  <OfferLine2/>
                </li>
                <li>
                  <OfferLine2/>
                </li>
                <li>
                  <OfferLine2/>
                </li>
                <li>
                  <OfferLine2/>
                </li>
              </ul>
            </div>
            <div className="list-wrapping-bottom">
              <NavPagination/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;