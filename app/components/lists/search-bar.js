import React, { useRef, useState } from 'react';
import CloseIcon from '../svg/close';
import constants from '../constants';
import useHandleKeypress from '../hooks/use-handle-keypress';

import { IconButton } from '@rmwc/icon-button';
import '@material/icon-button/dist/mdc.icon-button.css';

import { TextField } from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

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
