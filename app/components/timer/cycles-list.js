import React from 'react';
import PeriodTime from './period-time';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';
import constants from '../constants';

import './cycles-list.css';

export default React.memo(({ cycles, cycleIndexFilter = null }) => {
  const cyclesWithMetadata = addMetadataToCycles(cycles);

  return (
    <ul className="cycles-list">
      {cyclesWithMetadata.map((cycle, cycleIndex) => {
        const showCycle = cycleIndexFilter == null || cycleIndex == cycleIndexFilter;
        const hasOnePeriod = cycle.length == 1;
        const isLonelyRestPeriod = hasOnePeriod && cycle[0].type == constants.PERIOD_TYPES.REST;
        const style = isLonelyRestPeriod
          ? { background: constants.COLORS.REST }
          : { background: cycle.cycleColor };

        return (
          showCycle && (
            <li key={`cycle-${cycleIndex}`} className="cycle-list-item" style={style}>
              <span className="cycle-index">{cycleIndex + 1}</span>
              <ul className="period-list">
                {cycle.map((period, periodIndex) => {
                  const isRest = period.type == constants.PERIOD_TYPES.REST;
                  const style = { background: period.periodColor };

                  return (
                    <li key={`period-${periodIndex}`} className="period-list-item" style={style}>
                      <span className="period-name">
                        {isRest ? constants.TEXT.REST : period.name}
                      </span>
                      <PeriodTime period={period} />
                    </li>
                  );
                })}
              </ul>
            </li>
          )
        );
      })}
    </ul>
  );
});
