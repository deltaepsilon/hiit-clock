import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Checkbox } from '@rmwc/checkbox';
import { TimerFormContext } from '../contexts/timer-form-context';
import { AddCircleOutline, ArrowUpward, ArrowDownward, DeleteOutline, Edit } from '../svg';
import TotalTime from '../timer/total-time';
import constants from '../constants';
import { PERIOD_SHEET_ID } from './period-sheet';

import './periods-list.css';

const PERIODS_LIST_ID = 'periods-list';

export default () => {
  const {
    activePeriodId,
    formValues,
    isAdd,
    isMultiSelect,
    selectedIdsSet,
    setActivePeriodId,
    setActivePeriodIndex,
    setSelectedIdsSet,
    showPeriodSheet,
  } = useContext(TimerFormContext);
  const wrapperRef = useRef(null);
  const deselect = useCallback(getDeselect({ setActivePeriodId, setActivePeriodIndex }));

  useEffect(() => {
    const checkElementWithin = getCheckElementWithin({ deselect });

    window.addEventListener('click', checkElementWithin);

    return () => window.removeEventListener('click', checkElementWithin);
  }, []);

  useEffect(() => {
    if (showPeriodSheet) {
    } else if (isAdd) {
      const buttons = Array.from(wrapperRef.current.querySelectorAll('button'));
      const [lastButton] = buttons.slice(-1);

      lastButton.focus();
    } else {
      const editButton = wrapperRef.current.querySelector(`[period-id="${activePeriodId}"] .edit`);

      editButton.focus();
    }
  }, [showPeriodSheet]);

  return (
    <div id="periods-list" ref={wrapperRef}>
      <List id={PERIODS_LIST_ID}>
        <Period periodId="prepare" />

        {formValues.periods.map((period, i) => (
          <Period key={period.id} index={i} periodId={period.id} />
        ))}

        <div
          id="check-all-wrapper"
          can-multi-select={String(isMultiSelect && !!formValues.periods.length)}
        >
          <Checkbox
            checked={formValues.periods.length == selectedIdsSet.size}
            onChange={e => {
              const checked = e.currentTarget.checked;
              const selectedIdsSet = checked
                ? new Set(formValues.periods.map(({ id }) => id))
                : new Set();

              setSelectedIdsSet(selectedIdsSet);
            }}
          />
        </div>
      </List>
    </div>
  );
};

function Period({ index, periodId }) {
  const timerFormContextValues = useContext(TimerFormContext);
  const isPrepare = periodId == 'prepare';
  const { handlers, period } = isPrepare
    ? getPrepareDetails(timerFormContextValues)
    : getPeriodDetails(periodId, index, timerFormContextValues);
  const { activePeriodId, formValues, isMultiSelect, selectedIdsSet } = timerFormContextValues;
  const periods = formValues.periods;
  const { id, file, name, type, totalSeconds } = period;
  const isEmpty = !formValues.periods.length;
  const flags = {
    isActive: activePeriodId == period.id,
    isChecked: selectedIdsSet.has(period.id),
    isEmpty,
    isFirst: isPrepare,
    isFirstWork: index == 0,
    isLast: index == periods.length - 1 || isEmpty,
    isMultiSelect,
    isOnly: periods.length == 1,
    isRest: type == constants.PERIOD_TYPES.REST,
  };
  const periodWrapperRef = useRef(null);
  const dataUrl = file && file.dataUrl;
  const title = flags.isRest ? constants.TEXT.REST : name;

  return (
    <div
      className="period-wrapper"
      ref={periodWrapperRef}
      key={id}
      period-id={periodId}
      is-active={String(flags.isActive)}
      is-first={String(flags.isFirst)}
      is-last={String(flags.isLast)}
      is-only={String(flags.isOnly)}
    >
      <div className="list-item-wrapper">
        <ListItem tabIndex="-1" type={type} className="flex" onClick={handlers.handleSelect}>
          <TotalTime totalSeconds={totalSeconds} />

          <span className="title" title={title}>
            {title}
          </span>

          <span className="flex" />

          {dataUrl && <img src={dataUrl} alt={`image for ${name}`} />}
        </ListItem>
        {!isPrepare && (
          <div
            className="period-controls"
            onFocus={handlers.handleSelect}
            onClick={handlers.handleSelect}
          >
            <IconButton
              className="up"
              is-hidden={String(flags.isFirstWork || flags.isFirst)}
              icon={<ArrowUpward fill={constants.COLORS.PRIMARY} />}
              onClick={handlers.handleMoveUp}
            />
            <IconButton
              className="down"
              is-hidden={String(flags.isLast)}
              icon={<ArrowDownward fill={constants.COLORS.PRIMARY} />}
              onClick={handlers.handleMoveDown}
            />
            <IconButton
              className="edit"
              icon={<Edit fill={constants.COLORS.PRIMARY} />}
              onClick={handlers.handleEdit}
            />
            <IconButton
              icon={<DeleteOutline fill={constants.COLORS.PRIMARY} />}
              onClick={handlers.handleDelete}
            />
          </div>
        )}
      </div>

      <div className="buttons">
        {flags.isMultiSelect ? (
          <Checkbox checked={flags.isChecked} onChange={handlers.handleCheckboxChange} />
        ) : (
          <AddButton
            onClick={handlers.handleAdd}
            isEmpty={flags.isEmpty}
            onFocus={handlers.handleDeselect}
          />
        )}
      </div>
    </div>
  );
}

