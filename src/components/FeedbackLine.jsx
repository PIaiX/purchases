import React, { useState } from 'react';
import StarRating from './utils/StarRating';
import moment from "moment";
import { getImageURL } from '../helpers/all';
import { Link } from 'react-router-dom';


const FeedbackLine = ({ text, value, createdAt, author, user }) => {
  const [clampOff, setClampOff] = useState(false);

  const toggleClamp = () => {
    setClampOff(!clampOff);
  };
  const data = moment(createdAt).fromNow();
  const image = getImageURL({ path: author, type: "user" })
  return (
    <div className="feedback-line">

      <Link to={`/trader/${author.id}`}><div className='photo'> <img src={image} alt="user" /></div></Link>
      <div className='feedback-line-main'>
        <div className='feedback-line-top'>
          <h5><Link to={`/trader/${author.id}`}>{author.nickname}</Link></h5>
          <div className='d-flex align-items-center'>
            <span className='d-none d-md-block fs-09 fw-3 me-3'>{data}</span>
            <StarRating value={value} />
          </div>
          <h5><Link to={`/trader/${user.id}`}>{user.nickname}</Link></h5>
        </div>
        <div className='feedback-line-text'>
          <p className={clampOff ? 'clamp-off' : ''} onClick={toggleClamp}>{text}</p>

        </div>

      </div>
    </div>
  );
};

export default FeedbackLine;