import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { Close, DeleteOutline, FileCopyOutline } from '../svg';
import uuid from 'uuid/v4';
import constants from '../constants';

import './multi-select-controls.css';

export default ({ setFormValues, selectedIdsSet, setIsMultiSelect, setSelectedIdsSet }) => {
  return (
    <div id="multi-select-controls">
      <IconButton
        className="close"
        icon={<Close fill={constants.COLORS.PRIMARY_LIGHT} />}
        onClick={e => (e.stopPropagation(), setIsMultiSelect(false))}
      />
      <IconButton
        icon={<FileCopyOutline fill={constants.COLORS.PRIMARY_LIGHT} />}
        onClick={getHandleCopy({ selectedIdsSet, setFormValues })}
      />
      <IconButton
        className="delete"
        icon={<DeleteOutline fill={constants.COLORS.WARNING} />}
        onClick={getHandleDelete({ selectedIdsSet, setFormValues, setSelectedIdsSet })}
      />
    </div>
  );
};

function getHandleCopy({ selectedIdsSet, setFormValues }) {
  return e => {
    e.stopPropagation();

    setFormValues(formValues => {
      const periods = formValues.periods.slice(0);
      const periodsToCopy = periods
        .filter(({ id }) => selectedIdsSet.has(id))
        .map(period => ({ ...period, id: uuid() }));

      return { ...formValues, periods: [...periods, ...periodsToCopy] };
    });
  };
}

function getHandleDelete({ selectedIdsSet, setFormValues, setSelectedIdsSet }) {
  return e => {
    e.stopPropagation();

    setFormValues(formValues => {
      const periods = formValues.periods.slice(0);
      const periodsToRetain = periods.filter(({ id }) => !selectedIdsSet.has(id));

      setSelectedIdsSet(new Set());

      return { ...formValues, periods: periodsToRetain };
    });
  };
}
