import constants from '../components/constants';
import localStorage from './local-storage';

export const DEFAULT_ADVERTISEMENT = { counter: 1 };

export default function getAdvertisement() {
  const existingAdvertisementString =
    localStorage.getItem(constants.LOCALSTORAGE.ADVERTISEMENT) ||
    JSON.stringify(DEFAULT_ADVERTISEMENT);
  const advertisement = JSON.parse(existingAdvertisementString);

  advertisement.counter++;

  localStorage.setItem(constants.LOCALSTORAGE.ADVERTISEMENT, JSON.stringify(advertisement));

  return advertisement;
}
