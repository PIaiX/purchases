import React, { useState } from "react";
import MainSlide from "./MainSlide";
import useIsMobile from "../hooks/isMobile";
import NextIcon from "./svg/NextIcon";
import PrevIcon from "./svg/PrevIcon";
import { getImageURL } from "../helpers/all";

const MainSlider = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobileLG = useIsMobile("1109px");

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
      <div className={"main-slider-box pos-" + (activeSlide + 1)}>
        {data?.map((e, index) => (
          <MainSlide
            isActive={activeSlide === index}
            title={e.title ? e.title : "Название"}
            imgFull={getImageURL({
              path: e.media,
              type: "sale",
              size: "full",
            })}
            id={e.categoryId}
            btn={e.btn}
            imgMini={getImageURL({ path: e.mediaMini, type: "sale" })}
            onClick={() => setActiveSlide(index)}
          />
        ))}
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
            onClick={handleNext}
          >
            <NextIcon />
          </button>
        </>
      )}
      {isMobileLG && (
        <ul className="main-slider-indicators">
          {data.map((e, index) => (
            <li className={activeSlide === index ? "active" : ""}></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainSlider;
