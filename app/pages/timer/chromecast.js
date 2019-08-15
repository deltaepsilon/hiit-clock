import React, { useState, useEffect } from 'react';
import ChromecastBase from '../../components/app/chromecast-base';
import ChromecastPlay from '../../components/page-components/chromecast-play';
import constants from '../../components/constants';

export default () => {
  const [uid, setUid] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const instance = cast.framework.CastReceiverContext.getInstance();

    setInstance(instance);

    try {
      instance.start({
        customNamespaces: {
          [constants.CHROMECAST.NAMESPACE]: cast.framework.system.MessageType.JSON,
        },
        disableIdleTimeout: true,
      });
    } catch (error) {
      console.error(error);
    }

    function customMessageHandler({ data }) {
      setUid(data.uid);
    }

    instance.addCustomMessageListener(constants.CHROMECAST.NAMESPACE, customMessageHandler);

    return () =>
      instance.removeCustomMessageListener(constants.CHROMECAST.NAMESPACE, customMessageHandler);
  }, [setUid]);

  useEffect(() => {
    if (!uid && instance) {
      instance.sendCustomMessage(constants.CHROMECAST.NAMESPACE, undefined, {});
    }
  }, [instance, uid]);

  return <ChromecastBase>{uid && <ChromecastPlay uid={uid} />}</ChromecastBase>;
};
