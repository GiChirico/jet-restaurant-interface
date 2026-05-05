import { apiPath } from '../constants.js';
import { renderErrorMessage } from './renderErrorMessage.js';

export const fetchRestaurantResponseData = async function (postcode) {
  const url = `${apiPath}/${postcode}`;
  try {
    const res = await fetch(url);

    // error for not okay response
    if (!res.ok) throw new Error(`Postcode not found (${res.status})`);

    const reponseData = await res.json();

    // error for when postcode is not supposed to be valid
    if (!reponseData.restaurants || reponseData.restaurants.length === 0)
      throw new Error('Postcode not found');

    return reponseData;
  } catch (err) {
    console.error(err);
    renderErrorMessage(`Something went wrong. ${err.message}. Try again!`);
  }
};
