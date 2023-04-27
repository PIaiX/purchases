import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import useIsMobile from '../hooks/isMobile'
import AccountLayout from '../layouts/AccountLayout'
import Profile from '../pages/account/Profile'
import AccountMenu from '../pages/account/AccountMenu';
import Offers from '../pages/account/Offers'
import AddOffer from '../pages/account/AddOffer'
import PhoneVerification from '../pages/account/PhoneVerification'
import EmailVerification from '../pages/account/EmailVerification'
import PurchaseHistory from '../pages/account/PurchaseHistory'
import SalesHistory from '../pages/account/SalesHistory'

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
        <Route path="profile/phone" element={<PhoneVerification/>} />
        <Route path="profile/email" element={<EmailVerification/>} />
        <Route path="offers" element={<Offers/>} />
        <Route path="offers/add" element={<AddOffer/>} />
        <Route path="purchase-history" element={<PurchaseHistory/>} />
        <Route path="sales-history" element={<SalesHistory/>} />
        <Route path="finance" element={<Offers/>} />
      </Route>
    </Routes>
  )
}

export default AccountRouter