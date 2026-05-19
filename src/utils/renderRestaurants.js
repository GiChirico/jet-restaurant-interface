import { containerRestaurants } from '../constants';
import { sortRestaurants } from './sortRestaurants';

export const renderRestaurants = function (
  currentRests,
  sortAsc = false,
  sortDesc = false,
) {
  // clean container
  containerRestaurants.innerHTML = '';

  // sorting
  sortRestaurants(currentRests, sortAsc, sortDesc);

  // display restaurant cards
  currentRests.forEach(restaurant => {
    let cardHTML = `
<div class="bg-white rounded-2xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-sm transition-all duration-200 flex items-center gap-6 restaurant-card" data-id="${restaurant.id}">
  <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-green-50 border border-green-100 overflow-hidden">
    <img src="${restaurant.logoUrl}" alt="${restaurant.name} logo" class="w-full h-full object-contain" />
  </div>
  <div class="flex-1 min-w-0">
    <h3 class="text-lg font-semibold text-gray-800 mb-1">
      ${restaurant.name}
    </h3>
    <p class="text-sm text-green-600 mb-2">
      ${restaurant.cuisines[0]?.name ?? ''}${restaurant.cuisines[1]?.name ? ` • ${restaurant.cuisines[1].name}` : ''}
    </p>
    <p class="text-sm text-gray-400 truncate">
      📍 ${restaurant.address?.firstLine || ''}${restaurant.address?.city ? `, ${restaurant.address.city}` : ''}${restaurant.address?.postalCode ? ` - ${restaurant.address.postalCode}` : ''}
    </p>
  </div>
  <button 
  class="text-gray-300 cursor-pointer transition-colors leading-none text-2xl hover:text-red-500 flex-shrink-0 px-2 py-1"
  aria-label="Add to favorites"
>
  ♥
</button>
  <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-100 w-20 h-20">
    <span class="text-xl font-semibold text-gray-800"><span class="text-yellow-400 text-lg">★</span> ${+restaurant.rating.starRating}</span>
    <span class="text-xs text-gray-400 truncate">${+restaurant.rating.count} ratings</span>
  </div>
</div>`;

    containerRestaurants.insertAdjacentHTML('beforeend', cardHTML);
  });
  // Apply red color to favorited restaurants
  const favoriteRestaurants =
    JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];

  const buttons = containerRestaurants.querySelectorAll('button');

  buttons.forEach((btn, index) => {
    if (favoriteRestaurants.some(rest => rest.id === currentRests[index].id)) {
      btn.classList.add('text-red-500');
      btn.classList.remove('text-gray-300');
    }
  });
};
