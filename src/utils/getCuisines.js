export const getCuisines = function (restaurants) {
  return [
    ...new Set(
      restaurants
        .flatMap(restaurant => restaurant.cuisines.slice(0, 2))
        .map(cuisine => cuisine.name),
    ),
  ];
};
