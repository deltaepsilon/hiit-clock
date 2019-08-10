import React, { useRef, useEffect, useState } from 'react';
import useElementDimensions from '../hooks/use-element-dimensions';
import renderCycleProgress from './render/render-cycle-progress';
import constants from '../constants';
import TotalTime from '../timer/total-time';

import './canvas.css';

const canvasOverlayStyles = {
  top: `${constants.DIMENSIONS.CYCLE_PROGRESS.INSET_Y +
    constants.DIMENSIONS.CYCLE_PROGRESS.INSET_PROGRESS}px`,
  right: `${constants.DIMENSIONS.CYCLE_PROGRESS.INSET_X}px`,
  bottom: `${constants.DIMENSIONS.CYCLE_PROGRESS.INSET_Y}px`,
  left: `${constants.DIMENSIONS.CYCLE_PROGRESS.INSET_X}px`,
};

export default ({ cycleStats }) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const { height, width } = useElementDimensions(wrapperRef.current);
  const paddedWidth = parseInt(width) - constants.DIMENSIONS.CYCLE_PROGRESS.INSET_X * 2 || 0;
  const paddedHeight = parseInt(height) - constants.DIMENSIONS.CYCLE_PROGRESS.INSET_Y * 1 || 0;

  useEffect(() => {
    cycleStats.cycle && renderCycleProgress(canvasRef.current, cycleStats);
  }, [cycleStats, height, width]);

  return (
    <div className="canvas-wrapper" ref={wrapperRef}>
      <div className="canvas-overlay" style={canvasOverlayStyles}>
        {cycleStats.cycle &&
          cycleStats.cycle.map((period, i) => {
            return (
              <div
                key={i}
                style={{
                  width: `${period.percentOfCycle * 100}%`,
                }}
              >
                <TotalTime totalSeconds={period.totalSeconds} minimal />
              </div>
            );
          })}
      </div>
      <canvas width={paddedWidth} height={paddedHeight} ref={canvasRef} />
    </div>
  );
};
