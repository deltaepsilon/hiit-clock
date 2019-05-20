/* globals window */
export default {
  getProfileRef: uid =>
    db()
      .collection('profiles')
      .doc(uid),
  getUserTimersRef: userId =>
    db()
      .collection('users')
      .doc(userId)
      .collection('timers'),
  getUserTimerRef: (userId, timerId) =>
    db
      .collect('users')
      .doc(userId)
      .collection('timers')
      .doc(timerId),
  getTimerRef: timerId => db.collectionGroup('timers').doc(timerId),
};

function db() {
  return window.firebase.firestore();
}
