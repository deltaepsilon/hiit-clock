import React, { useContext } from 'react';
import { TextField } from '@rmwc/textfield';
import ImageUploadInput from '../form/image-upload-input';
import { TimerFormContext } from '../contexts/timer-form-context';

import './timer-metadata-inputs.css';

export default () => {
  const { formValues, setFormValues } = useContext(TimerFormContext);

  return (
    <div id="timer-metadata-inputs">
      <div className="row">
        <TextField
          autoFocus
          required
          label="Name"
          value={formValues.name}
          onChange={getHandleChange({ key: 'name', setFormValues })}
        />
      </div>
      <div className="row">
        <TextField
          textarea
          label="Description"
          value={formValues.description}
          onChange={getHandleChange({ key: 'description', setFormValues })}
        />
      </div>
      <div className="row">
        <ImageUploadInput
          id="timer-image"
          text="Upload Timer Image"
          label="Timer Image"
          file={formValues.file}
          onChange={getHandleChange({ key: 'file', setFormValues })}
        />
      </div>
    </div>
  );
};

function getHandleChange({ key, setFormValues }) {
  return e => {
    const value = e && e.target ? e.target.value : e;

    setFormValues(formValues => {
      return { ...formValues, [key]: value };
    });
  };
}
