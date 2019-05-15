import React, { useEffect, useMemo, useState } from 'react';
import { Toolbar, ToolbarRow, ToolbarTitle } from '@rmwc/toolbar';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Close } from '../svg';
import ImageUploadInput from './image-upload-input';
import uuid from 'uuid/v4';
import constants from '../constants';

import './period-sheet.css';

export const PERIOD_SHEET_ID = 'period-sheet';
const DEFAULT_PERIOD = { totalSeconds: 5, name: '', file: null, type: constants.PERIOD_TYPES.WORK };

export default ({ index, show = false, isCreate = false, period, save, close }) => {
  const [periodValues, setPeriodValues] = useState(getStartingPeriod(period));
  const isWork = useMemo(() => getIsWork(periodValues.type), [periodValues.type]);
  const title = useMemo(() => getTitle({ isWork, isCreate }), [isCreate, isWork]);
  const isDisabled = useMemo(() => getIsDisabled(periodValues), [periodValues]);

  useEffect(() => setPeriodValues(getStartingPeriod(period)), [show]);

  return (
    <div id={PERIOD_SHEET_ID} is-showing={String(show)} type={periodValues.type}>
      <Toolbar>
        <ToolbarRow>
          <ToolbarTitle>{title}</ToolbarTitle>
          <IconButton icon={<Close />} onClick={close} />
        </ToolbarRow>
      </Toolbar>
      <div className="form-wrapper">
        <form onSubmit={e => (e.preventDefault(), !isDisabled && save(periodValues), close())}>
          <input type="submit" style={{ display: 'none' }} />
          <div className="row type-selection">
            <Button
              raised
              className="work"
              disabled={isWork}
              onClick={getTypeToggleHandler({ periodValues, setPeriodValues })}
            >
              Work
            </Button>
            <Button
              raised
              className="rest"
              disabled={!isWork}
              onClick={getTypeToggleHandler({ periodValues, setPeriodValues })}
            >
              Rest
            </Button>
          </div>
          <TextField
            required
            type="text"
            label="Period Name"
            placeholder="Jumping Jacks"
            value={isWork ? periodValues.name : 'Rest'}
            disabled={!isWork}
            onChange={getChangeHandler({ key: 'name', periodValues, setPeriodValues })}
          />
          <TextField
            type="number"
            label="Period Seconds"
            placeholder="30"
            min="5"
            value={periodValues.totalSeconds}
            onChange={getChangeHandler({ key: 'totalSeconds', periodValues, setPeriodValues })}
          />
          {isWork && (
            <ImageUploadInput
              value={periodValues.file}
              onChange={getChangeHandler({ key: 'file', periodValues, setPeriodValues })}
            />
          )}

          <hr />

          <div className="buttons">
            <Button raised type="submit" disabled={isDisabled}>
              Save
            </Button>
            <Button onClick={e => (e.preventDefault(), close())}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function getChangeHandler({ key, periodValues, setPeriodValues }) {
  return e => {
    const value = e && e.target ? e.target.value : e || null;

    setPeriodValues({ ...periodValues, [key]: value });
  };
}

function getStartingPeriod(period) {
  return period || { id: uuid(), ...DEFAULT_PERIOD };
}

function getIsWork(type) {
  return type == constants.PERIOD_TYPES.WORK;
}

function getTitle({ isWork, isCreate }) {
  const typeText = isWork ? constants.TEXT.WORK : constants.TEXT.REST;

  return isCreate ? `New ${typeText} Period` : `Edit ${typeText} Period`;
}

function getIsDisabled(periodValues) {
  const isWork = periodValues.type == constants.PERIOD_TYPES.WORK;

  if (isWork && !periodValues.name) {
    return true;
  }

  if (periodValues.totalSeconds < 5) {
    return true;
  }

  return false;
}

function getTypeToggleHandler({ periodValues, setPeriodValues }) {
  return () => {
    const isWork = periodValues.type == constants.PERIOD_TYPES.WORK;
    const type = isWork ? constants.PERIOD_TYPES.REST : constants.PERIOD_TYPES.WORK;

    setPeriodValues({ ...periodValues, type });
  };
}
