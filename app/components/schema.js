/* globals window */
export default {
  getProfileRef: uid =>
    db()
      .collection('profiles')
      .doc(uid),
};

function db() {
  return window.firebase.firestore();
}
