/* globals window */
export default {
  getProfileRef: uid =>
    db()
      .collection('profiles')
      .doc(uid),
  getTimersRef: () => db().collection('timers'),
};

function db() {
  return window.firebase.firestore();
}
