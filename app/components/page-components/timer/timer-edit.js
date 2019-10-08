import React, { useEffect, useContext, useMemo, useState } from 'react';
import Router from 'next/router';
import useTimer from '../../hooks/use-timer';
import useTimerState from '../../hooks/use-timer-state';
import TimerProvider, { TimerContext } from '../../contexts/timer-context';
import TimerFormProvider, {
  TimerFormContext,
  DEFAULT_TIMER,
} from '../../contexts/timer-form-context';
import { AuthenticationContext } from '../../contexts/authentication-context';
import { Button } from '@rmwc/button';
import BackButton from '../../top-bar/back-button';
import Title from '../../top-bar/title';
import TimerMetadataInputs from '../../form/timer-metadata-inputs';
import PeriodSheet from '../../form/period-sheet';
import PeriodsList from '../../form/periods-list';
import MultiSelectControls from '../../form/multi-select-controls';
import ConfirmButton from '../../form/confirm-button';
import effects from '../../../effects';
import { List } from '../../svg';
import constants from '../../constants';

import './timer-edit.css';

const BUTTON_ICON_PX = 16;
const DEAD_END_PROMISE = new Promise(() => {});

export default ({ timerId, userId, isOwned }) => {
  const timer = useTimer({ timerId, userId });
  const timerState = useTimerState(timerId, timer);
  const { currentUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (currentUser && !isOwned && timer && timerId) {
      const newTimerHref = `${constants.ROUTES.TIMER.EDIT}?id=${timerId}&userId=${currentUser.uid}`;

      (async () => {
        await effects.saveTimer({ currentUser, isOwned, timer, timerId });

        Router.push(newTimerHref);
      })();
    }
  }, [currentUser, isOwned, timer, timerId]);

  return (
    <TimerProvider timer={timer} timerId={timerId} timerState={timerState} userId={userId}>
      <TimerFormProvider>
        <TimerForm isOwned={isOwned} />
      </TimerFormProvider>
    </TimerProvider>
  );
};

function TimerForm({ isOwned }) {
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);
  const { userId } = useContext(TimerContext);
  const {
    formValues,
    formError,
    isAdd,
    isDirty,
    isMultiSelect,
    setShowPeriodSheet,
    setIsMultiSelect,
    timerId,
    toggleMultiSelect,
  } = useContext(TimerFormContext);
  const savedDisabled = !!formError || isSaving || !isDirty;

  const backButtonHref = useMemo(() => {
    let result = constants.ROUTES.DASHBOARD;

    if (timerId && userId) {
      result = `${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`;
    }

    return result;
  }, [timerId, userId]);

  useEffect(routeChangeStartEffect, []);

  useEffect(() => getKeyUpEffect({ setShowPeriodSheet, setIsMultiSelect }), []);

  return (
    <>
      <BackButton href={backButtonHref} />

      <Title>{isAdd ? `Edit ${formValues.name}` : 'Create Timer'}</Title>

      <div id="timer-edit" is-owned={String(isOwned)}>
        <form
          onSubmit={async e => {
            const handleSubmit = getHandleSubmit({
              currentUser,
              formValues,
              timerId,
            });

            setIsSaving(true);

            await handleSubmit(e);

            setIsSaving(false);
          }}
        >
          <TimerMetadataInputs />

          <hr />

          <PeriodsList />

          <div className="row buttons">
            <Button type="submit" raised disabled={savedDisabled}>
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
            <ConfirmButton
              onClick={getHandleDelete({ timerId, currentUser })}
              confirmText="Confirm"
            >
              Delete
            </ConfirmButton>

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

function getHandleSubmit({ formValues, timerId, currentUser }) {
  return async e => {
    e.preventDefault();

    const timer = getTimerFromFormValues(formValues);

    await effects.saveTimer({ isOwned: true, timer, timerId, currentUser });

    if (!timerId) {
      Router.push(constants.ROUTES.DASHBOARD);

      return DEAD_END_PROMISE;
    }
  };
}

function getHandleDelete({ timerId, currentUser }) {
  return async e => {
    e.preventDefault();

    await effects.deleteTimer({ timerId, currentUser });

    Router.push(constants.ROUTES.DASHBOARD);
  };
}

function getTimerFromFormValues(formValues) {
  const periods = formValues.periods
    .filter(({ type }) => type != constants.PERIOD_TYPES.PREPARE)
    .map(period => ({
      ...period,
      totalSeconds: +period.totalSeconds,
    }));

  return { ...formValues, periods };
}
