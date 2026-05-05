import { containerRestaurants } from '../constants.js';

export const renderErrorMessage = function (msg) {
  // clean container
  containerRestaurants.innerHTML = '';
  containerRestaurants.insertAdjacentText('beforeend', msg);
};
