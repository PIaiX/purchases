import React from 'react';
import moment from "moment";
import WarningIcon from '../svg/WarningIcon';


const Message = ({ my, time, text, name }) => {

  time = time
    ? moment(time).format("DD MMMM YYYY kk:mm")
    : moment().format("DD MMMM YYYY kk:mm");
  return my ? (
    <div className="chat-window-message-mine">
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          <time className='me-2'>{time}</time>
        </div>
        <div className="bubble">
          <p>{text}</p>
        </div>
      </div>
      <img src="/imgs/user.jpg" alt={name} />
    </div>

  ) : (
    <div className="chat-window-message">
      <img src="/imgs/user.jpg" alt={name} />
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          <time className='me-2'>{time}</time>
          <button type='button' className='report d-flex fs-15'>
            <WarningIcon />
          </button>
        </div>
        <div className="bubble">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
};
export default Message;