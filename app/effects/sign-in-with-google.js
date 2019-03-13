/* global window */
export default async function signInWithGoogle() {
  console.log('here')
  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('email');

  await firebase.auth().signInWithPopup(provider);
}
