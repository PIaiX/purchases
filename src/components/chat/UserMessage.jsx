import React from 'react';
import WarningIcon from '../svg/WarningIcon';

const UserMessage = (props) => {
  return (
    <div className="chat-window-message">
      <img src="/imgs/user.jpg" alt={props.name} />
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          <time className='me-2'>{props.time}</time>
          <time className='me-2'>06/07/23</time>
          <button type='button' className='report d-flex fs-15'>
            <WarningIcon/>
          </button>
        </div>
        <div className="bubble">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;