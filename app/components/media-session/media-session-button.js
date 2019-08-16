import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { Game } from '../svg';
import constants from '../constants';

export default ({ enabled, onClick }) => {
  const fill = enabled ? constants.COLORS.ENABLED_LIGHT : constants.COLORS.DISABLED_LIGHT;

  return <IconButton icon={<Game fill={fill} />} onClick={onClick} />;
};
