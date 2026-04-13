import { containerRestaurants } from '../constants';

export const renderRestaurants = function (
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
