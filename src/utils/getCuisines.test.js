import { describe, it, expect } from 'vitest';
import { getCuisines } from './getCuisines';

const restaurants = [
  { cuisines: [{ name: 'Italian' }, { name: 'Pizza' }] },
  { cuisines: [{ name: 'Japanese' }, { name: 'Sushi' }] },
  { cuisines: [{ name: 'Italian' }, { name: 'Pasta' }] },
];

describe('getCuisines', () => {
  it('returns a flat list of unique cuisine names', () => {
    const result = getCuisines(restaurants);
    expect(result).toEqual(['Italian', 'Pizza', 'Japanese', 'Sushi', 'Pasta']);
  });
});
