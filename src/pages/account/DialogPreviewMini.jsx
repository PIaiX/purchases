import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from "moment";
import { getImageURL } from '../../helpers/all';

const DialogPreviewMini = ({ id, to, from, message, userId }) => {

  const user = (userId == to.id ? from : to);
  const imag = getImageURL({ path: user?.media, size: "mini", type: "user" })
  return (
    <div to={`/account/messages/${id}`} className="preview">
      <img src={imag} alt="user" className='me-3' />

      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>{user.nickname}</h6>
          <time>{moment(message.createdAt).subtract(5, 'seconds').fromNow()}</time>
        </div>
        <p>{message.text ?? "Нет сообщений"}</p>
        {user.online.status &&
          <div className="indicator green"></div>}
      </div>

    </div>
  );
};

export default DialogPreviewMini;