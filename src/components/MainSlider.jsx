import React, {useState} from 'react';
import MainSlide from './MainSlide';

const MainSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="main-slider">
      <MainSlide
        isActive={(activeSlide === 0) ? true : false} 
        title={"World of Warcraft"} 
        imgFull={"imgs/slider/gif.gif"}
        imgMini={"imgs/slider/slide-cover-3.jpg"}
        onMouseEnter={() => setActiveSlide(0)}
      />
      <MainSlide 
        isActive={(activeSlide === 1) ? true : false} 
        title={"Genshin Impact"} 
        imgFull={"imgs/slider/960x0.jpg"}
        imgMini={"imgs/slider/slide-cover-2.jpg"}
        onMouseEnter={() => setActiveSlide(1)}
      />
      <MainSlide 
        isActive={(activeSlide === 2) ? true : false} 
        title={"Atomic Heart"} 
        imgFull={"imgs/slider/nova-filepond-1snzk9-1060x596.png"}
        imgMini={"imgs/slider/slide-cover-3.jpg"}
        onMouseEnter={() => setActiveSlide(2)}
      />
    </div>
  );
};

export default MainSlider;