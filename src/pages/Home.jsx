import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainSlider from '../components/MainSlider';
import GameCard from '../components/GameCard';
import OfferCard from '../components/OfferCard';
import Chat from '../components/chat/Chat';
import BlogSection from '../components/BlogSection';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

import useIsMobile from '../hooks/isMobile';

const Home = () => {
  const {mobile} = useIsMobile('991px');

  return (
    <main>
      <Container>
        <section className="mb-6">
          <MainSlider/>
        </section>
      </Container>

      <section className='sec-catalog mb-6'>
        <Container><h2>Выбери одну из 104 игр</h2></Container>
        <Container>
          <div className="sec-catalog-box">
            <div className='sec-catalog-part'>
              <div className="letter">A</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>

            <div className='sec-catalog-part'>
              <div className="letter">A</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>

            <div className='sec-promo mb-5'>
              <div className='text'>
                <h1 className='mb-0 mb-md-2'>Играй в свое <br className='d-sm-none'/>удовольствие</h1>
                <h3 className='d-none d-md-block'>Более 1000 лотов уже ждут тебя</h3>
              </div>
              <img src="imgs/head.png" alt="head" />
              <button type='button' className='btn-2 d-none d-lg-block'>Перейти в каталог</button>
            </div>

            <div className='sec-catalog-part'>
              <div className="letter">A</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>
          </div>
          <nav className='sec-catalog-nav'>
            <ul>
              <li className='active'>A</li>
              <li>B</li>
              <li>C</li>
              <li>D</li>
              <li>E</li>
              <li>F</li>
              <li>G</li>
              <li>H</li>
              <li>I</li>
              <li>J</li>
              <li>K</li>
              <li>L</li>
              {/* <li>M</li>
              <li>N</li>
              <li>O</li>
              <li>P</li>
              <li>Q</li>
              <li>R</li>
              <li>S</li>
              <li>T</li>
              <li>U</li>
              <li>V</li>
              <li>W</li>
              <li>X</li>
              <li>Y</li>
              <li>Z</li>
              <li>А-Я</li> */}
            </ul>
          </nav>
        </Container>
      </section>

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