import React from 'react';
import {Link} from 'react-router-dom';

const ReturnLink = (props) => {
  return (
    <Link to={props.link} className='return-link'>
      <svg className={props.className} width="1em" height="1em" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 8L9 15.5L16.5 23" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="15" cy="15.5" r="14.5" stroke="currentColor" strokeWidth="1.25"/>
      </svg>
    </Link>
  );
};

export default ReturnLink;