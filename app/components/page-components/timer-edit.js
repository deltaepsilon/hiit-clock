import React, { useEffect, useContext, useState } from 'react';
import Router from 'next/router';
import TimerProvider, { TimerContext } from '../contexts/timer-context';
import TimerFormProvider, { TimerFormContext, DEFAULT_TIMER } from '../contexts/timer-form-context';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Button } from '@rmwc/button';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TimerMetadataInputs from '../form/timer-metadata-inputs';
import PeriodSheet from '../form/period-sheet';
import PeriodsList from '../form/periods-list';
import MultiSelectControls from '../form/multi-select-controls';
import ConfirmButton from '../form/confirm-button';
import effects from '../../effects';
import { List } from '../svg';
import constants from '../constants';

import './timer-edit.css';

const BUTTON_ICON_PX = 16;

export default ({ timerId, userId }) => {
  return (
    <TimerProvider timerId={timerId} userId={userId}>
      <TimerFormProvider>
        <TimerForm />
      </TimerFormProvider>
    </TimerProvider>
  );
};

function TimerForm() {
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);
  const { userId } = useContext(TimerContext);
  const {
    formValues,
    formError,
    isAdd,
    isMultiSelect,
    setShowPeriodSheet,
    setIsMultiSelect,
    timerId,
    toggleMultiSelect,
  } = useContext(TimerFormContext);

  useEffect(routeChangeStartEffect, []);

  useEffect(() => getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }), []);

  return (
    <>
      <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`} />

      <Title>{isAdd ? `Edit ${formValues.name}` : 'Create Timer'}</Title>

      <div id="timer-edit">
        <form
          onSubmit={async e => {
            const handleSubmit = getHandleSubmit({ currentUser, formValues, timerId });

            setIsSaving(true);

            await handleSubmit(e);

            setIsSaving(false);
          }}
        >
          <TimerMetadataInputs />

          <hr />

          <PeriodsList />

          <div className="row buttons">
            <Button type="submit" raised disabled={!!formError || isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              raised={isMultiSelect}
              outlined={!isMultiSelect}
              icon={<List height={BUTTON_ICON_PX} width={BUTTON_ICON_PX} />}
              onClick={e => (e.preventDefault(), toggleMultiSelect())}
            >
              Toggle
            </Button>
            {isAdd ? (
              <ConfirmButton
                onClick={getHandleDelete({ currentUser, timerId })}
                confirmText="Confirm"
              >
                Cancel
              </ConfirmButton>
            ) : (
              <ConfirmButton
                onClick={getHandleDelete({ currentUser, timerId })}
                confirmText="Confirm"
              >
                Delete
              </ConfirmButton>
            )}

            <div className="error" error={formError}>
              {formError}
            </div>
          </div>
        </form>

        {isMultiSelect && <MultiSelectControls />}

        <PeriodSheet />
      </div>
    </>
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

function getHandleDelete({ currentUser, timerId }) {
  return async e => {
    e.preventDefault();

    await effects.deleteTimer({ currentUser, timerId });

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
