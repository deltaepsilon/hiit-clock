import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import TimerProvider from '../contexts/timer-context';
import TimerFormProvider, { TimerFormContext, DEFAULT_TIMER } from '../contexts/timer-form-context';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Button } from '@rmwc/button';
import TimerMetadataInputs from '../form/timer-metadata-inputs';
import PeriodSheet from '../form/period-sheet';
import PeriodsList from '../form/periods-list';
import MultiSelectControls from '../form/multi-select-controls';
import effects from '../../effects';
import { List } from '../svg';
import constants from '../constants';

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
  const { currentUser } = useContext(AuthenticationContext);
  const {
    formValues,
    formError,
    isMultiSelect,
    setShowPeriodSheet,
    setIsMultiSelect,
    timerId,
    toggleMultiSelect,
  } = useContext(TimerFormContext);

  useEffect(routeChangeStartEffect, []);

  useEffect(() => getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }), []);

  return (
    <div id="timer-edit">
      <form onSubmit={getHandleSubmit({ currentUser, formValues, timerId })}>
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

function routeChangeStartEffect() {
  function handleRouteChange() {
    effects.saveTimerForm(DEFAULT_TIMER);
  }

  Router.events.on('routeChangeStart', handleRouteChange);

  return () => Router.events.off('routeChangeStart', handleRouteChange);
}

function getHandleSubmit({ currentUser, formValues, timerId }) {
  return async e => {
    e.preventDefault();

    const timer = getTimerFromFormValues(formValues);

    await effects.saveTimer({ currentUser, timer, timerId });

    Router.push(constants.ROUTES.DASHBOARD);
  };
}

function getTimerFromFormValues(formValues) {
  const periods = formValues.periods.map(period => ({
    ...period,
    totalSeconds: +period.totalSeconds,
  }));

  return { ...formValues, periods };
}
