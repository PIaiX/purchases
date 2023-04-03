import React from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SlideFull from '../components/SlideFull';

const Home = () => {
  return (
    <main>
      <Container>
      <section className="mb-5">
        <Swiper
          className='main-slider'
          spaceBetween={50}
          slidesPerView={'auto'}
        >
          <SwiperSlide>
            <h2 className='mb-0'>World of Warcraft</h2>
            
            <SlideFull className="svg-full"/>
            <Link to='/'>Перейти в каталог</Link>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
       

        </section>

        <section className='sec-main'>
          <h1>Играй в свое удовольствие</h1>
          <h3>Более 1000 лотов уже ждут тебя</h3>
        </section>

       
      </Container>
    </main>
  );
};

export default Home;