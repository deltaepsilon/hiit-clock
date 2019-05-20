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
    isMultiSelect,
    selectedIdsSet,
    setActivePeriodId,
    setActivePeriodIndex,
    setIsAdd,
    setSelectedIdsSet,
    setShowPeriodSheet,
    setFormValues,
    showPeriodSheet,
  } = useContext(TimerFormContext);
  const wrapperRef = useRef(null);
  const deselect = useCallback(getDeselect({ setActivePeriodId, setActivePeriodIndex }));
  const isEmpty = !formValues.periods.length;

  useEffect(() => {
    const checkElementWithin = getCheckElementWithin({ deselect });

    window.addEventListener('click', checkElementWithin);

    return () => window.removeEventListener('click', checkElementWithin);
  }, []);

  useEffect(() => {
    if (!showPeriodSheet) {
      const lastButton = Array.from(wrapperRef.current.querySelectorAll('button')).pop();

      lastButton.focus();
    }
  }, [showPeriodSheet]);

  const mapPeriodLists = getMapPeriodLists({
    activePeriodId,
    deselect,
    isMultiSelect,
    selectedIdsSet,
    setActivePeriodId,
    setActivePeriodIndex,
    setFormValues,
    setIsAdd,
    setSelectedIdsSet,
    setShowPeriodSheet,
  });

  return (
    <div id="periods-list" ref={wrapperRef}>
      <List id={PERIODS_LIST_ID}>
        <Period
          index="-1"
          isFirst
          isLast={isEmpty}
          isEmpty={isEmpty}
          period={{ type: 'prepare', totalSeconds: 10, name: 'prepare' }}
          handleSelect={deselect}
          handleDeselect={deselect}
          handleAdd={getHandleAdd({
            index: -1,
            setActivePeriodId,
            setActivePeriodIndex,
            setIsAdd,
            setShowPeriodSheet,
          })}
        />
        {formValues.periods.map(mapPeriodLists)}

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

function getMapPeriodLists({
  activePeriodId,
  deselect,
  isMultiSelect,
  selectedIdsSet,
  setActivePeriodId,
  setActivePeriodIndex,
  setFormValues,
  setIsAdd,
  setSelectedIdsSet,
  setShowPeriodSheet,
}) {
  return (period, i, periods) => {
    const flags = {
      isActive: activePeriodId == period.id,
      isChecked: selectedIdsSet.has(period.id),
      isLast: i == periods.length - 1,
      isMultiSelect,
      isOnly: periods.length == 1,
    };
    const handlers = {
      handleAdd: getHandleAdd({
        index: i,
        setActivePeriodId,
        setActivePeriodIndex,
        setIsAdd,
        setShowPeriodSheet,
      }),
      handleCheckboxChange: getHandleCheckboxChange({
        id: period.id,
        setSelectedIdsSet,
      }),
      handleDeselect: deselect,
      handleSelect: getHandleSelect({
        id: period.id,
        setActivePeriodId,
      }),
      handleMoveUp: getHandleMoveUp({
        index: i,
        isActive: flags.isActive,
        periodId: period.id,
        setActivePeriodId,
        setFormValues,
      }),
      handleMoveDown: getHandleMoveDown({
        index: i,

        isActive: flags.isActive,
        periodId: period.id,
        setActivePeriodId,
        setFormValues,
      }),
      handleEdit: getHandleEdit({
        index: i,
        isActive: flags.isActive,
        period,
        setActivePeriodId,
        setActivePeriodIndex,
        setIsAdd,
        setShowPeriodSheet,
      }),
      handleDelete: getHandleDelete({
        index: i,
        isActive: flags.isActive,
        setFormValues,
      }),
    };
    const periodProps = {
      ...flags,
      ...handlers,
      index: i,
      key: i,
      period,
    };

    return <Period {...periodProps} />;
  };
}

function Period({
  handleAdd,
  handleCheckboxChange,
  handleDelete,
  handleDeselect,
  handleEdit,
  handleMoveUp,
  handleMoveDown,
  handleSelect,
  index,
  isActive = false,
  isChecked = false,
  isEmpty = false,
  isOnly = false,
  isFirst = false,
  isLast = false,
  isMultiSelect = false,
  period,
}) {
  const periodWrapperRef = useRef(null);
  const { id, file, name, type, totalSeconds } = period;
  const dataUrl = file && file.dataUrl;
  const isFirstWork = index == 0;
  const isRest = type == constants.PERIOD_TYPES.REST;
  const isPrepare = type == constants.PERIOD_TYPES.PREPARE;
  const title = isRest ? constants.TEXT.REST : name;

  return (
    <div
      className="period-wrapper"
      ref={periodWrapperRef}
      key={id}
      is-active={String(isActive)}
      is-first={String(isFirst)}
      is-last={String(isLast)}
      is-only={String(isOnly)}
    >
      <div className="list-item-wrapper">
        <ListItem tabIndex="-1" type={type} className="flex" onClick={handleSelect}>
          <TotalTime totalSeconds={totalSeconds} />

          <span className="title" title={title}>
            {title}
          </span>

          <span className="flex" />

          {dataUrl && <img src={dataUrl} alt={`image for ${name}`} />}
        </ListItem>
        {!isPrepare && (
          <div className="period-controls" onFocus={handleSelect} onClick={handleSelect}>
            <IconButton
              className="up"
              is-hidden={String(isFirstWork || isFirst)}
              icon={<ArrowUpward />}
              onClick={handleMoveUp}
            />
            <IconButton
              className="down"
              is-hidden={String(isLast)}
              icon={<ArrowDownward />}
              onClick={handleMoveDown}
            />
            <IconButton icon={<Edit />} onClick={handleEdit} />
            <IconButton icon={<DeleteOutline />} onClick={handleDelete} />
          </div>
        )}
      </div>

      <div className="buttons">
        {isMultiSelect ? (
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        ) : (
          <AddButton onClick={handleAdd} isEmpty={isEmpty} onFocus={handleDeselect} />
        )}
      </div>
    </div>
  );
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

    setIsAdd(true);
    setActivePeriodId(null);
    setActivePeriodIndex(index + 1);
    setShowPeriodSheet(true);
  };
}

function getHandleCheckboxChange({ id, setSelectedIdsSet }) {
  return e => {
    const checked = e.currentTarget.checked;

    setSelectedIdsSet(selectedIdsSet => {
      const set = new Set([...selectedIdsSet]);

      checked ? set.add(id) : set.delete(id);

      return set;
    });

    checked;
  };
}

function getHandleSelect({ id, setActivePeriodId }) {
  return () => {
    setActivePeriodId(activePeriodId => {
      const isSelected = activePeriodId == id;

      return isSelected ? null : id;
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
  isActive,
  period,
  setActivePeriodId,
  setActivePeriodIndex,
  setIsAdd,
  setShowPeriodSheet,
}) {
  return e => {
    e.stopPropagation();

    if (isActive) {
      setActivePeriodId(period.id);
      setActivePeriodIndex(index);
      setIsAdd(false);
      setShowPeriodSheet(true);
    }
  };
}

function getHandleDelete({ index, isActive, setFormValues }) {
  return e => {
    e.stopPropagation();

    console.log('e', e);

    isActive &&
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
