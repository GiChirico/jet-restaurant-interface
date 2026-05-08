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
  recentPostcodesList,
} from './constants.js';
import { renderRestaurants } from './utils/renderRestaurants.js';
import { renderFilterCuisines } from './utils/renderFilterCuisines.js';
import { fetchRestaurantResponseData } from './utils/fetchRestaurantResponseData.js';

// Global variables
let sortAsc = false;
let sortDesc = false;
let allRests = [];
let currentRests = [];
let recentPostcodes = [];
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

  // add postcode to array and save into localStorage
  recentPostcodes.push(postcode);
  localStorage.setItem('postcodes', JSON.stringify(recentPostcodes));

  // clear postcode input
  postcodeInput.value = '';
};

// Get recent postcodes from localStorage and render as dropdown list
const getRecentPostcodes = function () {
  const storageData = [
    ...new Set(JSON.parse(localStorage.getItem('postcodes'))),
  ];

  if (!storageData) return;

  recentPostcodes = storageData;

  // Clear the list first to prevent duplicates
  recentPostcodesList.innerHTML = '';

  recentPostcodes.forEach(postcode => {
    const postcodeHTML = `<li id="recent-postcode-item" data-postcode="${postcode}" class="px-4 py-2.5 hover:bg-green-50 cursor-pointer transition-colors text-gray-700 border-b border-gray-100 last:border-b-0 flex items-center gap-2"><img src="./src/assets/clock.png" alt="recent" class="w-4 h-4" /> ${postcode}</li>`;
    recentPostcodesList.insertAdjacentHTML('beforeend', postcodeHTML);
  });

  recentPostcodesList.classList.remove('hidden');
};

// get recent postcodes list
postcodeInput.addEventListener('click', function (e) {
  e.preventDefault();
  getRecentPostcodes();
});

// Handle click on recent postcode item
recentPostcodesList.addEventListener('click', function (e) {
  const clickedItem = e.target.closest('#recent-postcode-item');

  if (!clickedItem) return;

  const postcode = clickedItem.textContent.trim().replaceAll(' ', '');
  handlePostcodeSubmission(postcode);

  recentPostcodesList.classList.add('hidden');
});

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

// show filter dropdown
filterDropBtn.addEventListener('click', function (e) {
  e.preventDefault();
  filterDropMenu.classList.toggle('hidden');
});

// Hide filter and recent search dropdowns when clicking outside
document.addEventListener('click', function (e) {
  if (!filterDropBtn.contains(e.target) && !filterDropMenu.contains(e.target)) {
    filterDropMenu.classList.add('hidden');
  }
  if (
    !postcodeInput.contains(e.target) &&
    !recentPostcodesList.contains(e.target)
  ) {
    recentPostcodesList.classList.add('hidden');
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
