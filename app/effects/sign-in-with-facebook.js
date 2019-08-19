/* global window */
export default async function signInWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();

  provider.addScope('email');

  await firebase.auth().signInWithPopup(provider);
}
