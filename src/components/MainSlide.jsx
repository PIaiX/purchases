import React from 'react';
import SlideFull from './svg/SlideFull';
import {Link} from 'react-router-dom';
// import { useSwiperSlide } from 'swiper/react';
import SlideMini from './svg/SlideMini';

const MainSlide = (props) => {
  // const swiperSlide = useSwiperSlide();

  return (
    <div 
      className={(props.isActive) ? 'main-slider-item-active' : 'main-slider-item'} 
      onMouseEnter={props.onMouseEnter}
    >
      <div className="lots">
        <div className='num'>1325</div>
        <div>лотов</div>
      </div>
      {
        (props.isActive) 
        ? <SlideFull img={props.imgFull} className="svg-full"/>
        : <SlideMini img={props.imgMini} className="svg-mini"/>
      }
      <h2 className='mb-0'>{props.title}</h2>
      {
        props.isActive &&
        <Link to='/' className='link btn-1'>Перейти в каталог</Link>
      }
    </div>
  );
};

export default MainSlide;