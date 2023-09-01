import React from 'react';

const SlideMini = (props) => {
  return (
  <svg className={props.className} width="260" height="318" viewBox="0 0 260 318" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <image id="imageMini" preserveAspectRatio="xMidYMid slice" width="230" height="430" xlinkHref={props.img} clipPath="url(#figure-2)"/>
    <rect x="200" y="221" width="60" height="60" rx="30" fill="currentColor"/>
    <defs>
      <clipPath id="figure-2">
        <path fillRule="evenodd" clipRule="evenodd" d="M230 10C230 4.47715 225.523 0 220 0H10C4.47715 0 0 4.47714 0 9.99999V308C0 313.523 4.47715 318 10 318H220C225.523 318 230 313.523 230 308V296C230 290.477 225.432 286.144 220.132 284.59C205.607 280.329 195 266.903 195 251C195 235.097 205.607 221.671 220.132 217.41C225.432 215.856 230 211.523 230 206V10Z"/>
      </clipPath>
    </defs>
  </svg>

  );
};

export default SlideMini;