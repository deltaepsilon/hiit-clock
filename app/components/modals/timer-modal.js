import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Close } from '../svg';
import { AuthenticationContext } from '../contexts/authentication-context';
import ConfirmButton from '../form/confirm-button';
import useTimer from '../hooks/use-timer';
import effects from '../../effects';

export default React.memo(props => {
  const el = window.document.querySelector('#modal');

  return ReactDOM.createPortal(<TimerModal {...props} />, el);
});

function TimerModal({ timerId, onClose }) {
  const { currentUser } = useContext(AuthenticationContext);
  const timer = useTimer({ timerId, userId: currentUser.uid });
  const isOwned = timer.uid == currentUser.uid;

  return (
    <div onClick={onClose}>
      <section onClick={e => e.stopPropagation()}>
        <div className="header">
          <h2>{timer.name}</h2>
          <IconButton className="close" icon={<Close />} onClick={onClose} />
        </div>
        <div className="body">
          <ConfirmButton
            raised
            className="accent"
            onClick={async e => {
              await effects.deleteTimer({ timerId, currentUser, isOwned });

              onClose(e);
            }}
          >
            Delete Me
          </ConfirmButton>
          <Button outlined className="light" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </section>
    </div>
  );
}
