const expect = require('expect.js');
const part1 = require('./part1');

describe('Day 21: Part 1', () => {
  it('Should count on how many places can be reached in 6 steps', () => {
    expect(part1(`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`, 6)).to.equal(16);
  });
});
