/* globals window */
import { useEffect, useState } from 'react';
import constants from '../constants';
import schema from '../schema';

const defaultTimer = {
  periods: [],
  name: '',
};

export default function useTimer({ timerId, userId }) {
  const [timer, setTimer] = useState(defaultTimer);


  return timer;
}

