import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import BlogCard2 from '../components/BlogCard2';

const Blog = () => {
  return (
    <main>
      <Container>
        <NavBreadcrumbs/>

        <section className='page-blog mb-3 mb-sm-4 mb-md-5'>
          <h1 className='mb-3 mb-sm-4 mb-md-5'>Новости биржи игровых ценностей</h1>
          <ul className='list-unstyled row row-cols-2 row-cols-lg-3 gx-2 gx-sm-4 gy-4 gy-sm-5'>
            <li>
              <BlogCard2 img={'imgs/img1.jpg'} title={'Как сэкономить ~6% при выводе денег'}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img2.jpg'} title={'Как финал истории принца Артаса изменил MMORPG от Blizzard'}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img3.jpg'} title={'Новые способы оплаты — крипто-будущее наступило? '}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img4.jpg'} title={'Инструкция по выводу на электронный кошелёк'}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img1.jpg'} title={'Как сэкономить ~6% при выводе денег'}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img2.jpg'} title={'Как финал истории принца Артаса изменил MMORPG от Blizzard'}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img3.jpg'} title={'Новые способы оплаты — крипто-будущее наступило? '}/>
            </li>
            <li>
              <BlogCard2 img={'imgs/img4.jpg'} title={'Инструкция по выводу на электронный кошелёк'}/>
            </li>
          </ul>
        </section>
      </Container>
    </main>
  );
};

export default Blog;