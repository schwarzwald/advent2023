const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 14: Part 1', () => {
  it('Should calculate load of rocks after tilting the platform north', () => {
    expect(part1(`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`)).to.equal(136);
  });
});
describe('Day 14: Part 2', () => {
  it('Should calculate load of rocks after 1000000000 cycles', () => {
    expect(part2(`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`)).to.equal(64);
  });
});
