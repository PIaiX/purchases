import React from 'react';
import AnswerIcon from '../svg/AnswerIcon';

const UserMessage = (props) => {
  return (
    <div className="chat-window-message">
      <img src="imgs/user.jpg" alt={props.name} />
      <div className='text'>
        <h5>{props.name}</h5>
        <div className="bubble">
          <time>{props.time}</time>
          <button type='button' className='toAnswer'><AnswerIcon/></button>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;