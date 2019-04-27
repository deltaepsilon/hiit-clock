import React, { useRef, useEffect } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';

import useElementDimensions from '../hooks/use-element-dimensions';
import renderTimerProgress from './render/render-timer-progress';
import constants from '../constants';

import './canvas.css';

export default ({ timer, cycles, secondsElapsed }) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const { height, width } = useElementDimensions(wrapperRef.current);
  const paddedWidth = parseInt(width) - constants.DIMENSIONS.CYCLE_PROGRESS.INSET_X * 2 || 0;
  const paddedHeight = parseInt(height) - constants.DIMENSIONS.CYCLE_PROGRESS.INSET_Y * 1 || 0;

  useEffect(() => {
    const totalSeconds = calculateTimerTotalSeconds(timer);

    timer && renderTimerProgress(canvasRef.current, { timer, totalSeconds, secondsElapsed });
  }, [cycles, secondsElapsed, height, width]);

  return (
    <div className="canvas-wrapper" ref={wrapperRef}>
      <canvas width={paddedWidth} height={paddedHeight} ref={canvasRef} />
    </div>
  );
};
