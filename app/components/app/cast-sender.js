import React, { useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';

let externalSetIsLoaded;

export default function CastSender() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [instance, setInstance] = useState(null);
  const [session, setSession] = useState(null);
  const [castAvailable] = useState(window.castAvailable);
  const { currentUser } = useContext(AuthenticationContext);
  const sendCurrentUser = useCallback(() => {
    if (currentUser) {
      const session = cast.framework.CastContext.getInstance().getCurrentSession();

      session &&
        session.sendMessage(
          constants.CHROMECAST.NAMESPACE,
          { uid: currentUser.uid },
          console.info,
          console.error
        );
    }
  }, [currentUser]);
  const handleSessionStateChanged = useCallback(
    event => {
      const session = instance ? instance.getCurrentSession() : null;

      setSession(session);

      switch (event.sessionState) {
        case cast.framework.SessionState.SESSION_STARTED:
          sendCurrentUser();
        case cast.framework.SessionState.SESSION_RESUMED:
          sendCurrentUser();
          break;
        case cast.framework.SessionState.SESSION_ENDED:
          console.info('CastContext: CastSession disconnected');
          break;
      }
    },
    [instance, sendCurrentUser]
  );
  const handleCastStateChanged = useCallback(
    event => {
      switch (event.castState) {
        case cast.framework.CastState.CONNECTED:
          sendCurrentUser();
          break;
        case cast.framework.CastState.NOT_CONNECTED:
          break;
        case cast.framework.CastState.CONNECTING:
          break;
        default:
          break;
      }
    },
    [instance]
  );

  useEffect(() => {
    sendCurrentUser();
  }, [sendCurrentUser]);

  useEffect(() => {
    externalSetIsLoaded = setIsLoaded;
  }, [setIsLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const instance = cast.framework.CastContext.getInstance();

      setInstance(instance);
      setSession(instance.getCurrentSession());

      instance.addEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        handleSessionStateChanged
      );

      instance.addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );

      return () => {
        instance.removeEventListener(
          cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
          handleSessionStateChanged
        );

        instance.removeEventListener(
          cast.framework.CastContextEventType.CAST_STATE_CHANGED,
          handleCastStateChanged
        );
      };
    }
  }, [castAvailable, currentUser, isLoaded]);

  useEffect(() => {
    if (session) {
      function messageHandler(e) {
        console.info('e message', e);
      }

      session.addMessageListener(constants.CHROMECAST.NAMESPACE, messageHandler);

      return () => session.removeMessageListener(constants.CHROMECAST.NAMESPACE, messageHandler);
    }
  }, [session]);

  return (
    <Head>
      <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
    </Head>
  );
}

/**
 * See _document.js for invocation
 */
function initializeCastApi() {
  const receiverApplicationId = constants.CHROMECAST.APPLICATIONS[location.host];

  window.cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });

  externalSetIsLoaded(true);
}

if (typeof window != 'undefined') {
  window.initializeCastApi = initializeCastApi;
}
