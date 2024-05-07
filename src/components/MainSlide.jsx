import React from "react";
import SlideFull from "./svg/SlideFull";
import { Link } from "react-router-dom";
import SlideMini from "./svg/SlideMini";
import SlideMobile from "./svg/SlideMobile";
import useIsMobile from "../hooks/isMobile";
import { declOfNum } from "../helpers/all";

const MainSlide = ({ length, onMouseEnter, onClick, isActive, imgFull, imgMini, title, id, btn }) => {
  const isMobileLG = useIsMobile("991px");
  const declension = declOfNum(length, ['лот', 'лота', 'лотов']);
  return (
    <div
      className={
        isActive ? "main-slider-item-active" : "main-slider-item"
      }
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div className="wrap">
        {isMobileLG ? (
          <SlideMobile img={imgFull} declension={declension} className="svg-mobile" />
        ) : isActive ? (
          <SlideFull img={imgFull} declension={declension} id={id} btn={btn} className="svg-full" />
        ) : (
          <SlideMini img={imgMini} declension={declension} className="svg-mini" />
        )}

      </div>
      <div className="title-full">
        {/* прозрачное появление */}
        <h2>{title}</h2>
      </div>
      <div className="title-mini">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default MainSlide;
