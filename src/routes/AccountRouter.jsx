import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import useIsMobile from '../hooks/isMobile'
import AccountLayout from '../layouts/AccountLayout'
import Profile from '../pages/account/Profile'
import AccountMenu from '../pages/account/AccountMenu';

const AccountRouter = () => {
  const {isMobile} = useIsMobile('1109px')

  return (
    <Routes>
      <Route path="/" element={<AccountLayout isMobile={isMobile}/>}>
        {
          (isMobile) 
          ? <Route index element={<AccountMenu />} />
          : <Route index element={<Navigate to="profile" replace={true} />} />
        }
        <Route path="profile" element={<Profile/>} />
      </Route>
    </Routes>
  )
}

export default AccountRouter