import React, { useEffect, useState } from 'react';
import { Button } from '@rmwc/button';

import './confirm-button.css';

export default function ConfirmButton({
  children,
  onClick,
  confirmText = 'confirm',
  ...buttonProps
}) {
  const [disabled, setDisabled] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isConfirming) {
      clearTimeout(timer);

      setTimer(setTimeout(() => setIsConfirming(false), 1000 * 2));
    }
  }, [isConfirming]);

  return (
    <Button
      className="confirm-button"
      disabled={disabled}
      is-confirming={String(isConfirming)}
      {...buttonProps}
      onClick={async e => {
        e.preventDefault();

        if (isConfirming) {
          clearTimeout(timer);

          setDisabled(true);

          await onClick(e);

          setIsConfirming(false);
          setDisabled(false);
        } else {
          setIsConfirming(true);
        }
      }}
    >
      {isConfirming ? confirmText : children}
    </Button>
  );
}
