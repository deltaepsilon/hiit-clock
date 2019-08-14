import React, { useState, useEffect } from 'react';
import ChromecastBase from '../../components/app/chromecast-base';
import ChromecastPlay from '../../components/page-components/chromecast-play';
import parseSearch from '../../utilities/parse-search';
import constants from '../../components/constants';

export default () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const instance = cast.framework.CastReceiverContext.getInstance();

    try {
      instance.start({
        customNamespaces: {
          [constants.CHROMECAST.NAMESPACE]: cast.framework.system.MessageType.JSON,
        },
      });
    } catch (error) {
      console.error(error);
    }
    instance.addCustomMessageListener(constants.CHROMECAST.NAMESPACE, ({ data }) => {
      setUid(data.uid);
    });

    instance.sendCustomMessage(constants.CHROMECAST.NAMESPACE, { sendNoods: true }, console.info);
  }, [setUid]);

  return <ChromecastBase>{uid && <ChromecastPlay uid={uid} />}</ChromecastBase>;
};
