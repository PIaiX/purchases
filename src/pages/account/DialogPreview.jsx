import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";

const DialogPreview = ({ id, nickname, text, time, image, status }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const timePassed = moment(time).fromNow();
      setElapsedTime(timePassed);
    }, 1000); // Обновление времени каждую минуту

    return () => clearInterval(interval);
  }, [time]);

  const data = { time }
    ? moment(time).format("DD.MM.YYYY kk:mm")
    : moment().format("DD MMMM YYYY kk:mm");
  return (
    <NavLink to={`${id}`} className="dialog-preview">
      <img src={image} alt="user" />

      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{nickname}</h6>
          <time>{elapsedTime}</time>
        </div>
        <p>{text}</p>
        {status &&
          <div className="indicator green"></div>}
      </div>

    </NavLink>
  );
};

export default DialogPreview;