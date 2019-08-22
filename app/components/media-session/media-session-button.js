import React, { useEffect, useMemo, useState } from 'react';
import { IconButton } from '@rmwc/icon-button';
import { Game } from '../svg';
import constants from '../constants';

export default ({ enabled, onClick }) => {
  const [mobileUserAgent, setMobileUserAgent] = useState(false);
  const fill = useMemo(
    () => (enabled ? constants.COLORS.ENABLED_LIGHT : constants.COLORS.DISABLED_LIGHT),
    [enabled]
  );

  useEffect(() => {
    const mobileUserAgent = !!navigator.userAgent.match(/Mobile/);

    setMobileUserAgent(mobileUserAgent);
  }, []);

  return mobileUserAgent ? <IconButton icon={<Game fill={fill} />} onClick={onClick} /> : null;
};
