/* global window */
export default async function signInAnonymously() {
  return firebase.auth().signInAnonymously();
}
