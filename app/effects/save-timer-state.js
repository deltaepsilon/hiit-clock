/* global window */
import schema from '../components/schema';

export default async function saveTimerState({ userId, timerState }) {
  return schema.getTimerStateRef(userId).set(timerState);
}
