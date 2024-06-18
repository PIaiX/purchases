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
        allowTouchMove={true}
        direction={'horizontal'}
        speed={15000}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          waitForTransition: true
        }}
        breakpoints={{
          576: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/head.png" alt="head" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/imgs/system.png" alt="head" />
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
      speed={5000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        waitForTransition: true
      }}
    >
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item">
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
          <img src="/imgs/head.png" alt="head" />
          <img src="/imgs/system.png" alt="head" />
          <img src="/imgs/img5.jpg" alt="head" />
          <img src="/imgs/user.jpg" alt="head" />
        </div>
      </SwiperSlide>

    </Swiper>
  )
}

export default MainSlider