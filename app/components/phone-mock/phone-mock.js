import React from "react";
import "./phone-mock.css";

export default ({ src, alt }) => {
  return (
    <div className="phone-mock">
      <div className="left-camera camera" />
      <div className="right-camera camera" />
      <div className="top-speaker speaker" />
      <div className="bottom-speaker speaker" />
      <div className="screen">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
