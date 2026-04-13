import './style.css';
import {
  submitPostcodeBtn,
  postcodeInput,
  containerRestaurants,
  sortAscBtn,
  sortDescBtn,
  filterDropBtn,
  filterDropMenu,
  cuisineList,
  applyFilterBtn,
  resetFilterBtn,
  checkedCuisineSelector,
  apiPath,
} from './constants.js';

import { renderRestaurants } from './utils/renderRestaurants.js';
import { renderFilterCuisines } from './utils/renderFilterCuisines.js';

// Global variables
let sortAsc = false;
let sortDesc = false;
let firstTenRests = [];
let filteredRests = [];
let checkedCuisines;

const renderErrorMessage = function (msg) {
  // clean container
  containerRestaurants.innerHTML = '';
  containerRestaurants.insertAdjacentText('beforeend', msg);
};

// Get postcode input + Fetch
submitPostcodeBtn.addEventListener('click', function () {
  // get postcode
  let postcode = postcodeInput.value.trim().replaceAll(' ', '');
  // fetch reponseData from API
  const url = `${apiPath}/${postcode}`;

  const fetchRestaurantreponseData = async function () {
    try {
      const res = await fetch(url);

      // error for not okay response
      if (!res.ok) throw new Error(`Postcode not found (${res.status})`);

      const reponseData = await res.json();

      // error for when postcode is not supposed to be valid
      if (!reponseData.restaurants || reponseData.restaurants.length === 0)
        throw new Error('Postcode not found');

      firstTenRests = reponseData.restaurants.slice(0, 10);

      renderRestaurants(firstTenRests);

      // render cuisines array for filter
      renderFilterCuisines(firstTenRests);
    } catch (err) {
      console.error(err);
      renderErrorMessage(`Something went wrong. ${err.message}. Try again!`);
    }
  };
  fetchRestaurantreponseData();

  // clear postcode input
  postcodeInput.value = '';
});

// Sort by rating
sortAscBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sortAsc = !sortAsc;
  sortDesc = false;
  renderRestaurants(firstTenRests, sortAsc, sortDesc);
});

sortDescBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sortDesc = !sortDesc;
  sortAsc = false;
  renderRestaurants(firstTenRests, sortAsc, sortDesc);
});

// Hide/show filter dropdown
filterDropBtn.addEventListener('click', function (e) {
  e.preventDefault();
  filterDropMenu.classList.toggle('hidden');
});

// Hide filter dropdown when clicking outside
document.addEventListener('click', function (e) {
  if (!filterDropBtn.contains(e.target) && !filterDropMenu.contains(e.target)) {
    filterDropMenu.classList.add('hidden');
  }
});

// retrieve checked cuisines
cuisineList.addEventListener('change', function (e) {
  checkedCuisines = Array.from(
    cuisineList.querySelectorAll(checkedCuisineSelector),
  ).map(checkbox => checkbox.name);
});

// apply filter
applyFilterBtn.addEventListener('click', function () {
  if (!checkedCuisines || checkedCuisines.length === 0) {
    renderRestaurants(firstTenRests, sortAsc, sortDesc);
    return;
  }

  filteredRests = firstTenRests.filter(restaurant =>
    restaurant.cuisines.some(cuisine => checkedCuisines.includes(cuisine.name)),
  );

  renderRestaurants(filteredRests);
});

// Reset filter
resetFilterBtn.addEventListener('click', function () {
  Array.from(cuisineList.querySelectorAll(checkedCuisineSelector)).forEach(
    checkbox => (checkbox.checked = false),
  );
  renderRestaurants(firstTenRests);
});
