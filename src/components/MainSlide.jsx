import React from 'react';
import SlideFull from './svg/SlideFull';
import {Link} from 'react-router-dom';
import SlideMini from './svg/SlideMini';
import SlideMobile from './svg/SlideMobile';
import useIsMobile from '../hooks/isMobile';

const MainSlide = (props) => {
  const {mobile} = useIsMobile('1109px');

  return (
    <div 
      className={(props.isActive) ? 'main-slider-item-active' : 'main-slider-item'} 
      onMouseEnter={props.onMouseEnter}
    >
      <div className="position-relative">
        {
          (mobile)
          ? <SlideMobile img={props.imgFull} className="svg-mobile"/>
          : (props.isActive) 
          ? <SlideFull img={props.imgFull} className="svg-full"/>
          : <SlideMini img={props.imgMini} className="svg-mini"/>
        }
        <div className="lots">
          <div className='num'>1325</div>
          <div>лотов</div>
        </div>
      </div>
      <div className="title-full">
      {/* прозрачное появление */}
        <h2>{props.title}</h2> 
      </div>
      <div className="title-mini"><h2>{props.title}</h2></div>
      <Link to='/' className='link btn-1'>Перейти в каталог</Link>
    </div>
  );
};

export default MainSlide;