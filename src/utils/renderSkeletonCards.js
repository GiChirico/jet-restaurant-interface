import { containerRestaurants } from '../constants.js';

export const renderSkeletonCards = function () {
  const skeletonCardHTML = `<div class="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-6">
  <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-300 animate-pulse"></div>
  <div class="flex-1 min-w-0">
    <div class="h-6 bg-gray-300 rounded-lg mb-3 animate-pulse"></div>
    <div class="h-4 bg-gray-300 rounded-lg mb-2 w-32 animate-pulse"></div>
    <div class="h-4 bg-gray-300 rounded-lg w-48 animate-pulse"></div>
  </div>
  <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-100 w-20 h-20">
    <div class="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
  </div>
</div>`;

  containerRestaurants.innerHTML = '';

  for (let rep = 1; rep <= 5; rep++) {
    containerRestaurants.insertAdjacentHTML('beforeend', skeletonCardHTML);
  }
};
