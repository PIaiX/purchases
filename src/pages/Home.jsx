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
  const {mobile} = useIsMobile('1109px');

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

      <section className='sec-bottom'>
        <Container>
          <Row className='mb-md-5'>
            <Col xs={12} lg={7} xxl={8}>
              <section className='sec-chat'>
                <h2>Общий чат</h2>
              </section>
              <Chat/>
            </Col>
            {
              (!mobile) &&
              <Col xs={12} lg={5} xxl={4}>
                <section className='sec-popular'>
                  <h2>Популярные объявления</h2>
                  <Swiper
                    modules={[Scrollbar, Mousewheel]}
                    className='offers-slider'
                    spaceBetween={30}
                    slidesPerView={'auto'}
                    direction={'vertical'}
                    scrollbar={{ draggable: true }}
                    mousewheel={true}
                  >
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard/>
                    </SwiperSlide>
                  </Swiper>
                </section>
              </Col>
            }
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Home;