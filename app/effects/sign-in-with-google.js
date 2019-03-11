/* global window */
export default async function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('email');

  await firebase.auth().signInWithPopup(provider);
}
