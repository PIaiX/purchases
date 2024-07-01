import React from 'react'
import useIsMobile from '../hooks/isMobile'

import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const MainSlide = ({ content, direction, speed }) => {

  return (
    <Swiper
      modules={[Autoplay]}
      className='main-slider'
      loop={true}
      spaceBetween={20}
      slidesPerView={'auto'}
      speed={speed}
      direction={direction}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
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
      {content.map((icon, index) => (
        <SwiperSlide>
          <img key={icon + index} src={icon} alt={icon + index} />
        </SwiperSlide>

      ))}
    </Swiper>
  )


}

export default MainSlide