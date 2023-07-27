import React from 'react';
import {Link} from 'react-router-dom';
import { FiChevronDown } from "react-icons/fi";
import GameMiniCard from '../../components/GameMiniCard';
import NavPagination from '../../components/NavPagination';
import OfferLine2 from '../../components/OfferLine2';
import Plus from '../../components/svg/Plus';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Offers = () => {
  return (
    <section className='mb-6'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          <ReturnTitle link={'/account'} title={'Мои объявления'}/>

          <div className="d-flex align-items-start">
            <Link to='add' className='btn-add-offer me-3 me-md-4'>
              <Plus/>
            </Link>
            <div className='flex-1'>
              <ul className='list-unstyled g-2 g-sm-4 row row-cols-sm-2 row-cols-md-3 row-cols-xxl-4'>
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
            </div>
          </div>

          <div className="list-wrapping">
            <div className="list-wrapping-top">
              <ul className='line-2'>
                <li className='descr'>Описание</li>
                <li className='price'>Цена</li>
                <li className='btns'></li>
              </ul>
            </div>
            <div className="list-wrapping-main">
              <ul className='g-4 g-xl-0 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-1'>
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