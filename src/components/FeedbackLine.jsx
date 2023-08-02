import React from 'react';
import StarRating from './utils/StarRating';

const FeedbackLine = (props) => {
  return (
    <div className="feedback-line">
      <img src="/imgs/user.jpg" alt="user" />
      <div className='feedback-line-main'>
        <div className='feedback-line-top'>
          <h5>{props.user}</h5>
          <div className='d-flex align-items-center'>
            <span className='d-none d-md-block fs-09 fw-3 me-3'>В этом месяце</span>
            <StarRating rate={props.rate}/>
          </div>
        </div>
        <div className='feedback-line-text'>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackLine;