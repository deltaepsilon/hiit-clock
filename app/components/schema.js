/* globals window */
export default {
  getProfileRef: uid =>
    db()
      .collection('profiles')
      .doc(uid),
  getTimersRef: () => db().collection('timers'),
  getTimerRef: timerId =>
    db()
      .collection('timers')
      .doc(timerId),
};

function db() {
  return window.firebase.firestore();
}
