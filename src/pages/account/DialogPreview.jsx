import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";
import { getImageURL } from '../../helpers/all';

const DialogPreview = ({ id, to, from, messages, userId, updatedAt, messageCount }) => {

  const user = (userId == to.id ? from : to);
  const imag = getImageURL({ path: user?.media, size: "mini", type: "user" })
  return (
    <NavLink to={`/account/messages/${id}`} className="dialog-preview">
      <img src={imag} alt="user" />

      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{user.nickname}</h6>
          <time>{moment(updatedAt).subtract(5, 'seconds').fromNow()}</time>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <p>{messages[0]?.text ?? "Нет сообщений"}</p>
          {messageCount > 0 && <div className='count'></div>}
        </div>

        {user.online.status &&
          <div className="indicator green"></div>}
      </div>
    </NavLink>
  );
};

export default DialogPreview;