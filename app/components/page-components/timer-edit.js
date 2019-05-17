import React, { useCallback, useEffect, useContext, useMemo, useState } from 'react';
import Router from 'next/router';
import TimerProvider, { TimerContext } from '../contexts/timer-context';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import ImageUploadInput from '../form/image-upload-input';
import PeriodSheet from '../form/period-sheet';
import PeriodsList from '../form/periods-list';
import MultiSelectControls from '../form/multi-select-controls';
import effects from '../../effects';
import constants from '../constants';
import { List } from '../svg';

import './timer-edit.css';

const DEFAULT_TIMER = {
  name: '',
  description: '',
  file: null,
  tags: [],
  periods: [],
};
const BUTTON_ICON_PX = 16;

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
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [activePeriodId, setActivePeriodId] = useState(null);
  const [activePeriodIndex, setActivePeriodIndex] = useState(null);
  const [selectedIdsSet, setSelectedIdsSet] = useState(new Set());
  const [showPeriodSheet, setShowPeriodSheet] = useState(false);
  const [formValues, setFormValues] = useState(getStartingFormValues());
  const formError = useMemo(() => getFormError(formValues), [formValues]);
  const isCreate = useMemo(() => !activePeriodId, [activePeriodId]);
  const handlePeriodSave = useCallback(
    getPeriodSaveCallback({ activePeriodIndex, isAdd, setFormValues }),
    [activePeriodId, activePeriodIndex, isAdd]
  );
  const toggleMultiSelect = useCallback(() => setIsMultiSelect(x => !x));

  useEffect(() => saveFormValues(formValues), [formValues]);

  useEffect(routeChangeStartEffect, []);

  useEffect(() => (!isMultiSelect && setSelectedIdsSet(new Set()), undefined), [isMultiSelect]);

  useEffect(() => getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }), []);

  const periodsListProps = {
    activePeriodId,
    formValues,
    isMultiSelect,
    selectedIdsSet,
    setActivePeriodId,
    setActivePeriodIndex,
    setFormValues,
    setIsAdd,
    setSelectedIdsSet,
    setShowPeriodSheet,
  };
  const multiSelectControlsProps = {
    setFormValues,
    selectedIdsSet,
    setIsMultiSelect,
    setSelectedIdsSet,
  };

  return (
    <div id="timer-edit">
      <form onSubmit={getHandleSubmit({ formValues })}>
        <div className="row">
          <TextField
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

        <hr />

        <PeriodsList {...periodsListProps} />

        <div className="row buttons">
          <Button raised disabled={!!formError}>
            Save
          </Button>
          <div className="error" error={formError}>
            {formError}
          </div>
          <Button
            raised={isMultiSelect}
            outlined={!isMultiSelect}
            icon={<List height={BUTTON_ICON_PX} width={BUTTON_ICON_PX} />}
            onClick={toggleMultiSelect}
          >
            Select
          </Button>
        </div>
      </form>

      {isMultiSelect && <MultiSelectControls {...multiSelectControlsProps} />}

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

function getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }) {
  function handleKeyUp(e) {
    const { key } = e;

    if (key == 'Escape') {
      setShowPeriodSheet(false);
      setIsMultiSelect(false);
    }
  }

  window.addEventListener('keyup', handleKeyUp);

  return () => window.removeEventListener('keyup', handleKeyUp);
}

function getHandleSubmit({ formValues }) {
  return e => {
    e.preventDefault();
  };
}

function getHandleChange({ key, setFormValues }) {
  return e => {
    const value = e.target ? e.target.value : e;

    setFormValues(formValues => {
      return { ...formValues, [key]: value };
    });
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

function getPeriodSaveCallback({ activePeriodIndex, isAdd, setFormValues }) {
  return periodValues => {
    setFormValues(formValues => {
      const periods = formValues.periods.slice(0);

      if (isAdd) {
        periods.splice(activePeriodIndex, 0, periodValues);
      } else {
        periods.splice(activePeriodIndex, 1, periodValues);
      }

      return { ...formValues, periods };
    });
  };
}

function getActivePeriodById(periods, id) {
  return periods.find(period => period.id == id);
}
