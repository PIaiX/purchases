import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";

const DialogPreview = ({ id, nickname, text, time, image }) => {
  const data = { time }
    ? moment(time).format("DD MMMM YYYY kk:mm")
    : moment().format("DD MMMM YYYY kk:mm");
  return (
    <NavLink to={`${id}`} className="dialog-preview">
      <img src={image} alt="user" />

      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{nickname}</h6>
          <time>{data}</time>
        </div>
        <p>{text}</p>
        <div className="indicator green"></div>
      </div>

    </NavLink>
  );
};

export default DialogPreview;