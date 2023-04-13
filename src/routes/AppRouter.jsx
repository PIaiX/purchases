import React from 'react'
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Blog from '../pages/Blog'
import Article from '../pages/Article'
import Game from '../pages/Game'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />}/>
      <Route path="game" element={<Game/>} />
      <Route path="blog" element={<Blog/>} />
      <Route path="blog/:id" element={<Article/>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

const AppRouter = () => {
  return <RouterProvider router={router} />
};

export default AppRouter;
