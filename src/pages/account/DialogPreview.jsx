import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";
import { getImageURL } from '../../helpers/all';

const DialogPreview = ({ id, to, message }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const timePassed = moment().to(message.createdAt);
    setElapsedTime(timePassed);
  }, [message.createdAt]);
  const imag = getImageURL({ path: to, type: "user" })

  return (
    <NavLink to={`${id}`} className="dialog-preview">
      <img src={imag} alt="user" />

      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{to.nickname}</h6>
          <time>{elapsedTime}</time>
        </div>
        <p>{message.text ?? "Нет сообщений"}</p>
        {to.online.status &&
          <div className="indicator green"></div>}
      </div>

    </NavLink>
  );
};

export default DialogPreview;