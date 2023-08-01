import React from 'react';

const MyMessage = (props) => {
  return (
    <div className="chat-window-message-mine">
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          <time className='me-2'>{props.time}</time>
          <time className='me-2'>06/07/23</time>
        </div>
        <div className="bubble">
          <p>{props.text}</p>
        </div>
      </div>
      <img src="imgs/user.jpg" alt={props.name} />
    </div>
  );
};

export default MyMessage;