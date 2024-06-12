import React from 'react';
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import AccountMenu from '../pages/account/AccountMenu';
import bgImg from '../assets/imgs/bg/gradient.jpg'
import ScrollToTopButton from '../components/utils/ScrollToTopButton';

const AccountLayout = ({ isMobile }) => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg' />
      <div className='pe-3 ps-3'>
        <ScrollToTopButton />
        {/* {

          (isMobile)
            ? <Outlet />
            : <div className="row justify-content-between">
              <div className="col-3 col-xl-3 col-xxl-2">
                <AccountMenu />
              </div>
              <div className="col-9 col-xl-9"><Outlet /></div>
            </div>
        } */}
        <Outlet />
      </div>
    </main>
  );
};

export default AccountLayout;