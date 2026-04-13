import { cuisineList } from '../constants';
import { getCuisines } from './getCuisines';

export const renderFilterCuisines = function (firstTenRests) {
  cuisineList.innerHTML = '';

  // retrieve cuisines
  let cuisines = getCuisines(firstTenRests);

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
