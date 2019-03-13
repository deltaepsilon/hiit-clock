/* global window */
export default async function signOut() {
  return firebase.auth().signOut();
}
