/* global window */
import constants from '../components/constants';

export default async function signOut() {
  await firebase.auth().signOut();

  location = constants.ROUTES.LANDING;
}
