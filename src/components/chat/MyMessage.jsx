import React from 'react';

const MyMessage = (props) => {
  return (
    <div className="chat-window-message-mine">
      <div className='text'>
        <h5>{props.name}</h5>
        <div className="bubble">
          <time>{props.time}</time>
          <p>{props.text}</p>
        </div>
      </div>
      <img src="imgs/user.jpg" alt={props.name} />
    </div>
  );
};

export default MyMessage;