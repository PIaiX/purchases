import React from 'react'
import useIsMobile from '../hooks/isMobile'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'

const MainSlider = () => {
  const isMobile = useIsMobile('991px')

  if (isMobile) {
    return (
      <Swiper
        modules={[Autoplay, FreeMode]}
        className='main-slider'
        loop={true}
        spaceBetween={20}
        slidesPerView={'auto'}
        speed={4000}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          waitForTransition: true
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
      >
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </SwiperSlide>

      </Swiper>
    )
  } else return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      className='main-slider'
      loop={true}
      spaceBetween={20}
      slidesPerView={'auto'}
      allowTouchMove={false}
      direction={'vertical'}
      speed={2000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        waitForTransition: true
      }}
      breakpoints={{
        991: {
          spaceBetween: 10,
        },
        1199: {
          spaceBetween: 15,
        },
      }}
    >
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
          <img src="/imgs/arche-age-icon.jpg" alt="head" />
        </div>
      </SwiperSlide>

    </Swiper>
  )
}

export default MainSlider