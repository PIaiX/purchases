import React from 'react';

const CheckMark = (props) => {
  return (
    <svg className={props.className} width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="10" fill="currentColor"/>
      <path d="M14 8L8.5 13.5L6 11" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CheckMark;