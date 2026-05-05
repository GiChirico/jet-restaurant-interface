import './style.css';
import {
  submitPostcodeBtn,
  postcodeInput,
  sortAscBtn,
  sortDescBtn,
  filterDropBtn,
  filterDropMenu,
  cuisineList,
  applyFilterBtn,
  resetFilterBtn,
  checkedCuisineSelector,
} from './constants.js';
import { renderRestaurants } from './utils/renderRestaurants.js';
import { renderFilterCuisines } from './utils/renderFilterCuisines.js';
import { fetchRestaurantResponseData } from './utils/fetchRestaurantResponseData.js';

// Global variables
let sortAsc = false;
let sortDesc = false;
let allRests = [];
let currentRests = [];
let checkedCuisines;

// Handle postcode submission, fetch restaurant data, and render restaurants + filter cuisines

const handlePostcodeSubmission = async function (postcode) {
  // fetch restaurant data from API
  const reponseData = await fetchRestaurantResponseData(postcode);

  // get first 10 restaurants from response data
  allRests = reponseData.restaurants.slice(0, 10);
  currentRests = allRests;

  // render restaurants
  renderRestaurants(currentRests);

  // render cuisines array for filter
  renderFilterCuisines(currentRests);

  // clear postcode input
  postcodeInput.value = '';
};

// Get postcode input + Fetch
submitPostcodeBtn.addEventListener('click', function () {
  // get postcode
  let postcode = postcodeInput.value.trim().replaceAll(' ', '');
  handlePostcodeSubmission(postcode);
});

// Enter key to submit postcode
postcodeInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    // get postcode
    let postcode = postcodeInput.value.trim().replaceAll(' ', '');
    handlePostcodeSubmission(postcode);
  }
});

// Sort by rating
sortAscBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sortAsc = !sortAsc;
  sortDesc = false;
  renderRestaurants(currentRests, sortAsc, sortDesc);
});

sortDescBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sortDesc = !sortDesc;
  sortAsc = false;
  renderRestaurants(currentRests, sortAsc, sortDesc);
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
    renderRestaurants(currentRests, sortAsc, sortDesc);
    return;
  }

  currentRests = allRests.filter(restaurant =>
    restaurant.cuisines.some(cuisine => checkedCuisines.includes(cuisine.name)),
  );

  renderRestaurants(currentRests, sortAsc, sortDesc);
});

// Reset filter
resetFilterBtn.addEventListener('click', function () {
  Array.from(cuisineList.querySelectorAll(checkedCuisineSelector)).forEach(
    checkbox => (checkbox.checked = false),
  );
  currentRests = allRests;
  renderRestaurants(currentRests, sortAsc, sortDesc);
});
