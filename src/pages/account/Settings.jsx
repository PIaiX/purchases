import React from 'react';
import OfferLine2 from '../../components/OfferLine2';
import NavPagination from '../../components/NavPagination';

const Settings = () => {
  return (
    <section className="mb-6">
      <div className="list-wrapping">
            <div className="list-wrapping-top">
              <ul className='line-2'>
                <li className='descr'>Описание</li>
                <li className='price'>Цена</li>
                <li className='btns'></li>
              </ul>
            </div>
            <div className="list-wrapping-main">
              <ul>
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
    </section>
  );
};

export default Settings;