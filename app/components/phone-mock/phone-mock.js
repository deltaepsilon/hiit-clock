import React from 'react';
import './phone-mock.css';

export default ({ children }) => {
  return (
    <div className="phone-mock">
      <div className="left-camera camera" />
      <div className="right-camera camera" />
      <div className="top-speaker speaker" />
      <div className="bottom-speaker speaker" />
      <div className="screen">{children}</div>
    </div>
  );
};
