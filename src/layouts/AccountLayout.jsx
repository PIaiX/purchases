import React from 'react';
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import AccountMenu from '../pages/account/AccountMenu';
import bgImg from '../assets/imgs/bg/gradient.jpg'

const AccountLayout = ({isMobile}) => {
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg'/>
      <Container>
        {
          (isMobile)
          ? <Outlet/>
          : <div className="row justify-content-between">
            <div className="col-4 col-xl-3 col-xxxl-2">
              <AccountMenu/>
            </div>
            <div className="col-8 col-xl-9"><Outlet/></div>
          </div>
        }
      </Container>
    </main>
  );
};

export default AccountLayout;