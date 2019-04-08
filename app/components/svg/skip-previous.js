import React from 'react';

export default ({ width = 24, height = 24, fill = 'white' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill={fill} d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  );
};
