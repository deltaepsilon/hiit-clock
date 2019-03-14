import React from 'react';
import constants from '../constants';

export default ({ className }) => {
  const title = constants.TITLES[location.pathname] || '';

  return <h1 className={className}>{title}</h1>;
};
