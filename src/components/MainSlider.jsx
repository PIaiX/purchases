import React, {useState} from 'react';
import MainSlide from './MainSlide';

const MainSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="main-slider">
      <MainSlide
        isActive={(activeSlide === 0) ? true : false} 
        title={"World of Warcraft"} 
        imgFull={"imgs/gif.gif"}
        imgMini={"imgs/slide-cover-3.jpg"}
        onMouseEnter={() => setActiveSlide(0)}
      />
      <MainSlide 
        isActive={(activeSlide === 1) ? true : false} 
        title={"Genshin Impact"} 
        imgFull={"imgs/960x0.jpg"}
        imgMini={"imgs/slide-cover-2.jpg"}
        onMouseEnter={() => setActiveSlide(1)}
      />
      <MainSlide 
        isActive={(activeSlide === 2) ? true : false} 
        title={"Atomic Heart"} 
        imgFull={"imgs/nova-filepond-1snzk9-1060x596.png"}
        imgMini={"imgs/slide-cover-3.jpg"}
        onMouseEnter={() => setActiveSlide(2)}
      />
    </div>
  );
};

export default MainSlider;