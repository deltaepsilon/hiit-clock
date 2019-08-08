import React, { useCallback, useState } from 'react';
import constants from '../constants';

export default ({ children, onLongPress, onLeftSwipe, onRightSwipe }) => {
  const [touches, setTouches] = useState({});
  const [mouseDownMillis, setMouseDownMillis] = useState(null);
  const handleTouchEnd = useCallback(
    e => {
      processLongPress(e, { mouseDownMillis, onLongPress });
      processTouchEnd(e, { onLeftSwipe, onRightSwipe, touches });
    },
    [mouseDownMillis]
  );
  const handleTouchStart = useCallback(e => {
    setTouches(getTouchesByTypeSetter(e));
    setMouseDownMillis(Date.now());
  });
  const handleTouchMove = useCallback(e => setTouches(getTouchesByTypeSetter(e)), [setTouches]);

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}>
      {children}
    </div>
  );
};

function getTouchesByTypeSetter(e) {
  const { type } = e;

  e.persist();

  return touches => {
    let updatedTouches = touches;

    if (e.changedTouches && e.changedTouches.length) {
      const { pageX } = e.changedTouches[0];

      updatedTouches = {
        ...touches,
        [type]: {
          x: pageX,
        },
      };
    }

    return updatedTouches;
  };
}

function processLongPress(e, { mouseDownMillis, onLongPress }) {
  const millisElapsed = Date.now() - mouseDownMillis;
  const isLongPress = millisElapsed > constants.TOUCH_EVENTS.LONG_PRESS_MILLIS;

  if (isLongPress && onLongPress) {
    e.preventDefault();

    onLongPress(e);
  }
}

function processTouchEnd(e, { onLeftSwipe, onRightSwipe, touches }) {
  e.persist();

  const { pageX } = e.changedTouches[0];
  const { x: lastX } = touches.touchstart;
  const lastXChange = pageX - lastX;
  const threshhold = constants.TOUCH_EVENTS.SWIPE_THRESHOLD_PX;
  const isLeftSwipe = lastXChange < -1 * threshhold;
  const isRightSwipe = lastXChange > threshhold;

  isLeftSwipe && onLeftSwipe(e);
  isRightSwipe && onRightSwipe(e);
}
