import React, { useCallback, useEffect } from 'react';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import TotalTime from '../timer/total-time';
import { AddCircleOutline, ArrowUpward, ArrowDownward, DeleteOutline, Edit } from '../svg';
import constants from '../constants';
import { PERIOD_SHEET_ID } from './period-sheet';

import './periods-list.css';

const PERIODS_LIST_ID = 'periods-list';

export default ({
  activePeriodId,
  setActivePeriodId,
  setActivePeriodIndex,
  setIsAdd,
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
        const periodProps = {
          key: i,
          index: i,
          isFirst,
          isLast,
          isActive: activePeriodId == period.id,
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
          handleSelect: getHandleSelect({
            id: period.id,
            activePeriodId,
            setActivePeriodId,
          }),
          handleMoveUp: getHandleMoveUp({
            index: i,
            formValues,
            setFormValues,
          }),
          handleMoveDown: getHandleMoveDown({
            index: i,
            formValues,
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
            formValues,
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
  isFirst,
  isLast,
  name,
  totalSeconds,
  type,
  handleAdd,
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
    e.stopPropagation();

    setIsAdd(true);
    setActivePeriodId(null);
    setActivePeriodIndex(index + 1);
    setShowPeriodSheet(true);
  };
}

function getHandleSelect({ id, activePeriodId, setActivePeriodId }) {
  return () => {
    const isSelected = activePeriodId == id;

    setActivePeriodId(isSelected ? null : id);
  };
}

function getDeselect({ setActivePeriodId, setActivePeriodIndex }) {
  return () => {
    setActivePeriodId(null);
    setActivePeriodIndex(null);
  };
}

function getHandleMoveDown({ index, formValues, setFormValues }) {
  return getHandleMoveUp({ index: index + 1, formValues, setFormValues });
}

function getHandleMoveUp({ index, formValues, setFormValues }) {
  return e => {
    e.stopPropagation();

    const periods = [...formValues.periods];
    const period = periods[index];

    periods.splice(index, 1);
    periods.splice(index - 1, 0, period);

    setFormValues({ ...formValues, periods });
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
    const periods = [...formValues.periods];

    periods.splice(index, 1);

    setFormValues({ ...formValues, periods });
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
