const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 13: Part 1', () => {
  it('Should calculate the positions of reflected columns and rows', () => {
    expect(part1(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)).to.equal(405);
  });
});
describe('Day 13: Part 2', () => {
  it('Should calculate the positions of reflected columns and rows after cleaning the smudge', () => {
    expect(part2(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)).to.equal(400);
  });
});
