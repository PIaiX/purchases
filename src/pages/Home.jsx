import React from 'react';
import Container from 'react-bootstrap/Container';
import MainSlider from '../components/MainSlider';
import BlogSection from '../components/BlogSection';

import 'swiper/css';
import 'swiper/css/scrollbar';

import CatalogSection from '../components/CatalogSection';

const Home = () => {
  return (
    <main>
      <Container>
        <section className="mb-6">
          <MainSlider/>
        </section>
      </Container>

      <CatalogSection/>

      <Container>
        <BlogSection/>
      </Container>
    </main>
  );
};

export default Home;