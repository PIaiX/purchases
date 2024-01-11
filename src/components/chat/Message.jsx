import React from 'react';
import moment from "moment";
import WarningIcon from '../svg/WarningIcon';

import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getImageURL } from '../../helpers/all';


const Message = ({ my, id, general, time, text, name, admin, user, view = false }) => {
  const image = getImageURL({ path: user, type: "user" })
  time = time
    ? moment(time).format("DD.MM.YYYY kk:mm")
    : moment().format("DD.MM.YYYY kk:mm");
  return my ? (
    <div className="chat-window-message-mine">
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          <time className='me-2'>
            {time}
          </time>
          {view ? (
            <IoCheckmarkDoneOutline className="text-success ms-1" size={15} />
          ) : (
            <IoCheckmarkOutline className="ms-1" size={15} />
          )}

        </div>
        <div className="bubble">
          <p>{text}</p>
        </div>
      </div>
      <img src={image} alt={name} />
    </div>

  ) : (
    admin ? (
      <div className="chat-window-message">
        <img src={image} alt={name} />
        <div className='text'>
          <div className='gray fs-08 d-flex align-items-center mb-2'>
            <h6 className="me-2 fs-12">Admin </h6>
            <time className='me-2'> {time}</time>

          </div>
          <div className="bubble">
            <p>{text}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="chat-window-message">
        <Link to={`/profile/${id}`}><img src={image} alt={name} /></Link>
        <div className='text'>
          <div className='gray fs-08 d-flex align-items-center mb-2'>
            {general == "general" &&
              <h6 className="me-2 fs-12">{user.nickname}</h6>
            }
            <time className='me-2'>{time}</time>
          </div>
          <div className="bubble">
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  )
};
export default Message;