import React from 'react';
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import AccountMenu from '../pages/account/AccountMenu';

const AccountLayout = () => {
  return (
    <main className='account'>
      <Container>
        <div className="row justify-content-between">
          <div className="col-md-3 col-xxxl-2">
            <AccountMenu/>
          </div>
          <div className="col-md-9"><Outlet/></div>
        </div>
      </Container>
    </main>
  );
};

export default AccountLayout;