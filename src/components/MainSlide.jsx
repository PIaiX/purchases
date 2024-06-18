import React from 'react'
import { TfiPaintRoller, TfiBriefcase, TfiTruck, TfiCar, TfiSpray, TfiPlug, TfiBlackboard } from "react-icons/tfi"
import { SlScreenDesktop, SlWrench } from "react-icons/sl"
import { RxScissors, RxLapTimer } from "react-icons/rx"

const MainSlide = (props) => {
  const scopes = [
    {
      id: 1,
      icon: <TfiSpray />
    },
    {
      id: 2,
      icon: <TfiPaintRoller />
    },
    {
      id: 3,
      icon: <TfiBriefcase />
    },
    {
      id: 4,
      icon: <TfiTruck />
    },
    {
      id: 5,
      icon: <TfiCar />
    },
    {
      id: 6,
      icon: <TfiPlug />
    },
    {
      id: 7,
      icon: <SlScreenDesktop />
    },
    {
      id: 8,
      icon: <SlWrench />
    },
    {
      id: 9,
      icon: <RxScissors />
    },
    {
      id: 10,
      icon: <TfiBlackboard />
    },
    {
      id: 11,
      icon: <RxLapTimer />
    }
  ]

  return (
    <div className="recent-orders-item">
      <div>
        <div className="icon">
          {
            scopes.find(obj => obj.id === props.scope).icon
          }
        </div>
        <p>{props.name}</p>
      </div>
      <p className='gray-2'>Сделали 12 ч. назад</p>
    </div>
  );
};

export default MainSlide