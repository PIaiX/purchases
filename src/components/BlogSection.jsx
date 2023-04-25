import React from 'react';
// import {Link} from 'react-router-dom';
import BlogCard from './BlogCard';
// import useIsMobile from '../hooks/isMobile';

const BlogSection = () => {
  // const {isMobile} = useIsMobile('1289px');

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
        <li>
          <BlogCard img={'imgs/img1.jpg'} title={'Как сэкономить ~6% при выводе денег'}/>
        </li>
        <li>
          <BlogCard img={'imgs/img2.jpg'} title={'Как финал истории принца Артаса изменил MMORPG от Blizzard'}/>
        </li>
        <li>
          <BlogCard img={'imgs/img3.jpg'} title={'Новые способы оплаты — крипто-будущее наступило? '}/>
        </li>
        <li>
          <BlogCard img={'imgs/img4.jpg'} title={'Инструкция по выводу на электронный кошелёк'}/>
        </li>
        <li className='d-none d-xl-block'>
          <BlogCard img={'imgs/img1.jpg'} title={'Как сэкономить ~6% при выводе денег'}/>
        </li>
      </ul>
      {/* {
        (isMobile) &&
        <Link to='/blog' className='cognition mt-5'><h3 className='fw-7 text-end mb-0'>Познать больше</h3></Link>
      } */}
    </section>
  );
};

export default BlogSection;