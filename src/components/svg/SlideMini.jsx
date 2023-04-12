import React from 'react';

const SlideMini = (props) => {
  return (
  <svg className={props.className} width="260" height="430" viewBox="0 0 260 430" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <image id="imageMini" preserveAspectRatio="xMidYMid slice" width="230" height="430" xlinkHref={props.img} clipPath="url(#figure-2)"/>
    <rect x="200" y="341" width="60" height="60" rx="30" fill="currentColor"/>
    <defs>
      <clipPath id="figure-2">
        <path fillRule="evenodd" clipRule="evenodd" d="M230 10C230 4.47715 225.523 0 220 0H10C4.47715 0 0 4.47716 0 10V420C0 425.523 4.47715 430 10 430H220C225.523 430 230 425.523 230 420V416C230 410.477 225.432 406.144 220.132 404.59C205.607 400.329 195 386.903 195 371C195 355.097 205.607 341.671 220.132 337.41C225.432 335.856 230 331.523 230 326V10Z"/>
      </clipPath>
    </defs>
  </svg>

  );
};

export default SlideMini;