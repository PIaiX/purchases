import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SecFavorites from '../components/SecFavorites'
import useIsMobile from '../hooks/isMobile'
import AccountLayout from '../layouts/AccountLayout'
import AccountMenu from '../pages/account/AccountMenu'
import AddOffer from '../pages/account/AddOffer'
import Callback from '../pages/account/Callback'
import CallbackChat from '../pages/account/CallbackChat'
import EmailVerification from '../pages/account/EmailVerification'
import Feedback from '../pages/account/Feedback'
import Finance from '../pages/account/Finance'
import LeaveFeedback from '../pages/account/LeaveFeedback'
import Messages from '../pages/account/Messages'
import Offers from '../pages/account/Offers'
import PhoneVerification from '../pages/account/PhoneVerification'
import Profile from '../pages/account/Profile'
import PurchaseHistory from '../pages/account/PurchaseHistory'
import SalesHistory from '../pages/account/SalesHistory'
import Settings from '../pages/account/Settings'
import MessagesDialogue from '../pages/account/MessagesDialogue'

const AccountRouter = () => {
  const isMobileLG = useIsMobile('991px')
  const isMobileXL = useIsMobile('1199px')

  return (
    <Routes>
      <Route path="/" element={<AccountLayout isMobile={isMobileLG} />}>
        {
          (isMobileLG)
            ? <Route index element={<AccountMenu />} />
            : <Route index element={<Navigate to="profile" replace={true} />} />
        }
        <Route path="profile" element={<Profile />} />
        <Route path="profile/phone" element={<PhoneVerification />} />
        <Route path="profile/email" element={<EmailVerification />} />
        <Route path="offers" element={<Offers />} />
        <Route path="offers/add" element={<AddOffer />} />
        <Route path="offers/edit/:id" element={<AddOffer />} />
        <Route path="purchase-history" element={<PurchaseHistory />} />
        <Route path="sales-history" element={<SalesHistory />} />
        <Route path="finance" element={<Finance />} />
        <Route path="messages" element={<Messages isMobileXL={isMobileXL} />} />
        {
          (!isMobileXL)
            ? <Route path="messages/:dialogId" element={<Messages isMobileXL={isMobileXL} />} />
            : <Route path="messages/:dialogId" element={<MessagesDialogue />} />
        }
        <Route path="feedback" element={<Feedback />} />
        <Route path="feedback/add/:orderId" element={<LeaveFeedback />} />
        <Route path="callback" element={<Callback />} />
        <Route path="callback/:id" element={<CallbackChat />} />
        <Route path="favs" element={<SecFavorites />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AccountRouter