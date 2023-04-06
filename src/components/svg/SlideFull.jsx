import React from 'react';

const SlideFull = (props) => {
  return (
    <svg className={props.className} width="899" height="524" viewBox="0 0 899 524" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <image id="imageFull" width="980" height="550" xlinkHref={props.img} clipPath="url(#figure-1)"/>
      <rect x="40" width="90" height="90" rx="45" fill="currentColor"/>
      <defs>
        <clipPath id="figure-1">
          <path fillRule="evenodd" clipRule="evenodd" d="M36.7317 58.0929C35.3691 53.0572 31.1348 49 25.9179 49H10C4.47715 49 0 53.4772 0 59V514C0 519.523 4.47716 524 10 524H889C894.523 524 899 519.523 899 514V59C899 53.4772 894.523 49 889 49H144.082C138.865 49 134.631 53.0572 133.268 58.0929C127.514 79.3568 108.084 95 85 95C61.916 95 42.4858 79.3568 36.7317 58.0929Z"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default SlideFull;