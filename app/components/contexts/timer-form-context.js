import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TimerContext } from './timer-context';
import effects from '../../effects';
import constants from '../constants';

export const DEFAULT_TIMER = {
  description: '',
  file: null,
  isSearchable: false,
  periods: [],
  name: '',
};

export const TimerFormContext = React.createContext();

export default ({ children }) => {
  const { timerId, timer } = useContext(TimerContext);
  const [isAdd, setIsAdd] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
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
  const activePeriod = useMemo(() => getActivePeriodById(formValues.periods, activePeriodId), [
    formValues,
    activePeriodId,
  ]);

  useEffect(() => (!isMultiSelect && setSelectedIdsSet(new Set()), undefined), [isMultiSelect]);

  useEffect(() => saveFormValues(formValues), [formValues]);

  useEffect(() => (timerId && mapTimerToFormValues({ timer, setFormValues }), undefined), [
    timerId,
    timer,
  ]);

  useEffect(() => checkIsDirty({ formValues, setIsDirty, timer }), [formValues, timer]);

  const value = {
    activePeriod,
    activePeriodId,
    activePeriodIndex,
    formError,
    formValues,
    handlePeriodSave,
    isAdd,
    isCreate,
    isDirty,
    isMultiSelect,
    showPeriodSheet,
    selectedIdsSet,
    setActivePeriodId,
    setActivePeriodIndex,
    setFormValues,
    setIsAdd,
    setIsMultiSelect,
    setSelectedIdsSet,
    setShowPeriodSheet,
    timerId,
    toggleMultiSelect,
  };

  return <TimerFormContext.Provider value={value}>{children}</TimerFormContext.Provider>;
};

function getFormError(formValues) {
  let error;

  if (!formValues.name) {
    error = '"Name" is required';
  }

  if (!formValues.periods.length) {
    error = 'At least one period is required';
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

function getPeriodSaveCallback({ activePeriodIndex, isAdd, setFormValues }) {
  return periodValues => {
    setFormValues(formValues => {
      const periods = formValues.periods.slice(0);

      if (isAdd) {
        periods.splice(activePeriodIndex, 0, periodValues);
      } else {
        periods.splice(activePeriodIndex, 1, periodValues);
      }

      const cleanedPeriods = cleanPeriods(periods);

      return { ...formValues, periods: cleanedPeriods };
    });
  };
}

function cleanPeriods(periods) {
  return periods.map(period => {
    const isRest = period.type == constants.PERIOD_TYPES.REST;
    const file = isRest ? {} : period.file;

    return { ...period, file };
  });
}

function getActivePeriodById(periods, id) {
  return periods.find(period => period.id == id);
}

function mapTimerToFormValues({ timer, setFormValues }) {
  setFormValues(timer);
}

function checkIsDirty({ formValues, setIsDirty, timer }) {
  const isNameChanged = formValues.name != timer.name;
  const isDescriptionChanged = formValues.description != timer.description;
  const isSearchableChanged = formValues.isSearchable != timer.isSearchable;
  const isFileChanged = formValues.file && formValues.file.dataUrl;
  const isPeriodsChanged = JSON.stringify(formValues.periods) != JSON.stringify(timer.periods);
  const isDirty =
    isNameChanged ||
    isDescriptionChanged ||
    isSearchableChanged ||
    isFileChanged ||
    isPeriodsChanged;

  setIsDirty(isDirty);
}
