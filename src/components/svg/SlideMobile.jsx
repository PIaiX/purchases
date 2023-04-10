import React from 'react';

const SlideMobile = (props) => {
  return (
  <svg className={props.className} width="335" height="266" viewBox="0 0 335 266" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <image id="imgMobile" x="-55" y="35" width="445" height="250" xlinkHref={props.img} clipPath="url(#figure-3)" />
    <rect x="25" width="70" height="70" rx="35" fill="currentColor"/>
    <defs>
      <clipPath id="figure-3">
        <path d="M22.6355 49.3094C20.8648 44.6887 16.7871 41 11.8387 41H10C4.47715 41 0 45.4771 0 51V161C0 166.523 4.65143 170.814 9.73741 172.967C18.7069 176.764 25 185.647 25 196C25 206.353 18.7069 215.236 9.7374 219.033C4.65143 221.186 0 225.477 0 231V256C0 261.523 4.47714 266 9.99999 266H325C330.523 266 335 261.523 335 256V231C335 225.477 330.349 221.186 325.263 219.033C316.293 215.236 310 206.353 310 196C310 185.647 316.293 176.764 325.263 172.967C330.349 170.814 335 166.523 335 161V51C335 45.4771 330.523 41 325 41H108.161C103.213 41 99.1352 44.6887 97.3645 49.3094C91.6073 64.3333 77.0493 75 60 75C42.9507 75 28.3927 64.3333 22.6355 49.3094Z"/>
      </clipPath>
    </defs>
  </svg>

  );
};

export default SlideMobile;