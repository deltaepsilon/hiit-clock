/* globals window */
import constants from '../constants';

const VALID_REDDIT_EVENTS = new Set(Object.values(constants.REDDIT_EVENTS));

export default function useRedditTrack() {
  return (eventName = constants.REDDIT_EVENTS.PAGE_VISIT) => {
    if (!VALID_REDDIT_EVENTS.has(eventName)) {
      throw new Error(`invalid Reddit event: ${eventName}`);
    }

    window.rdt('track', eventName);
  };
}
