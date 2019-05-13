import React, { useContext, useMemo, useState } from 'react';
import TimerProvider, { TimerContext } from '../contexts/timer-context';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import ImageUploadInput from '../form/image-upload-input';
import TotalTime from '../timer/total-time';
import { AddCircleOutline, ArrowUpward, ArrowDownward, DeleteOutline, Edit } from '../svg';

import './timer-edit.css';

const DEFAULT_TIMER = {
  name: '',
  description: '',
  imageUrl: '',
  file: null,
  tags: [],
  periods: [],
};

export default ({ timerId }) => {
  const titleText = 'Create Timer';
  return (
    <TimerProvider timerId={timerId}>
      <TimerForm />
    </TimerProvider>
  );
};

function TimerForm() {
  const { timerId, timer, cycles, totalSeconds } = useContext(TimerContext);
  const [formValues, setFormValues] = useState(DEFAULT_TIMER);
  const formError = useMemo(() => getFormError(formValues), [formValues]);

  return (
    <div id="timer-edit">
      <form onSubmit={getHandleSubmit({ formValues })}>
        <div className="row">
          <TextField
            required
            label="Name"
            value={formValues.name}
            onChange={getHandleChange({ key: 'name', formValues, setFormValues })}
          />
        </div>
        <div className="row">
          <TextField
            textarea
            label="Description"
            value={formValues.description}
            onChange={getHandleChange({ key: 'description', formValues, setFormValues })}
          />
        </div>
        <div className="row">
          <ImageUploadInput
            id="timer-image"
            text="Upload Timer Image"
            label="Timer Image"
            value={formValues.imageUrl}
            onChange={getHandleChange({ key: 'file', formValues, setFormValues })}
          />
        </div>
        <hr />
        <List>
          <Period index="-1" type="prepare" totalSeconds="10" name="Prepare" />
        </List>
        <hr />
        <div className="row buttons">
          <Button raised disabled={!!formError}>
            Save
          </Button>
          <div className="error" error={formError}>
            {formError}
          </div>
        </div>
      </form>
    </div>
  );
}

function Period({ index, name, totalSeconds, type }) {
  return (
    <div className="period-wrapper" key={index}>
      <ListItem type={type} className="flex">
        <IconButton icon={<Edit />} />
        <span>{name}</span>
        <span className="flex" />
        <TotalTime totalSeconds={totalSeconds} />
        <div className="buttons">
          <IconButton icon={<DeleteOutline />} />
        </div>
      </ListItem>
      <div className="buttons">
        <IconButton icon={<ArrowUpward />} />
        <IconButton icon={<ArrowDownward />} />
        <IconButton icon={<AddCircleOutline />} />
      </div>
    </div>
  );
}

function getHandleSubmit({ formValues }) {
  return e => {
    e.preventDefault();

    console.log('formValues', formValues);
  };
}

function getHandleChange({ key, formValues, setFormValues }) {
  return e => {
    const value = e.target ? e.target.value : e;

    setFormValues({ ...formValues, [key]: value });
  };
}

function getFormError(formValues) {
  let error;

  if (!formValues.name) {
    error = '"Name" is required';
  }

  return error;
}
