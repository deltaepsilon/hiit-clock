/* global window */
import constants from '../components/constants';

export default async function saveTimerForm(timerForm) {
  const timerFormString = JSON.stringify(timerForm);

  localStorage.setItem(constants.LOCALSTORAGE.TIMER_FORM, timerFormString);

  return timerForm;
}
