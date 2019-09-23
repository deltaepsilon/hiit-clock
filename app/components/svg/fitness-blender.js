import React from 'react';

export default ({ width = 24, height = 24, fill = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 405.5 397.67"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="-82.25"
          y1="596.7"
          x2="-72.1"
          y2="596.7"
          gradientTransform="matrix(-39.99, -39.22, -39.99, 39.22, 21005.32, -26222.84)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4296cb" />
          <stop offset="1" stopColor="#4296cb" />
        </linearGradient>
      </defs>
      <path
        fill="#19253b"
        fillRule="evenodd"
        d="M172.53,273.3c12,6.64,125.8-56.06,125.82-69.81s-114.14-76.31-125.82-69.81-12,133,0,139.63Z"
        transform="translate(-28.25 -4.67)"
      />
      <path
        fill="url(#linear-gradient)"
        fillRule="evenodd"
        d="M67.89,85.36A178.66,178.66,0,0,1,174.33,50.44c84.39,0,154.95,57.93,173,135.55,38.5-56.05,12.44-126.87,6.86-140.43A205.57,205.57,0,0,0,67.89,85.36Zm140.21,317a175.69,175.69,0,0,1-84-73.24c-42.19-71.91-26.49-161,32.8-215.2-68.59-4.78-117.89,52.84-127,64.37A196.4,196.4,0,0,0,55.49,303.63C88.9,360.59,146.46,395.24,208.1,402.33ZM394.56,232.66a171.66,171.66,0,0,0,22.49-108.17,197,197,0,0,1-10.57,179.39,201.32,201.32,0,0,1-97.57,84.47c-14.72-2-90.09-15.21-120.19-76C266.09,335.72,352.36,304.55,394.56,232.66Z"
        transform="translate(-28.25 -4.67)"
      />
    </svg>
  );
};
