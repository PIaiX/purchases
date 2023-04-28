import React from 'react'
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Blog from '../pages/Blog'
import Article from '../pages/Article'
import Game from '../pages/Game'
import Registration from '../pages/Registration'
import Login from '../pages/Login'
import PasswordRestoration from '../pages/PasswordRestoration'
import AccountRouter from './AccountRouter'
import FAQ from '../pages/FAQ'
import PrivacyPolicy from '../pages/PrivacyPolicy'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />}/>
      <Route path="game" element={<Game/>} />
      <Route path="blog" element={<Blog/>} />
      <Route path="blog/:id" element={<Article/>} />
      <Route path="registration" element={<Registration/>} />
      <Route path="password" element={<PasswordRestoration/>} />
      <Route path="login" element={<Login/>} />
      <Route path="*" element={<NotFound />} />
      <Route path="account/*" element={<AccountRouter/>} />
      <Route path="help" element={<FAQ/>} />
      <Route path="privacy" element={<PrivacyPolicy/>} />
      <Route path="rules" element={<PrivacyPolicy/>} />
      <Route path="cookie" element={<PrivacyPolicy/>} />
    </Route>
  )
)

const AppRouter = () => {
  return <RouterProvider router={router} />
};

export default AppRouter;
