import React, { useMemo } from 'react';
import Head from 'next/head';
import useProfile from '../hooks/use-profile';
import getPeriodsByType from '../../utilities/get-periods-by-type';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import secondsToDuration from '../../utilities/seconds-to-duration';
import constants from '../constants';

export default ({ timer }) => {
  const profile = useProfile();
  const json = useMemo(() => {
    let json = {};

    if (timer) {
      const duration = secondsToDuration(calculateTimerTotalSeconds(timer));
      const repetitions = getPeriodsByType(timer, constants.PERIOD_TYPES.WORK).length;
      const restPeriods = getPeriodsByType(timer, constants.PERIOD_TYPES.REST).length;

      json = {
        '@context': 'https://schema.org',
        '@type': 'ExercisePlan',
        activityDuration: duration,
        creator: {
          '@type': 'Person',
          additionalName: profile.username,
        },
        description: timer.description || '',
        name: timer.name || '',
        repetitions,
        restPeriods,
      };

      if (timer.file && timer.file.downloadURL) {
        json.image = timer.file.downloadURL;
      }
    }

    return json;
  }, [timer]);

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </Head>
  );
};
