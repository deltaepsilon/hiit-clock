/* globals window */
export default {
  getCorrectionMillisRef: userId =>
    rtdb()
      .ref('public')
      .child('correctionMillis')
      .child(userId),
  getProfileRef: uid =>
    db()
      .collection('profiles')
      .doc(uid),
  getTimerStateRef: userId =>
    rtdb()
      .ref('user-owned-public')
      .child(userId)
      .child('current-timer'),
  getTimersGroupRef: () => db().collectionGroup('timers'),
  getUserTimersRef: userId =>
    db()
      .collection('users')
      .doc(userId)
      .collection('timers'),
  getUserTimerRef: (userId, timerId) => {
    const timersCollectionRef = db()
      .collection('users')
      .doc(userId)
      .collection('timers');

    return timerId ? timersCollectionRef.doc(timerId) : timersCollectionRef.doc();
  },
  getUserTimerStorageRef: (userId, timerId) =>
    storage()
      .ref('users')
      .child(userId)
      .child(timerId),
};

function db() {
  return window.firebase.firestore();
}

function rtdb() {
  const isBrowser = typeof window != 'undefined';

  return isBrowser ? window.firebase.database() : mockRtdb();
}

function storage() {
  return window.firebase.storage();
}

function mockRtdb() {
  const snapshot = {
    val: () => ({}),
  };

  return {
    ref: () => mockRtdb(),
    child: () => mockRtdb(),
    once: async () => snapshot,
    on: () => {},
  };
}