function getPeriodDetails(periodId, index, timerFormContextValues) {
  const {
    activePeriodId,
    formValues,
    setActivePeriodId,
    setActivePeriodIndex,
    setFormValues,
    setIsAdd,
    setSelectedIdsSet,
    setShowPeriodSheet,
  } = timerFormContextValues;
  const periods = formValues.periods;
  const period = periods.find(period => period.id == periodId);
  const isActive = activePeriodId == periodId;
  const handlers = {
    handleAdd: getHandleAdd({
      index,
      setActivePeriodId,
      setActivePeriodIndex,
      setIsAdd,
      setShowPeriodSheet,
    }),
    handleCheckboxChange: getHandleCheckboxChange({
      periodId,
      setSelectedIdsSet,
    }),
    handleDeselect: getDeselect({ setActivePeriodId, setActivePeriodIndex }),
    handleSelect: getHandleSelect({
      periodId,
      setActivePeriodId,
    }),
    handleMoveUp: getHandleMoveUp({
      index,
      isActive,
      periodId,
      setActivePeriodId,
      setFormValues,
    }),
    handleMoveDown: getHandleMoveDown({
      index,
      isActive,
      periodId,
      setActivePeriodId,
      setFormValues,
    }),
    handleEdit: getHandleEdit({
      index,
      period,
      setActivePeriodId,
      setActivePeriodIndex,
      setIsAdd,
      setShowPeriodSheet,
    }),
    handleDelete: getHandleDelete({
      index,
      setFormValues,
    }),
  };

  return {
    handlers,
    period,
  };
}

function getPrepareDetails(timerFormContextValues) {
  const {
    setActivePeriodId,
    setActivePeriodIndex,
    setIsAdd,
    setShowPeriodSheet,
  } = timerFormContextValues;
  const deselect = getDeselect({ setActivePeriodId, setActivePeriodIndex });
  const handlers = {
    handleSelect: deselect,
    handleDeselect: deselect,
    handleAdd: getHandleAdd({
      index: -1,
      setActivePeriodId,
      setActivePeriodIndex,
      setIsAdd,
      setShowPeriodSheet,
    }),
  };
  const period = { type: 'prepare', totalSeconds: 10, name: 'prepare' };

  return { period, handlers };
}

function AddButton({ isEmpty, onClick, onFocus }) {
  return (
    <div className="add-button-wrapper">
      {isEmpty && <aside>Click to add a period 👉</aside>}
      <IconButton icon={<AddCircleOutline />} onClick={onClick} onFocus={onFocus} />
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
    e.stopPropagation();
    e.preventDefault();

    setIsAdd(true);
    setActivePeriodId(null);
    setActivePeriodIndex(index + 1);
    setShowPeriodSheet(true);
  };
}

function getHandleCheckboxChange({ periodId, setSelectedIdsSet }) {
  return e => {
    const checked = e.currentTarget.checked;

    setSelectedIdsSet(selectedIdsSet => {
      const set = new Set([...selectedIdsSet]);

      checked ? set.add(periodId) : set.delete(periodId);

      return set;
    });

    checked;
  };
}

function getHandleSelect({ periodId, setActivePeriodId }) {
  return () => {
    setActivePeriodId(activePeriodId => {
      const isSelected = activePeriodId == periodId;

      return isSelected ? null : periodId;
    });
  };
}

function getDeselect({ setActivePeriodId, setActivePeriodIndex }) {
  return () => {
    setActivePeriodId(null);
    setActivePeriodIndex(null);
  };
}

function getHandleMoveDown({ index, periodId, setActivePeriodId, setFormValues }) {
  return getHandleMoveUp({ index: index + 1, periodId, setActivePeriodId, setFormValues });
}

function getHandleMoveUp({ index, periodId, setActivePeriodId, setFormValues }) {
  return e => {
    e.stopPropagation();
    e.preventDefault();

    setFormValues(formValues => {
      const periods = [...formValues.periods];
      const period = periods[index];

      periods.splice(index, 1);
      periods.splice(index - 1, 0, period);

      setActivePeriodId(periodId);

      return { ...formValues, periods };
    });
  };
}

function getHandleEdit({
  index,
  period,
  setActivePeriodId,
  setActivePeriodIndex,
  setIsAdd,
  setShowPeriodSheet,
}) {
  return e => {
    e.stopPropagation();
    e.preventDefault();

    setActivePeriodId(period.id);
    setActivePeriodIndex(index);
    setIsAdd(false);
    setShowPeriodSheet(true);
  };
}

function getHandleDelete({ index, setFormValues }) {
  return e => {
    e.stopPropagation();
    e.preventDefault();

    setFormValues(formValues => {
      const periods = [...formValues.periods];

      periods.splice(index, 1);

      return { ...formValues, periods };
    });
  };
}

function getCheckElementWithin({ deselect }) {
  return function checkElementWithin(e) {
    const validIds = [PERIODS_LIST_ID, PERIOD_SHEET_ID];
    const target = (e && e.target) || e;
    const isPeriodList = target && validIds.includes(target.id);

    if (isPeriodList) {
    } else if (target) {
      checkElementWithin(target.parentElement);
    } else {
      deselect();
    }
  };
}
