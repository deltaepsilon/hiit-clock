import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { Close } from '../../svg';
import advertisements from '../../advertisement/advertisements';
import '../../advertisement/advertisement.css';

export default ({ index = 0 }) => {
  const AdvertisementBody = advertisements[index];

  return (
    <div id="advertisement">
      <div className="dismiss">
        <IconButton icon={<Close />} />
      </div>
      <div className="body">
        <AdvertisementBody />
      </div>
    </div>
  );
};
