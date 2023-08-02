import React, { useState } from "react";
import MainSlide from "./MainSlide";
import useIsMobile from "../hooks/isMobile";
import NextIcon from "./svg/NextIcon";
import PrevIcon from "./svg/PrevIcon";

const MainSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobileLG = useIsMobile("1109px");

  const handleClick = (num) => {
    setActiveSlide(num);
  };

  const handleNext = () => {
    const nextSlide = activeSlide + 1;
    if (nextSlide > 2) {
      setActiveSlide(2);
    } else {
      setActiveSlide(nextSlide);
    }
  };
  const handlePrev = () => {
    const nextSlide = activeSlide - 1;
    if (nextSlide < 0) {
      setActiveSlide(0);
    } else {
      setActiveSlide(nextSlide);
    }
  };

  return (
    <div className="main-slider">
      <div
        className={
          activeSlide === 0
            ? "main-slider-box pos-1"
            : activeSlide === 1
            ? "main-slider-box pos-2"
            : "main-slider-box pos-3"
        }
      >
        <MainSlide
          isActive={activeSlide === 0}
          title={"Genshin Impact"}
          imgFull={"/imgs/slider/960x0.jpg"}
          imgMini={"/imgs/slider/slide-cover-2.jpg"}
          onClick={() => handleClick(1)}
        />
        <MainSlide
          isActive={activeSlide === 1}
          title={"Atomic Heart"}
          imgFull={"/imgs/slider/atomic.jpg"}
          imgMini={"/imgs/slider/slide-cover-3.jpg"}
          onClick={() => handleClick(1)}
        />
        <MainSlide
          isActive={activeSlide === 2}
          title={"wOw"}
          imgFull={"/imgs/slider/gif.gif"}
          imgMini={"/imgs/slider/slide-cover-1.jpg"}
          onClick={() => handleClick(2)}
        />
      </div>
      {isMobileLG && (
        <>
          <button
            type="button"
            className="main-slider-prev"
            onClick={handlePrev}
          >
            <PrevIcon />
          </button>
          <button
            type="button"
            className="main-slider-next"
            onClick={handlePrev}
          >
            <NextIcon />
          </button>
        </>
      )}
      {isMobileLG && (
        <ul className="main-slider-indicators">
          <li className={activeSlide === 0 ? "active" : ""}></li>
          <li className={activeSlide === 1 ? "active" : ""}></li>
          <li className={activeSlide === 2 ? "active" : ""}></li>
        </ul>
      )}
    </div>
  );
};

export default MainSlider;
