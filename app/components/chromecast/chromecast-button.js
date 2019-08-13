/* globals window */
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';
import './chromecast-button.css';

export default () => {
  const [castAvailable] = useState(window.castAvailable);
  const { currentUser } = useContext(AuthenticationContext);

  useEffect(() => {
    castAvailable && initializeCastApi();

    // const context = cast.framework.CastContext.getInstance();

    // context.addEventListener(
    //   cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    //   handleSessionStateChanged
    // );

    // () =>
    //   context.removeEventListener(
    //     cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    //     handleSessionStateChanged
    //   );
  }, [castAvailable]);

  return <google-cast-launcher id="chromecast-button" />;
};

function initializeCastApi() {
  const receiverApplicationId = constants.CHROMECAST.APPLICATIONS[location.host];

  console.log('receiverApplicationId', receiverApplicationId);

  window.cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });
}

function handleSessionStateChanged(event) {
  console.log('event', event);
  switch (event.sessionState) {
    case cast.framework.SessionState.SESSION_STARTED:
    case cast.framework.SessionState.SESSION_RESUMED:
      break;
    case cast.framework.SessionState.SESSION_ENDED:
      console.log('CastContext: CastSession disconnected');
      // Update locally as necessary
      break;
  }
}
