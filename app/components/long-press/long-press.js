import React, { useCallback, useState } from 'react';

export default ({ children, onPress, millis = 300 }) => {
  const [mouseDownMillis, setMouseDownMillis] = useState(null);
  const handleClick = useCallback(
    e => {
      const millisElapsed = Date.now() - mouseDownMillis;
      const isLongPress = millisElapsed > millis;

      if (isLongPress && onPress) {
        e.preventDefault();

        onPress(e);
      }
    },
    [mouseDownMillis]
  );
  const handleMouseDown = useCallback(() => setMouseDownMillis(Date.now()));

  return (
    <div
      onClick={handleClick}
      onTouchEnd={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {children}
    </div>
  );
};
