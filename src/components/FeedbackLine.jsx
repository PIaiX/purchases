import React from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';


const FeedbackLine = ({ text, value, createdAt, author, user }) => {
  const data = moment(createdAt).format("DD.MM.YYYY kk:mm");
  const image = getImageURL({ path: author, type: "user" })
  return (
    <div className="feedback-line">
      <img src={image} alt="user" />
      <div className='feedback-line-main'>
        <div className='feedback-line-top'>
          <h5>{author.nickname}</h5>
          <div className='d-flex align-items-center'>
            <span className='d-none d-md-block fs-09 fw-3 me-3'>{data}</span>
            <StarRating value={value} />
          </div>
          <h5>{user.nickname}</h5>
        </div>
        <div className='feedback-line-text'>
          <p>{text}</p>

        </div>

      </div>
    </div>
  );
};

export default FeedbackLine;