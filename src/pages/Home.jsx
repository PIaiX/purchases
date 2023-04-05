import React from 'react';
import Container from 'react-bootstrap/Container';
import MainSlider from '../components/MainSlider';
import GameCard from '../components/GameCard';

const Home = () => {
  return (
    <main>
      <Container>
        <section className="mb-5">
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

      <section className='sec-catalog mb-5'>
        <Container>
          <h2>Выбери одну из 104 игр</h2>
          <div className='sec-catalog-part'>
            <div className="letter">A</div>
            <ul className='list-unstyled row row-cols-4'>
              <li>
                <GameCard />
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        

          <div className='sec-catalog-part'>
            <div className="letter">B</div>
          </div>
          <div className='sec-catalog-part'>
            <div className="letter">C</div>
          </div>
          <div className='sec-catalog-part'>
            <div className="letter">D</div>
          </div>
          <div className='sec-catalog-part'>
            <div className="letter">E</div>
          </div>
          <div className='sec-catalog-part'>
            <div className="letter">F</div>
          </div>

          <section className='sec-main mb-5'>
            <h1>Играй в свое удовольствие</h1>
            <h3>Более 1000 лотов уже ждут тебя</h3>
          </section>
        </Container>
      </section>
    </main>
  );
};

export default Home;