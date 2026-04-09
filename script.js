'use strict';

// HTML elements
const submitPostcodeBtn = document.getElementById('submit-btn');
const postcodeInput = document.getElementById('postcode-input');

// Render restaurants

// const renderRestaurants = function (data) {
//   const html = ``;
// };

// Get postcode input + Fetch
submitPostcodeBtn.addEventListener('click', function () {
  let postcode = postcodeInput.value;
  const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
  // ! detach url to constant
  const getRestaurantData = function (postcode) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // renderRestaurants(data);
      });
  };
  getRestaurantData(postcode);
});
