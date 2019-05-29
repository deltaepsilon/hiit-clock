/* global window */
import constants from '../components/constants';

export default async function signOut() {
  firebase.auth().signOut();

  location = constants.ROUTES.LANDING;
}
