import React from 'react';

const CrossMark = (props) => {
  return (
    <svg className={props.className} width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="10" fill="currentColor"/>
      <path d="M13 7L7 13" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 7L13 13" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default CrossMark;