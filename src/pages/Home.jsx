import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import MainSlider from '../components/MainSlider';
import GameCard from '../components/GameCard';
import BlogCard from '../components/BlogCard';
import OfferCard from '../components/OfferCard';
import Chat from '../components/chat/Chat';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

const Home = () => {
  return (
    <main>
      <Container>
        <section className="mb-6">
          <MainSlider/>
          {/* <Swiper
            className='main-slider'
            spaceBetween={50}
            slidesPerView={'auto'}
          >
            <SwiperSlide>
              <MainSlide 
              title={"World of Warcraft"} 
              imgFull={"imgs/gif.gif"}
              imgMini={"imgs/slide-cover-2.jpg"}
              />
            </SwiperSlide>
            <SwiperSlide>
              <MainSlide 
              title={"Genshin Impact"} 
              imgFull={"imgs/gif.gif"}
              imgMini={"imgs/slide-cover-2.jpg"}
              />
            </SwiperSlide>
            <SwiperSlide>
              <MainSlide 
              title={"World of Warcraft"} 
              imgFull={"imgs/gif.gif"}
              imgMini={"imgs/slide-cover-3.jpg"}
              />
            </SwiperSlide>
          </Swiper> */}
        </section>
      </Container>

      <section className='sec-catalog mb-6'>
        <nav className='nav-catalog'>
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
        <Container>
          <h2>Выбери одну из 104 игр</h2>
          <div className='sec-catalog-part'>
            <div className="letter">A</div>
            <ul className='list-unstyled row row-cols-4 gx-4 gy-5'>
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
            <ul className='list-unstyled row row-cols-4 gx-4 gy-5'>
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
              <h1>Играй в свое удовольствие</h1>
              <h3>Более 1000 лотов уже ждут тебя</h3>
            </div>
            <img src="imgs/head.png" alt="head" />
            <button type='button' className='btn-2'>Перейти в каталог</button>
          </div>

          <div className='sec-catalog-part'>
            <div className="letter">A</div>
            <ul className='list-unstyled row row-cols-4 gx-4 gy-5'>
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
        </Container>
      </section>

      <Container>
        <section className='sec-blog mb-6'>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className='h1 mb-0'>Новости биржи игровых ценностей</h2>
            <Link to='/blog' className='cognition'><h3 className='fw-7 text-end mb-0'>Познать больше</h3></Link>
          </div>
          <ul className='blog-list row row-cols-5 gx-5'>
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
            <li>
              <BlogCard img={'imgs/img1.jpg'} title={'Как сэкономить ~6% при выводе денег'}/>
            </li>
          </ul>
        </section>
      </Container>

      <section className='sec-bottom'>
        <Container>
          <Row className='mb-5'>
            <Col md={8}>
              <section className='sec-chat'>
                <h2>Общий чат</h2>
              </section>
              <Chat/>
            </Col>
            <Col md={4}>
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
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Home;