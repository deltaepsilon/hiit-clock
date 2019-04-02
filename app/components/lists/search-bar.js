import React, { useRef, useState } from 'react';
import CloseIcon from '../svg/close';
import constants from '../constants';
import useHandleKeypress from '../hooks/use-handle-keypress';

import { IconButton } from '@rmwc/icon-button';
import { TextField } from '@rmwc/textfield';

import './search-bar.css';

export default ({ label = 'Search', onChange = console.info }) => {
  const [inputRef, setInputRef] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useHandleKeypress(({ key }) => {
    key == 'Escape' && handleChange();
  }, inputRef);

  function handleChange(value = '') {
    setSearchTerm(value);
    onChange(value);
  }

  return (
    <div className="search-bar">
      <TextField
        outlined
        label={label}
        value={searchTerm}
        onChange={e => handleChange(e.target.value)}
        inputRef={setInputRef}
      />
      <IconButton
        icon={<CloseIcon fill={constants.COLORS.PRIMARY} />}
        onClick={() => handleChange()}
      />
    </div>
  );
};
