import React, { useCallback, useEffect, useContext, useMemo, useState } from 'react';
import Router from 'next/router';
import TimerProvider, { TimerContext } from '../contexts/timer-context';
import TimerFormProvider, { TimerFormContext, DEFAULT_TIMER } from '../contexts/timer-form-context';
import { Button } from '@rmwc/button';
import TimerMetadataInputs from '../form/timer-metadata-inputs';
import PeriodSheet from '../form/period-sheet';
import PeriodsList from '../form/periods-list';
import MultiSelectControls from '../form/multi-select-controls';
import effects from '../../effects';
import { List } from '../svg';

import './timer-edit.css';

const BUTTON_ICON_PX = 16;

export default ({ timerId }) => {
  return (
    <TimerProvider timerId={timerId}>
      <TimerFormProvider>
        <TimerForm />
      </TimerFormProvider>
    </TimerProvider>
  );
};

function TimerForm() {
  const {
    formValues,
    formError,
    isMultiSelect,
    setShowPeriodSheet,
    setIsMultiSelect,
    toggleMultiSelect,
  } = useContext(TimerFormContext);

  useEffect(routeChangeStartEffect, []);

  useEffect(() => getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }), []);

  return (
    <div id="timer-edit">
      <form onSubmit={getHandleSubmit({ formValues })}>
        <TimerMetadataInputs />

        <hr />

        <PeriodsList />

        <div className="row buttons">
          <Button type="submit" raised disabled={!!formError}>
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
            Toggle
          </Button>
        </div>
      </form>

      {isMultiSelect && <MultiSelectControls />}

      <PeriodSheet />
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

    console.log('formValues', formValues);
  };
}

function routeChangeStartEffect() {
  function handleRouteChange() {
    effects.saveTimerForm(DEFAULT_TIMER);
  }

  Router.events.on('routeChangeStart', handleRouteChange);

  return () => Router.events.off('routeChangeStart', handleRouteChange);
}
