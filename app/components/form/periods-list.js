import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Checkbox } from '@rmwc/checkbox';
import TotalTime from '../timer/total-time';
import { AddCircleOutline, ArrowUpward, ArrowDownward, DeleteOutline, Edit } from '../svg';
import constants from '../constants';
import { PERIOD_SHEET_ID } from './period-sheet';

import './periods-list.css';

const PERIODS_LIST_ID = 'periods-list';

export default ({
  activePeriodId,
  isMultiSelect,
  selectedIdsSet,
  setActivePeriodId,
  setActivePeriodIndex,
  setIsAdd,
  setSelectedIdsSet,
  setShowPeriodSheet,
  formValues,
  setFormValues,
}) => {
  const deselect = useCallback(getDeselect({ setActivePeriodId, setActivePeriodIndex }));

  useEffect(() => {
    const checkElementWithin = getCheckElementWithin({ deselect });

    window.addEventListener('click', checkElementWithin);

    return () => window.removeEventListener('click', checkElementWithin);
  }, []);

  return (
    <List id={PERIODS_LIST_ID}>
      <Period
        index="-1"
        type="prepare"
        totalSeconds="10"
        name="Prepare"
        handleSelect={() => deselect()}
        handleAdd={getHandleAdd({
          index: -1,
          setActivePeriodId,
          setActivePeriodIndex,
          setIsAdd,
          setShowPeriodSheet,
        })}
      />
      {formValues.periods.map((period, i, periods) => {
        const isFirst = i == 0;
        const isLast = i == periods.length - 1;
        const { type, totalSeconds, name } = period;
        const isActive = activePeriodId == period.id;
        const isChecked = selectedIdsSet.has(period.id);
        const periodProps = {
          key: i,
          index: i,
          isActive,
          isChecked,
          isFirst,
          isLast,
          isMultiSelect,
          type,
          totalSeconds,
          name,
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
          handleSelect: getHandleSelect({
            id: period.id,
            setActivePeriodId,
          }),
          handleMoveUp: getHandleMoveUp({
            index: i,
            setFormValues,
          }),
          handleMoveDown: getHandleMoveDown({
            index: i,
            setFormValues,
          }),
          handleEdit: getHandleEdit({
            index: i,
            period,
            setActivePeriodId,
            setActivePeriodIndex,
            setIsAdd,
            setShowPeriodSheet,
          }),
          handleDelete: getHandleDelete({
            index: i,
            setFormValues,
          }),
        };

        return <Period {...periodProps} />;
      })}
    </List>
  );
};

function Period({
  index,
  isActive = false,
  isChecked,
  isFirst,
  isLast,
  isMultiSelect,
  name,
  totalSeconds,
  type,
  handleAdd,
  handleCheckboxChange,
  handleSelect,
  handleMoveUp,
  handleMoveDown,
  handleEdit,
  handleDelete,
}) {
  const isRest = type == constants.PERIOD_TYPES.REST;
  const isDisabled = type == constants.PERIOD_TYPES.PREPARE;

  return (
    <div
      className="period-wrapper"
      key={index}
      is-active={String(isActive)}
      is-first={String(isFirst)}
      is-last={String(isLast)}
    >
      <ListItem type={type} className="flex" onClick={handleSelect} disabled={isDisabled}>
        <span>{isRest ? constants.TEXT.REST : name}</span>

        <span className="flex" />

        <TotalTime totalSeconds={totalSeconds} />

        <div className="period-controls">
          <IconButton className="up" icon={<ArrowUpward />} onClick={handleMoveUp} />
          <IconButton className="down" icon={<ArrowDownward />} onClick={handleMoveDown} />
          <IconButton icon={<Edit />} onClick={handleEdit} />
          <IconButton icon={<DeleteOutline />} onClick={handleDelete} />
        </div>
      </ListItem>
      <div className="buttons">
        {isMultiSelect ? (
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        ) : (
          <IconButton icon={<AddCircleOutline />} onClick={handleAdd} />
        )}
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

function getHandleSelect({ id, activePeriodId, setActivePeriodId }) {
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

function getHandleMoveDown({ index, setFormValues }) {
  return getHandleMoveUp({ index: index + 1, setFormValues });
}

function getHandleMoveUp({ index, setFormValues }) {
  return e => {
    e.stopPropagation();

    setFormValues(formValues => {
      const periods = [...formValues.periods];
      const period = periods[index];

      periods.splice(index, 1);
      periods.splice(index - 1, 0, period);

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

    setActivePeriodId(period.id);
    setActivePeriodIndex(index);
    setIsAdd(false);
    setShowPeriodSheet(true);
  };
}

function getHandleDelete({ index, formValues, setFormValues }) {
  return e => {
    e.stopPropagation();

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
