import React from "react";
import SlideFull from "./svg/SlideFull";
import { Link } from "react-router-dom";
import SlideMini from "./svg/SlideMini";
import SlideMobile from "./svg/SlideMobile";
import useIsMobile from "../hooks/isMobile";
import { declOfNum } from "../helpers/all";

const MainSlide = (props) => {
  const isMobileLG = useIsMobile("1109px");
  const declension = declOfNum(props?.length, ['лот', 'лота', 'лотов']);
  return (
    <div
      className={
        props.isActive ? "main-slider-item-active" : "main-slider-item"
      }
      onMouseEnter={props.onMouseEnter}
      onClick={props.onClick}
    >
      <div className="wrap">
        {isMobileLG ? (
          <SlideMobile img={props.imgFull} className="svg-mobile" />
        ) : props.isActive ? (
          <SlideFull img={props.imgFull} className="svg-full" />
        ) : (
          <SlideMini img={props.imgMini} className="svg-mini" />
        )}
        <div className="lots">
          <div className="num">1325</div>
          <div>{declension}</div>
        </div>
      </div>
      <div className="title-full">
        {/* прозрачное появление */}
        <h2>{props.title}</h2>
      </div>
      <div className="title-mini">
        <h2>{props.title}</h2>
      </div>
      <Link to={`/game/${props.id}`} className="link btn-1">
        {props.btn ? props.btn : "Перейти в каталог"}
      </Link>
    </div>
  );
};

export default MainSlide;
