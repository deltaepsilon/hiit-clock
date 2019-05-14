import React, { useCallback, useEffect, useContext, useMemo, useState } from 'react';
import Router from 'next/router';
import TimerProvider, { TimerContext } from '../contexts/timer-context';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import ImageUploadInput from '../form/image-upload-input';
import TotalTime from '../timer/total-time';
import PeriodSheet from '../form/period-sheet';
import { AddCircleOutline, ArrowUpward, ArrowDownward, DeleteOutline, Edit } from '../svg';
import effects from '../../effects';
import constants from '../constants';

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
  return (
    <TimerProvider timerId={timerId}>
      <TimerForm />
    </TimerProvider>
  );
};

function TimerForm() {
  const { timerId, timer, cycles, totalSeconds } = useContext(TimerContext);
  const [isAdd, setIsAdd] = useState(true);
  const [activePeriodId, setActivePeriodId] = useState(null);
  const [activePeriodIndex, setActivePeriodIndex] = useState(null);
  const [showPeriodSheet, setShowPeriodSheet] = useState(false);
  const [formValues, setFormValues] = useState(getStartingFormValues());
  const formError = useMemo(() => getFormError(formValues), [formValues]);
  const isCreate = useMemo(() => !activePeriodId, [activePeriodId]);
  const handlePeriodSave = useCallback(
    getPeriodSaveCallback({ activePeriodIndex, formValues, isAdd, setFormValues }),
    [activePeriodId, activePeriodIndex, formValues, isAdd]
  );

  useEffect(() => saveFormValues(formValues), [formValues]);

  useEffect(routeChangeStartEffect, []);

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
          <Period
            index="-1"
            type="prepare"
            totalSeconds="10"
            name="Prepare"
            handleAdd={getHandleAdd({
              index: -1,
              setIsAdd,
              setActivePeriodId,
              setActivePeriodIndex,
              setShowPeriodSheet,
            })}
          />
          {formValues.periods.map((period, i) => {
            console.log({ id: period.id, activePeriodId });
            return (
              <Period
                key={i}
                index={i}
                isActive={activePeriodId == period.id}
                type={period.type}
                totalSeconds={period.totalSeconds}
                name={period.name}
                handleAdd={getHandleAdd({
                  index: i,
                  setIsAdd,
                  setActivePeriodId,
                  setActivePeriodIndex,
                  setShowPeriodSheet,
                })}
                handleSelect={getHandleSelect({
                  id: period.id,
                  activePeriodId,
                  setActivePeriodId,
                })}
              />
            );
          })}
        </List>

        <div className="row buttons">
          <Button raised disabled={!!formError}>
            Save
          </Button>
          <div className="error" error={formError}>
            {formError}
          </div>
        </div>
      </form>

      <PeriodSheet
        index={activePeriodIndex}
        show={showPeriodSheet}
        isCreate={isCreate}
        period={getActivePeriodById(formValues.periods, activePeriodId)}
        save={handlePeriodSave}
        close={() => setShowPeriodSheet(false)}
      />
    </div>
  );
}

function Period({ index, isActive = false, name, totalSeconds, type, handleAdd, handleSelect }) {
  const isRest = type == constants.PERIOD_TYPES.REST;
  const isDisabled = type == constants.PERIOD_TYPES.PREPARE;

  return (
    <div className="period-wrapper" key={index} is-active={String(isActive)}>
      <ListItem type={type} className="flex" onClick={handleSelect} disabled={isDisabled}>
        {/* <IconButton icon={<Edit />} /> */}
        <span>{isRest ? constants.TEXT.REST : name}</span>
        <span className="flex" />
        <TotalTime totalSeconds={totalSeconds} />

        <div className="period-controls">
          <IconButton icon={<ArrowUpward />} />
          <IconButton icon={<ArrowDownward />} />
          <IconButton icon={<Edit />} />
          <IconButton icon={<DeleteOutline />} />
        </div>
      </ListItem>
      <div className="buttons">
        <IconButton icon={<AddCircleOutline />} onClick={handleAdd} />
      </div>
    </div>
  );
}

function getHandleAdd({
  index,
  setIsAdd,
  setActivePeriodId,
  setActivePeriodIndex,
  setShowPeriodSheet,
}) {
  return e => {
    e.preventDefault();

    setIsAdd(true);
    setActivePeriodId(null);
    setActivePeriodIndex(index + 1);
    setShowPeriodSheet(true);
  };
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

function getHandleSelect({ id, activePeriodId, setActivePeriodId }) {
  return () => {
    const isSelected = activePeriodId == id;

    setActivePeriodId(isSelected ? null : id);
  };
}

function getFormError(formValues) {
  let error;

  if (!formValues.name) {
    error = '"Name" is required';
  }

  return error;
}

function getStartingFormValues() {
  const localStorageString = localStorage.getItem(constants.LOCALSTORAGE.TIMER_FORM) || '{}';
  const localStorageValue = JSON.parse(localStorageString);

  return {
    ...DEFAULT_TIMER,
    ...localStorageValue,
  };
}

function saveFormValues(formValues) {
  effects.saveTimerForm(formValues);
}

function routeChangeStartEffect() {
  function handleRouteChange() {
    effects.saveTimerForm(DEFAULT_TIMER);
  }

  Router.events.on('routeChangeStart', handleRouteChange);

  return () => Router.events.off('routeChangeStart', handleRouteChange);
}

function getPeriodSaveCallback({ formValues, isAdd, activePeriodIndex, setFormValues }) {
  return periodValues => {
    const periods = formValues.periods.slice(0);

    if (isAdd) {
      periods.splice(activePeriodIndex, 0, periodValues);
    } else {
      periods.splice(activePeriodIndex, 1, periodValues);
    }

    const updatedFormValues = { ...formValues, periods };

    console.log('updatedFormValues', updatedFormValues);

    setFormValues(updatedFormValues);
  };
}

function getActivePeriodById(periods, id) {
  return periods.find(period => period.id == id);
}
