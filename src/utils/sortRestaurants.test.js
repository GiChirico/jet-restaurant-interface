import { describe, it, expect, beforeEach } from 'vitest';
import { sortRestaurants } from './sortRestaurants';

let restaurants;

beforeEach(() => {
  restaurants = [
    { name: 'Tortilla - Durham', rating: { starRating: 4.5 } },
    { name: 'Mangal House', rating: { starRating: 5 } },
    { name: 'Crispy Cod', rating: { starRating: 4 } },
  ];
});

describe('sortRestaurants', () => {
  it('sorts ascending by star rating', () => {
    const result = sortRestaurants(restaurants, true, false);
    expect(result.map(restaurant => restaurant.name)).toEqual([
      'Crispy Cod',
      'Tortilla - Durham',
      'Mangal House',
    ]);
  });

  it('sorts descending by star rating', () => {
    const result = sortRestaurants(restaurants, false, true);
    expect(result.map(restaurant => restaurant.name)).toEqual([
      'Mangal House',
      'Tortilla - Durham',
      'Crispy Cod',
    ]);
  });
});
