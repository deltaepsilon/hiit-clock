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
  getUserTimerRef: (userId, timerId) => {
    const timersCollectionRef = db()
      .collection('users')
      .doc(userId)
      .collection('timers');

    return timerId ? timersCollectionRef.doc(timerId) : timersCollectionRef.doc();
  },
  getTimersGroupRef: () => db().collectionGroup('timers'),
  getUserStorageRef: userId =>
    storage()
      .ref('users')
      .child(userId),
};

function db() {
  return window.firebase.firestore();
}

function storage() {
  return window.firebase.storage();
}
