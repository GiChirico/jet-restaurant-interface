'use strict';

// HTML elements
const submitPostcodeBtn = document.getElementById('submit-btn');
const postcodeInput = document.getElementById('postcode-input');
const containerRestaurants = document.getElementById('container-restaurants');
const sortAscBtn = document.getElementById('btn-sort-asc');
const sortDescBtn = document.getElementById('btn-sort-desc');

// Global variables
let sortAsc = false;
let sortDesc = false;
let firstTenRests = [];
let filteredCuisines = [],

// Functions

// Render restaurants

const renderRestaurants = function (
  firstTenRests,
  sortAsc = false,
  sortDesc = false,
) {
  console.log(firstTenRests);

  // clean container
  containerRestaurants.innerHTML = '';

  let currentRests = firstTenRests;
  console.log(currentRests);

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
    <div>
      <h3>${restaurant.name}</h3>
      <p>${restaurant.cuisines[0].name} • ${restaurant.cuisines[1].name}</p>
      <p>${+restaurant.rating.starRating} (${+restaurant.rating.count} ratings)</p>
      <p> Address: ${restaurant.address?.firstLine || ''}
        ${restaurant.address?.city ? `, ${restaurant.address.city}` : ''}
        ${restaurant.address?.postalCode ? ` - ${restaurant.address.postalCode}` : ''}
      </p>
      <hr/>
    </div>`;

    containerRestaurants.insertAdjacentHTML('beforeend', cardHTML);
  });
};

// Filter by Cuisine


// Rejected Promise Error
const renderError = function (msg) {
  // clean container
  containerRestaurants.innerHTML = '';
  containerRestaurants.insertAdjacentText('beforeend', msg);
};

// Event listeners

// Get postcode input + Fetch

submitPostcodeBtn.addEventListener('click', function () {
  let postcode = postcodeInput.value.trim().replaceAll(' ', '');
  const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
  // ! detach url to constant
  const getRestaurantData = function (postcode) {
    fetch(url)
      .then(response => {
        if (!response.ok)
          throw new Error(`Postcode not found (${response.status})`);
        return response.json();
      })
      .then(data => {
        if (!data.restaurants || data.restaurants.length === 0)
          throw new Error('Postcode not found');
        console.log(firstTenRests, 'befpromise');
        firstTenRests = data.restaurants.slice(0, 10);
        console.log(firstTenRests, 'promise');

        // display restaurants
        renderRestaurants(firstTenRests);
        // 
      })
      .catch(err => {
        console.error(err);
        renderError(`Something went wrong. ${err.message}. Try again!`);
      });
  };
  getRestaurantData(postcode);
});

// Sort by rating
sortAscBtn.addEventListener('click', function (e) {
  e.preventDefault();
  renderRestaurants(firstTenRests, !sortAsc, sortDesc);
});

sortDescBtn.addEventListener('click', function (e) {
  e.preventDefault();
  renderRestaurants(firstTenRests, sortAsc, !sortDesc);
});


// 1. create the checkbox dinamically 2. 