import React from 'react';
import PeriodTime from './period-time';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';

import './cycles-list.css';

export default ({ cycles }) => {
  const cyclesWithMetadata = addMetadataToCycles(cycles);

  return (
    <ul className="cycles-list">
      {cyclesWithMetadata.map((cycle, cycleIndex) => {
        return (
          <li
            key={`cycle-${cycleIndex}`}
            className="cycle-list-item"
            style={{ background: cycle.cycleColor }}
          >
            <span className="cycle-index">{cycleIndex + 1}</span>
            <ul className="period-list">
              {cycle.map((period, periodIndex) => {
                return (
                  <li
                    key={`period-${periodIndex}`}
                    className="period-list-item"
                    style={{ background: period.periodColor }}
                  >
                    <span className="period-name">{period.name}</span>
                    <span className="separator" /> <PeriodTime period={period} />
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
