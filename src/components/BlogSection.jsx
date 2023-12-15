import React, { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import BlogCard from './BlogCard';
import { getArticles } from '../services/article';
import NavPagination from './NavPagination';
import Loader from './utils/Loader';
// import useIsMobile from '../hooks/isMobile';

const BlogSection = ({ articles, onPageChange }) => {
  // const {isMobile} = useIsMobile('1289px');

  if (articles.loading) {
    return <Loader />;
  }
  return (
    <section className='sec-blog mb-6'>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className='h1 mb-0'>Новости биржи игровых ценностей</h2>
        {/* {
          (!isMobile) &&
          <Link to='/blog' className='cognition ms-5'><h3 className='fw-7 text-end mb-0'>Познать больше</h3></Link>
        } */}
      </div>
      <ul className='blog-list row row-cols-1 row-cols-lg-4 row-cols-xl-5 g-4 g-xxl-5'>
        {articles?.items?.length > 0 && articles.items.map((item) => (
          <li>
            <BlogCard {...item} />
          </li>
        ))}
      </ul>
      <div className="list-wrapping-bottom">
        <NavPagination totalPages={articles?.pagination?.totalPages} onPageChange={onPageChange} />
      </div>
      {/* {
        (isMobile) &&
        <Link to='/blog' className='cognition mt-5'><h3 className='fw-7 text-end mb-0'>Познать больше</h3></Link>
      } */}
    </section>
  );
};

export default BlogSection;