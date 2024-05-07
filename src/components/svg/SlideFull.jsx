import React from 'react';
import { Link } from 'react-router-dom';

const SlideFull = ({ className, img, declension, id, btn }) => {
  return (
    <svg className={className} width="899" height="413" viewBox="0 0 899 413" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

      <image id="imageFull" preserveAspectRatio="xMidYMid slice" width="899" height="413" xlinkHref={img} clipPath="url(#figure-1)" />
      <rect x="40" width="90" height="90" rx="45" fill="currentColor" />
      <foreignObject x="40" y="0" width="90" height="90">
        <div className="lots">
          <div className="num">1325 </div>
          <div>{declension}</div>
        </div>
      </foreignObject>
      <foreignObject x="638" y="328" width="256" height="90">
        <Link to={`/game/${id}`} className="link btn-1">
          {btn ? btn : "Перейти в каталог"}
        </Link>
      </foreignObject>
      <defs>
        <clipPath id="figure-1">
          <path fillRule="evenodd" clipRule="evenodd" d="M28.4636 38C32.1735 38 35 41.2901 35 45V45C35 72.6142 57.3858 95 85 95C112.614 95 135 72.6142 135 45V45C135 41.2901 137.826 38 141.536 38L889 38C894.523 38 899 42.4772 899 48V403C899 408.523 894.523 413 889 413H10C4.47716 413 0 408.523 0 403V48C0 42.4771 4.47715 38 10 38H28.4636Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SlideFull;