import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";

const DialogPreview = (props) => {
  const time = props.time
    ? moment(props.time).format("DD MMMM YYYY kk:mm")
    : moment().format("DD MMMM YYYY kk:mm");
  return (
    <NavLink to={`${props.link}`} className="dialog-preview">
      <img src="/imgs/user.jpg" alt="user" />
      <div className="indicator green"></div>
      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{props.nickname}</h6>
          <time>{time}</time>
        </div>
        <p>{props.text}</p>
      </div>
    </NavLink>
  );
};

export default DialogPreview;