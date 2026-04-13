'use strict';

// HTML elements
const submitPostcodeBtn = document.getElementById('submit-btn');
const postcodeInput = document.getElementById('postcode-input');
const containerRestaurants = document.getElementById('container-restaurants');
const sortAscBtn = document.getElementById('btn-sort-asc');
const sortDescBtn = document.getElementById('btn-sort-desc');
const filterDropBtn = document.getElementById('filter-dropdown-btn');
const filterDropMenu = document.getElementById('filter-dropdown-menu');
const cuisineList = document.getElementById('cuisine-list');
const applyFilterBtn = document.getElementById('apply-filters-btn');
const resetFilterBtn = document.getElementById('reset-filters-btn');

// Global variables
let sortAsc = false;
let sortDesc = false;
let firstTenRests = [];
let filteredRests = [];
let checkedCuisines;

// Functions
// Render restaurants
const renderRestaurants = function (
  firstTenRests,
  sortAsc = false,
  sortDesc = false,
) {
  // clean container
  containerRestaurants.innerHTML = '';

  let currentRests = [...firstTenRests];

  // sorting
  if (sortAsc && !sortDesc)
    currentRests.sort((restA, restB) => {
      return restA.rating.starRating - restB.rating.starRating;
    });
  if (!sortAsc && sortDesc)
    currentRests.sort((restA, restB) => {
      return restB.rating.starRating - restA.rating.starRating;
    });

  // display restaurant cards
  currentRests.forEach(restaurant => {
    let cardHTML = `
<div class="bg-white rounded-2xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-sm transition-all duration-200 flex items-center gap-6">
  <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-green-50 border border-green-100 overflow-hidden">
  <img src="${restaurant.logoUrl}" alt="${restaurant.name} logo" class="w-full h-full object-contain" />
</div>
  <div class="flex-1 min-w-0">
    <h3 class="text-lg font-semibold text-gray-800 mb-1">${restaurant.name}</h3>
    <p class="text-sm text-green-600 mb-2">
      ${restaurant.cuisines[0]?.name ?? ''}${restaurant.cuisines[1]?.name ? ` • ${restaurant.cuisines[1].name}` : ''}
    </p>
    <p class="text-sm text-gray-400 truncate">
      📍 ${restaurant.address?.firstLine || ''}${restaurant.address?.city ? `, ${restaurant.address.city}` : ''}${restaurant.address?.postalCode ? ` - ${restaurant.address.postalCode}` : ''}
    </p>
  </div>
  <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-100 w-20 h-20">
    <span class="text-xl font-semibold text-gray-800"><span class="text-yellow-400 text-lg">★</span> ${+restaurant.rating.starRating}</span>
    <span class="text-xs text-gray-400 truncate">${+restaurant.rating.count} ratings</span>
  </div>
</div>`;

    containerRestaurants.insertAdjacentHTML('beforeend', cardHTML);
  });
};

// Filter by Cuisine
const renderFilterCheckbox = function (firstTenRests) {
  console.log(firstTenRests);
  // clear filter list
  cuisineList.innerHTML = '';

  // retrieve cuisines
  const cuisines = [
    ...new Set(
      firstTenRests
        .flatMap(restaurant => restaurant.cuisines.slice(0, 2))
        .map(cuisine => cuisine.name),
    ),
  ];

  // add cuisines as checkboxes

  cuisines.forEach(cuisine => {
    let checkboxHTML = `
<div class="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-xl cursor-pointer">
  <input type="checkbox" id="${cuisine.toLowerCase()}" name="${cuisine}" class="w-4 h-4 accent-green-500"/>
  <label for="${cuisine.toLowerCase()}" class="text-sm text-gray-600 cursor-pointer">${cuisine}</label>
</div>`;

    cuisineList.insertAdjacentHTML('beforeend', checkboxHTML);
  });
};

// Rejected Promise Error
const renderError = function (msg) {
  // clean container
  containerRestaurants.innerHTML = '';
  containerRestaurants.insertAdjacentText('beforeend', msg);
};

// Event listeners

// Get postcode input + Fetch
submitPostcodeBtn.addEventListener('click', function () {
  // get postcode
  let postcode = postcodeInput.value.trim().replaceAll(' ', '');
  // fetch data from API
  const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
  // ! detach url to constant
  const getRestaurantData = async function () {
    try {
      const res = await fetch(url);

      // error for 404
      if (!res.ok) throw new Error(`Postcode not found (${res.status})`);

      const data = await res.json();

      // error for when postcode is not supposed to be valid
      if (!data.restaurants || data.restaurants.length === 0)
        throw new Error('Postcode not found');

      // get 10 first rests
      firstTenRests = data.restaurants.slice(0, 10);

      // display restaurants
      renderRestaurants(firstTenRests);

      // render cuisines array for filter
      renderFilterCheckbox(firstTenRests);
    } catch (err) {
      console.error(err);
      renderError(`Something went wrong. ${err.message}. Try again!`);
    }
  };
  getRestaurantData();

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
    cuisineList.querySelectorAll('input[type="checkbox"]:checked'),
  ).map(checkbox => checkbox.name);

  console.log(checkedCuisines);
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
  Array.from(
    cuisineList.querySelectorAll('input[type="checkbox"]:checked'),
  ).forEach(checkbox => (checkbox.checked = false));
  renderRestaurants(firstTenRests);
});
