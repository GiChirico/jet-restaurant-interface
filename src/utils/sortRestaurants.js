export const sortRestaurants = function (
  currentRests,
  sortAsc = false,
  sortDesc = false,
) {
  if (sortAsc && !sortDesc)
    currentRests.sort((restA, restB) => {
      return restA.rating.starRating - restB.rating.starRating;
    });
  if (!sortAsc && sortDesc)
    currentRests.sort((restA, restB) => {
      return restB.rating.starRating - restA.rating.starRating;
    });

  return currentRests;
};
