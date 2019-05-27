/* global window */
export default async function linkToGoogle() {
  const auth = firebase.auth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Cannot link to Google without an existing guest session');
  } else if (!currentUser.isAnonymous) {
    throw new Error('Only guest sessions can link to Google');
  }

  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('email');

  await auth.currentUser.linkWithPopup(provider);
}
