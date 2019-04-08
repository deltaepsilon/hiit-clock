import React from 'react';

export default ({ width = 24, height = 24, fill = 'white' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill={fill} d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  );
};
