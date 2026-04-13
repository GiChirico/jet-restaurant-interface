export const sortRestaurants = function (
  restaurants,
  sortAsc = false,
  sortDesc = false,
) {
  if (sortAsc && !sortDesc)
    restaurants.sort((restA, restB) => {
      return restA.rating.starRating - restB.rating.starRating;
    });
  if (!sortAsc && sortDesc)
    restaurants.sort((restA, restB) => {
      return restB.rating.starRating - restA.rating.starRating;
    });
};
