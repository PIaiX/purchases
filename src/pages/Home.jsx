import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainSlider from '../components/MainSlider';
import OfferCard from '../components/OfferCard';
import Chat from '../components/chat/Chat';
import BlogSection from '../components/BlogSection';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

import useIsMobile from '../hooks/isMobile';
import CatalogSection from '../components/CatalogSection';

const Home = () => {
  const isMobileLG = useIsMobile('1109px');

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