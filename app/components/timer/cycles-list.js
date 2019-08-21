import React from 'react';
import PeriodTime from './period-time';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';
import constants from '../constants';

import './cycles-list.css';

export default React.memo(
  ({ cycles, cycleIndexFilter = () => true, periodFilter = () => true }) => {
    const cyclesWithMetadata = addMetadataToCycles(cycles);
    const cyclesToDisplay = cyclesWithMetadata.filter(cycle => cycleIndexFilter(cycle));

    return (
      <ul className="cycles-list">
        {cyclesToDisplay.map(cycle => {
          const cycleIndex = cycle.index;
          const hasOnePeriod = cycle.length == 1;
          const isLonelyRestPeriod = hasOnePeriod && cycle[0].type == constants.PERIOD_TYPES.REST;
          const style = isLonelyRestPeriod
            ? { background: constants.COLORS.REST }
            : { background: cycle.cycleColor };
          const periods = cycle.filter(period => periodFilter(period, cyclesToDisplay));
          const showCycle = periods.length;

          return showCycle ? (
            <li key={`cycle-${cycleIndex}`} className="cycle-list-item" style={style}>
              <span className="cycle-index">{cycleIndex + 1}</span>
              <ul className="period-list">
                {periods.map((period, periodIndex) => {
                  const isRest = period.type == constants.PERIOD_TYPES.REST;
                  const style = {
                    background: period.periodColor,
                  };

                  return (
                    <li key={`period-${periodIndex}`} className="period-list-item" style={style}>
                      <span className="period-name">
                        {isRest ? period.name || constants.TEXT.REST : period.name}
                      </span>
                      <PeriodTime period={period} />
                    </li>
                  );
                })}
              </ul>
            </li>
          ) : null;
        })}
      </ul>
    );
  }
);
