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
      modules={[Autoplay]} // Добавлен FreeMode
      className='main-slider'
      loop={true}
      spaceBetween={20}
      preloadImages={true}
      slidesPerView={'auto'}
      speed={speed}
      allowTouchMove={false}
      direction={direction}
      preventClicks={true}
      a11y={false}
      autoplay={{
        delay: 0,
        disableOnInteraction: true,
        // pauseOnMouseEnter: false,
        waitForTransition: true
      }}

    >
      {
        content.map((icon, index) => (
          <SwiperSlide key={icon + index}>
            <img src={icon} alt={icon + index} />
          </SwiperSlide>
        ))
      }
    </Swiper >
  )


}

export default MainSlide